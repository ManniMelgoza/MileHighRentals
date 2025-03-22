// NOTES

const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');
const { Op } = require('sequelize');


const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required")
        .isLength({ min: 5, max: 100})
        .withMessage("The address length must be atleast 5 characters long")
        .notEmpty()
        .withMessage("This cannot be empty you need to provide an address"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required")
        .isLength({ min: 2, max: 100})
        .withMessage("The city length must be atleast 2 characters long")
        .notEmpty()
        .withMessage("This cannot be empty you need to provide a city name"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required")
        .isLength({ min: 2, max: 100})
        .withMessage("The state length must be atleast 2 characters long")
        .notEmpty()
        .withMessage("This cannot be empty you need to provide a state name"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required")
        .isLength({ min: 2, max: 100})
        .withMessage("The country length must be atleast 2 characters long")
        .notEmpty()
        .withMessage("This cannot be empty you need to provide a country name"),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90})
        .withMessage("Lattitute needs to be betwen -90 and 90"),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180})
        .withMessage("Lattitute needs to be betwen -180 and 180"),
        check('name')
        .exists({ checkFalsy: true })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 10, max: 500})
        .withMessage("Description must be between 10 and 500 characters"),
    check('price')
        .exists({ checkFalsy: true})
        .isFloat({ min: 1, max: 100000})
        .withMessage('Price must be between 1 and 100000'),
    // check('angRating')
    //     .exists({ checkFalsy: true})
    //     .isFloat({ min: 1.0, max: 5.0})
    //     .withMessage('Raitings must be between 1.0 and 5.0'),
    // check('previewImage')
    //     .exists({ checkFalsy: true})
    //     .isURL()
    //     .withMessage("Neds to have a valid URL format, https://foo.com"),
    handleValidationErrors
];

// API ENDPOINT ROUTED FOR SPOTS HERE
  // GET /api/spots
router.get('/', async (req, res) => {
    try {
      // Query the database to get all spots without specifying attributes
      const spots = await Spot.findAll();

      // Send the response
      return res.status(200).json({ spots });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to retrieve spots' });
    }
  });

// GET /api/spots - Get all spots



// GET /api/spots/current - Get all spots owned by the current user
// The requireAuth needs the used to be log in to be able to get data

router.get('/current', requireAuth, async (req, res) => {
    try {
        // we need to get the id of the current user an store it in a variable
        const currentUser = req.user.id;
        // now we are tying to get the spot of the current user with the id being stored in currentUser
        const currentSpots = await Spot.findAll({
            where: { ownerId: currentUser },
        }); // end of findALL

        res.status(200).res.json(currentSpots)
    }
     catch (error) { //end of try error
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
});

// GET /api/spots/:id - Get details of a specific spot
router.get('/:id', async (req, res) => {
    try {
        // get the id of the URL
        const getSpotId = req.params.id;
        const currentSpot = await Spot.findByPk(getSpotId);

        if(!currentSpot) {
            res.status(404).json({ message: "Spot couldn't be found" });
        }
        res.json(currentSpot);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
});
// POST /api/spots - Create a new spot
router.post('/', requireAuth, validateSpot, async (error, req, res, next) => {
    try{

        const { address, cit, state, country, lat, lng, name, description, price } = req.body;

        /*
        const newSpot = await Spot.create({
                address: '7894 E 9th Ave',
                city: 'Wheat Ridge',
                state: 'Colorado',
                country: 'United States of America',
                lat: 23.7645358,
                lng: 145.7645358,
                name: 'Robot Duck',
                description: 'Great apaprment to see the mountain views',
                price: 90.43,
                ownerId: req.user.id,
                create
            });
        */

        res.status(201).json(newSpot);

    } catch (error) {
        next(error)
    }
});
// POST /api/spots/:id/images - Add an image to a spot
// PUT /api/spots/:id - Edit a spot
// DELETE /api/spots/:id - Delete a spot
// GET /api/spots with query filters


module.exports = router;
