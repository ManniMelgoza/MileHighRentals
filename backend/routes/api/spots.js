// NOTES

const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required")
        .notEmpty()
        .withMessage("This cannot be empty you need to provide an address"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required")
        .notEmpty()
        .withMessage("This cannot be empty you need to provide a city name"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required")
        .notEmpty()
        .withMessage("This cannot be empty you need to provide a state name"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required")
        .notEmpty()
        .withMessage("This cannot be empty you need to provide a country name"),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90})
        .withMessage("Latitude must be within -90 and 90"),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180})
        .withMessage("Longitude must be within -180 and 180"),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Provide a name")
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true})
        .isFloat({ min: 1, max: 100000})
        .withMessage("Price per day must be a positive number"),
    handleValidationErrors
];

const validateReviews = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt( {} )
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];


// const validateASpotImage = [
//     check('url')
//         .exists({ checkFalsy: true })
//         .withMessage("Street address is required")
//         .notEmpty()
//         .withMessage("This cannot be empty you need to provide an address"),
//     check('city')
//         .exists({ checkFalsy: true })
//         .withMessage("City is required")
//         .notEmpty()
//         .withMessage("This cannot be empty you need to provide a city name"),
//     handleValidationErrors
// ];

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

// GET /api/spots/current - Get all spots owned by the current user
// The requireAuth needs the used to be log in to be able to get data
// OK
router.get('/current', requireAuth, async (req, res) => {
    try {
        // we need to get the id of the current user an store it in a variable
        const currentUser = req.user.id;
        // now we are tying to get the spot of the current user with the id being stored in currentUser
        const currentSpots = await Spot.findAll({
            where: { ownerId: currentUser },
        }); // end of findALL

        res.status(200).json(currentSpots)
    }
     catch (error) { //end of try error
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
});
// OK
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
// OK
router.post('/', validateSpot, requireAuth, async (req, res, next) => {
    try{
        const ownerId = req.user.id;
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const newSpot = await Spot.create({
            ownerId, address, city, state, country, lat, lng, name, description, price
            });

        res.status(201).json(newSpot);

    } catch (error) {
        next(error)
    }
});
// POST /api/spots/:id/images - Add an image to a spot
// Apply requireAuth middleware
// validateASpotImage
router.post('/:id/images', requireAuth, async (req, res) => {
    // - Extract spot ID and image data
    const getSpotId = req.params.id;
    const getOwnerId = req.user.id;

    try {
        const currentSpot = await Spot.findByPk(getSpotId);
        // - Check if spot exists, return 404 if not
        if(!currentSpot) {
            res.status(404).json({ message: "Spot couldn't be found" });
        };
        // - Check if current user is owner, return 403 if not
        if(currentSpot.ownerId !== getOwnerId) {
            res.status(403).json({ message: 'Forbidden' });
        }
        // - Create new spot image
        const { url, preview } = req.body;

        const newImageSpot = await SpotImage.create({
            spotId: getSpotId, url, preview
        });
        // - Return 201 status with JSON response
        res.status(201).json({
            id: newImageSpot.id,
            url: newImageSpot.url,
            preview: newImageSpot.preview
        });
    }
    catch (error){
        console.log('Error adding image: ', error);
        res.status(500).json({ message: "Internal Server Error" })
    }
});

// PUT /api/spots/:id - Edit a spot
// OK
router.put('/:id', validateSpot, requireAuth, async (req, res, next) => {
    // - Extract spot ID and updated data
    const getSpotId = req.params.id;
    const getOwnerId = req.user.id;

    try{
        // - Check if spot exists, return 404 if not
        const getSpot = await Spot.findByPk(getSpotId);

        if(!getSpot){
            return res.status(404).json({ message: "Spot couldn't be found" })
        }
        // - Check if current user is owner, return 403 if not
        if(getSpot.ownerId !== getOwnerId) {
            return res.status(403).json({ message: "Spot couldn't be found" })
        }
        // - Format response with proper data types
        await getSpot.update(req.body)
        // - Return JSON response with updated spot
        return res.status(200).json(getSpot)

    } catch (error){
        next(error)
    }
});

// DELETE /api/spots/:id - Delete a spot
router.delete('/:id', requireAuth, async (req, res, next) => {

    // - Extract spot ID
    try{
        const getSpotId = req.params.id;
        const getOwnerId = req.user.id;

        // either use findOne or findByPK
        // const spot = await Spot.findByPk({
        const spot = await Spot.findOne({
            where: {
                id: getSpotId
            }
        });

        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        };

        // Makes sure that the owner of the image can delete its own stuff
        if (spot.ownerId !== getOwnerId) {  // if the spot foreign key does not match the user id primary key
            return res.status(403).json({ message: "You must be the owner of this spot to delete it."}); // send an error message
        };

        await spot.destroy();
            // - Return success message
            return res.status(200).json({ message: "Successfully deleted" })

    } catch (error) {
        next(error)
    }
});

// 2. Implement GET /api/spots/:spotId/reviews endpoint:
router.get('/:spotId/reviews', async (req, res, next) => {
    //    - Extract spot ID from request
    const getSpotId = req.params.spotId;
    // const currentUser = req.user.id;

    try {
        const getReview = await Spot.findByPk(getSpotId)
        //    - Check if spot exists, return 404 if not
        if (!getReview) {
            return res.status(404).json({ message: "Spot review couldn't be found" });
        };
        //    - Query database for all reviews for this spot
        //    - Include associated User and ReviewImages
        const allReviewSpot = Review.findAll({
            where: { spotId: getSpotId },
            include: [
                {
                    model: User,
                    attributes: ['url, firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        });

        //    - Return JSON response with reviews array
        const reviewArr = allReviewSpot.map(review => review.toJSON());

        return res.status(200).json({ Reviews: reviewArr });

    } catch (error) {
        next(error);
    }
});

// 3. Implement POST /api/spots/:spotId/reviews endpoint:
//    - Apply requireAuth and validateReview middleware
//    - Handle validation errors by returning 400 with error messages
router.post('/:spotId/reviews', requireAuth, validateReviews, async (req, res) => {

    //    - Extract spot ID, user ID, review text, stars from request
    const getSpotId = req.params.spotId;
    const getUserId = req.user.id;
    const { review, stars } = req.body;

    const getAllSpots = await Spot.findByPk(getSpotId);

    //    - Check if spot exists, return 404 if not
    if(!getAllSpots){
        return res.status(404).json({ message: "Spot couldn't be found" })
    };

    //     - Check if user already has a review for this spot, return 500 if so
    const userReviewCount = await Review.count({
        where: {
            userId: getUserId,
            spotId: getSpotId
        }
    });

    if(userReviewCount > 0){
        return res.status(500).json({ message: "User already has a review for this spot" })
    }
    //    - Create new Review with spotId, userId, review text, stars
    const addReview = await Review.create({
        spotId: getSpotId,
        userId: getUserId,
        review,
        stars
    });
    //    - Return 201 status with created review data
    return statusbar(201).json(addReview)
});


module.exports = router;
