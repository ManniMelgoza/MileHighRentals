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
        .notEmpty()
        .withMessage("Street address is required"),
        // .withMessage("This cannot be empty you need to provide an address"),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("City is required"),
        // .withMessage("This cannot be empty you need to provide a city name"),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Country is required"),
        // .withMessage("This cannot be empty you need to provide a country name"),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90})
        .withMessage("Latitude is not valid must be within -90 and 90"),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180})
        .withMessage("Longitude is not valid must be within -180 and 180"),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
        // .withMessage("Name must be less than 50 characters"),
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
router.get('/', async (req, res, next) => {
    try {

        // Get all the data from the review and spotImage
        const allSpots = await Spot.findAll({
            // include will pull the association of the Review and SpotImage models
            include: [
                {
                    // Include the model: model name
                    model: Review,
                    // this will only extract the variable that we need from the Review model
                    attributes:['stars']
                },
                {
                    model: SpotImage,
                    attributes: ['url', 'preview']
                }
            ]
        });

        // console.log('ALLSPOTS', allSpots)
        // Iterate throuhg the data that was pulled from the extraction of findAll from the database
        const extractSpotData = allSpots.map(spot => {
            // This will turn the sequelize that into an obj to better manipulate the data
            // this would be the obj of each spot buyt fornated in a way that we can access each keyand its value
            const spotStarReviews = spot.toJSON();
            // console.log('spotStarReviews', spotStarReviews)
            // This will store the array of obj of all the reviews that are assosiated to the spot
            const reviewStars = spotStarReviews.Reviews;
            // console.log('reviewStars', typeof(reviewStars))
            // console.log('Print spot and Review', spotStarReviews)
            // console.log('All Reviews per spot', spotStarReviews.Review)

            // loop through the spotStarReviews
            let avgRating = null;
            let reviewStarsLength = reviewStars.length;

            if(reviewStarsLength > 0){
                const totalStars = reviewStars.reduce((sum, starVal) => sum += starVal.stars, 0)
                // console.log('totalStars', totalStars)
                avgRating = totalStars / reviewStarsLength;
                // console.log('avgRating', avgRating)
            }
                // console.log('avgRating', avgRating)
            // console.log('OUTSIDE LOP', totalStarReviews)

            // get the imageURL
            let previewImage = null;
            // will find the first image that has the bool value of true to them be assigned that url to the previewImage
            const previewImg = spotStarReviews.SpotImages.find(imgBoolVal => imgBoolVal.preview === true);
            // if the previewImg has found a true bool it will set the url to the previewImage
            if(previewImg){
                previewImage = previewImg.url
            }
            // if previewImg bool false, it will set previewImage to null to prevent any future errors
            else{
                previewImage = null;
            }

            return {
                id: spotStarReviews.id,
                ownerId: spotStarReviews.ownerId,
                address: spotStarReviews.address,
                city: spotStarReviews.city,
                state: spotStarReviews.state,
                country: spotStarReviews.country,
                lat: spotStarReviews.lat,
                lng: spotStarReviews.lng,
                name:spotStarReviews.name,
                description: spotStarReviews.description,
                price: spotStarReviews.price,
                createdAt: spotStarReviews.createdAt,
                updatedAt: spotStarReviews.updatedAt,
                avgRating: avgRating,
                previewImage: previewImage
            }
        })



        // Send the response
        return res.status(200).json({ Spots: extractSpotData });

    } catch (error) {
        // console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve spots' });
        // next();
    }
  });

