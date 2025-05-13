
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

const validateReviews = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];


// API ENDPOINT ROUTED FOR SPOTS HERE

// 4. Implement GET /api/reviews/current endpoint:
//    - Apply requireAuth middleware
router.get('/current', requireAuth, async (req, res, next) => {
    //    - Get current user ID from request
    const getUserId = req.user.id
    try {
        //    - Query database for reviews by this user
        const allReviews = await Review.findAll({
            where: { userId: getUserId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Spot,
                    attributes: ['id','ownerId','address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                    include: [
                        {
                            model: SpotImage,
                            attributes: ['url'],
                            where: { preview: true},
                            required: false
                        }
                    ]
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        });

            const extractReviewData = allReviews.map(review => {
            const reviewsCurrent = review.toJSON();

            if (reviewsCurrent.Spot && reviewsCurrent.Spot.SpotImages && reviewsCurrent.Spot.SpotImages.length > 0) {
                reviewsCurrent.Spot.previewImage = reviewsCurrent.Spot.SpotImages[0].url;
            } else {
                reviewsCurrent.Spot.previewImage = null;
            }

            delete reviewsCurrent.Spot.SpotImages;

            return reviewsCurrent;
        });

        res.status(200).json({ Reviews: extractReviewData });
    } catch (error) {
        next(error);
    }
});



// 5. Implement POST /api/reviews/:reviewId/images endpoint:
//    - Apply requireAuth middleware
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    //    - Extract review ID and image URL from request
    const userId = req.user.id;
    const reviewId = req.params.reviewId;

    const { url } = req.body;
    try{

        // /finds the image with the reviewID in the database
        const getReviewImages = await Review.findByPk(reviewId)

        if(!getReviewImages){
            return res.status(404).json({ message: "Review couldn't be found" })
        }

        if(getReviewImages.userId !== userId){
            return res.status(403).json({ message: 'Forbidden access' })
        }

        const reviewImageCount = await ReviewImage.count({
            where: { reviewId }
        });

        if(reviewImageCount >= 10) {
            return res.status(403).json({ message: "Maximum number of images for this resource was reached" });
        }
        // Create new image
        const newImage = await ReviewImage.create({
            reviewId,
            url
        });
        return res.status(201).json({
            id: newImage.id,
            url: newImage.url
        });

    } catch (error) {
        next(error)
        // res.status(500).json({ message: "Internal Server Error" })
    }
});


// // PUT /api/reviews/:reviewId - Edit a Review
router.put('/:reviewId', requireAuth, validateReviews, async (req, res, next) => {

    try {
        const getReviewId = req.params.reviewId;
        const getUserId = req.user.id
        const { review, stars} = req.body;

        const findEditReview = await Review.findByPk(getReviewId);

        if(!findEditReview) {
            return res.status(404).json({ message: "Review couldn't be found" })
        }

        // if(findEditReview.userId !== getUserId){
        //     return res.status(403).json({ message: 'Forbidden access' })
        // }

        await findEditReview.update({
            review, stars
        });

        return res.status(200).json(findEditReview)

    } catch (error) {
        next(error)
        // return res.status(500).json({ message: "Internal server Error" })
    }
});

// DELETE /api/reviews/:reviewId - Delete a Review
// 1. Create DELETE route for /reviews/:reviewId
// 2. Apply requireAuth middleware
router.delete('/:reviewId', requireAuth, async (req, res, next) => {

    try{

        const reviewId = req.params.reviewId;
        const userId = req.user.id;

        const getReview = await Review.findOne({
            where: { id: reviewId }
        });

        if (!getReview){
            return res.status(404).json({ message: "Review couldn't be found" })
        }

        if (getReview.userId !== userId) {
            return res.status(403).json({ message: "Forbidden: You don't own this review" });
          }

        await getReview.destroy();

        return res.status(200).json({ message: "Successfully deleted" });

    } catch (error) {
        next(error)
        // res.status(500).json({ message: "Internal Server Error" })
    }

});

module.exports = router;