// GET /api/spots/current - Get all spots owned by the current user
// The requireAuth needs the used to be log in to be able to get data
// GET /api/spots/current
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        // get the id of the ucrent user
        const currentUser = req.user.id;
        // we need to get the id of the current user an store it in a variable
        // now we are tying to get the spot of the current user with the id being stored in currentUser
        const allSpots = await Spot.findAll({
            /* when looking for all the spots in the database we only want to
            target the users wthat the id val in the key:val (ownerId: currentUser)
            */
            where: { ownerId: currentUser },
            include: [
                {
                    model: Review,
                    attributes: ['stars']
                },
                {
                    model: SpotImage,
                    attributes: ['url', 'preview']
                }
            ]
        }); // end of findALL


        const extractSpotData = allSpots.map(spot => {
            const spotStarReviews = spot.toJSON();
            const reviewStars = spotStarReviews.Reviews;
            // console.log('reviewStars', typeof(reviewStars))
            // console.log('Print spot and Review', spotStarReviews)
            // console.log('All Reviews per spot', spotStarReviews.Review)

            // loop through the spotStarReviews
            let avgRating = null;
            let reviewStarsLength = reviewStars.length;

            if(reviewStarsLength > 0){
                const totalStars = reviewStars.reduce((sum, starVal) => sum += starVal.stars, 0)
                // console.log('totalStars', totalStars)
                avgRating = totalStars / reviewStarsLength;
                // console.log('avgRating', avgRating)
            }
                // console.log('avgRating', avgRating)
            // console.log('OUTSIDE LOP', totalStarReviews)

            // get the imageURL
            let previewImage = null;
            // will find the first image that has the bool value of true to them be assigned that url to the previewImage
            const previewImg = spotStarReviews.SpotImages.find(imgBoolVal => imgBoolVal.preview === true);
            // if the previewImg has found a true bool it will set the url to the previewImage
            if(previewImg){
                previewImage = previewImg.url
            }
            // if previewImg bool false, it will set previewImage to null to prevent any future errors
            else{
                previewImage = null;
            }

            return {
                id: spotStarReviews.id,
                ownerId: spotStarReviews.ownerId,
                address: spotStarReviews.address,
                city: spotStarReviews.city,
                state: spotStarReviews.state,
                country: spotStarReviews.country,
                lat: spotStarReviews.lat,
                lng: spotStarReviews.lng,
                name:spotStarReviews.name,
                description: spotStarReviews.description,
                price: spotStarReviews.price,
                createdAt: spotStarReviews.createdAt,
                updatedAt: spotStarReviews.updatedAt,
                avgRating: avgRating,
                previewImage: previewImage
            }
        })



        // This will only give the userId number
        // console.log('currentUser', extractSpotData.currentUser)

        res.status(200).json({ Spots: extractSpotData  })
    }
     catch (error) { //end of try error
        next(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
});
// OK
// GET /api/spots/:id - Get details of a specific spot
router.get('/:id', async (req, res) => {
    try {
        // get the id of the URL
        const getSpotId = req.params.id;

        const currentSpot = await Spot.findByPk( getSpotId, {
            include: [
                {
                    model: SpotImage,
                    attributes: ['id','url', 'preview']
                },
                {
                    model: User,
                    // as: 'Owner',
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Review,
                    attributes: ['stars']
                }

            ]
        });

        if (!currentSpot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }

        const spotStarReviews = currentSpot.toJSON();
        let reviewArr = spotStarReviews.Reviews;
        let numReviews = reviewArr.length;
        let avgRating = null;

            if(numReviews > 0){
                const totalStars = reviewArr.reduce((sum, starVal) => sum += starVal.stars, 0)
                // console.log('totalStars', totalStars)
                avgRating = totalStars / numReviews;
            }

             const Spots = {
                 id: spotStarReviews.id,
                 ownerId: spotStarReviews.ownerId,
                 address: spotStarReviews.address,
                 city: spotStarReviews.city,
                 state: spotStarReviews.state,
                 country: spotStarReviews.country,
                 lat: spotStarReviews.lat,
                 lng: spotStarReviews.lng,
                 name:spotStarReviews.name,
                 description: spotStarReviews.description,
                 price: spotStarReviews.price,
                 createdAt: spotStarReviews.createdAt,
                 updatedAt: spotStarReviews.updatedAt,
                 numReviews: numReviews,
                 avgRating: avgRating,
                 SpotImages: spotStarReviews.SpotImages,
                 Owner: spotStarReviews.User
            }

                res.status(200).json({ Spots })


                // res.status(200).json({ extractSpotData })

    } catch (error) {
        // console.log(error)
        res.status(404).json({ message: "Spot couldn't be found" });
    }
});
// POST /api/spots - Create a new spot
// OK
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
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
router.put('/:id', requireAuth, validateSpot, async (req, res, next) => {
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
            return res.status(403).json({ message: 'Forbidden' })
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
            return res.status(403).json({ message: 'Forbidden' }); // send an error message
        };

        await spot.destroy();
            // - Return success message
            return res.status(200).json({ message: "Successfully deleted" })

    } catch (error) {
        next(error)
    }
});

// 2. Implement GET /api/spots/:spotId/reviews endpoint:
/*

fetch('/api/spots/1/reviews')
  .then(res => res.json())
  .then(data => console.log(data));

*/
router.get('/:spotId/reviews', async (req, res, next) => {
    try {
      const spotId = req.params.spotId;

      const spot = await Spot.findByPk(spotId);

      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }

      const reviews = await Review.findAll({
        where: { spotId }
      });

      return res.status(200).json(reviews);

    } catch (error) {
      next(error);
    }
  });

// 3. Implement POST /api/spots/:spotId/reviews endpoint:
//    - Apply requireAuth and validateReview middleware
//    - Handle validation errors by returning 400 with error messages
// WHEN FETCH CALL APP CRASHES


// router.post('/:spotId/reviews', requireAuth, validateReviews, async (req, res, next) => {

    router.post('/:spotId/reviews', requireAuth, validateReviews, async (req, res, next) => {
        try {
          const spotId = req.params.spotId;
          const userId = req.user.id;
          const { review, stars } = req.body;

          const spot = await Spot.findByPk(spotId);

          if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
          }

          const existingReview = await Review.findOne({
            where: { userId, spotId }
          });

          if (existingReview) {
            return res.status(500).json({ message: "User already has a review for this spot" });
          }

          const newReview = await Review.create({
            userId,
            spotId,
            review,
            stars
          });

          return res.status(201).json(newReview);

        } catch (error) {
          next(error);
        }
      });

    //   Add Query Filters to Get All Spots
    // GET /api/spots








module.exports = router;
