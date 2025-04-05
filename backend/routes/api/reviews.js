
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
router.get('/current', validateReviews, requireAuth, async (req, res, next) => {
    //    - Get current user ID from request
    const getUserId = req.user.id
    try {
        //    - Query database for reviews by this user
        const reviewsQuery = await Review.findAll({
            where: { userId: getUserId },
            include: [
                {
                model: Spot,
                attributes: ['id', 'name', 'city', 'state', 'country'],
                include: [
                    {
                        model: SpotImage,
                        attributes: ['url'],
                        where: {
                            preview: true
                        },
                        required: false
                    }
                    ]
                },
                {
                model: ReviewImage,
                attributes: ['id', 'url'],
                },
            ],
        });
        //    - Include associated User, Spot (with preview image), and ReviewImages
        //    - Format response with proper data structure:
        //      - Add previewImage to each Spot
        //      - Arrange the data in the required format
        //    - Return JSON response with reviews array
        res.status(200).json({ Reviews: reviewsQuery })
    }
    catch (error) {
        next(error);
    };
});

// 5. Implement POST /api/reviews/:reviewId/images endpoint:
//    - Apply requireAuth middleware
router.post('/:reviewId/images', validateReviews, requireAuth, async (req, res, next) => {
    //    - Extract review ID and image URL from request
    const getReviewId = req.params.reviewId;
    const getReview = await Review.findOne({
        where: {
            id: getReviewId
        }
    });
    try{
    //    - Check if review exists, return 404 if not
    if(!getReview){
        return res.status(404).json({ message: "Review couldn't be found" })
    }
    //    - Check if user owns the review, return 403 if not
    if(getReview.userId !== getUserId){
        res.status(403).json({ message: 'Forbidden: You are not the owner of this review.' });
    }
    //    - Check if review already has 10 images, return 403 if so
    // counter for images per review
    const reviewImageCount = await ReviewImage.count({
        where: { reviewId }
    })
    if(reviewImageCount >= 10) {
        res.status(403).json({ message: 'Forbidden: Your review has more than 10 images' });
    }
    //    - Create new ReviewImage with reviewId and url
    const { reviewId, url } = req.body;
    //    - Return 201 status with image ID and URL
    return res.status(201).json(req.body);

    } catch (error) {
        next(error);
    }
});


// PUT /api/reviews/:reviewId - Edit a Review
// 1. Create PUT route for /reviews/:reviewId
// 2. Apply requireAuth and validateReview middleware
router.put('/:reviewId', requireAuth, validateReviews, async (req, res, next) => {

    // 3. Extract review ID, review text, stars from request
    // Review ID
    const getReviewId = req.params.reviewId;
    // User ID
    const getUserId = req.user.id;

    try {

        // 4. Find review by ID
        const getReviews = await Review.findOne({
            where: {
                id: getReviewId
            }
        });

        // 5. Check if review exists, return 404 if not
        if(!getReviews){
            return res.status(404).json({ message: "Review couldn't be found" })
        }
        // 6. Check if user owns the review, return 403 if not
        if(getReviews.userId !== getUserId){
            res.status(403).json({ message: 'Forbidden: You are not the owner of this review.' });
        }
        // 7. Update the review with new text and stars
        // 8. Format response with all review fields
        // destructure review and stars for the body request
        const {review, stars} = req.body;
        await getReviews.update(req.body);
        // 9. Return JSON response with updated review
        return res.status(200).json(getReviews)
        // 10. Handle validation errors by returning 400 with error messages

    } catch (error) {
        next(error);
    }
});

// DELETE /api/reviews/:reviewId - Delete a Review
// 1. Create DELETE route for /reviews/:reviewId
// 2. Apply requireAuth middleware
router.delete('/:reviewId', requireAuth, async (req, res) => {

    // 3. Extract review ID from request
    const getReviewId = req.params.reviewId;
    const getUserId = req.user.id;
    // 4. Find review by ID
    const getReview = await Review.findOne({
        wwhere: {
            id: getReviewId
        }
    });
    // 5. Check if review exists, return 404 if not
    if (!getReviewId){
        return res.status(404).json({ message: "Review couldn't be found" })
    }
    // 6. Check if user owns the review, return 403 if not
    if(getReview.userId !== getUserId){
        res.status(403).json({ message: 'Forbidden: You are not the owner of this review.' });
    }
    // 7. Delete the review
    await getReview.destroy();
    // 8. Return success message
    return res.status(200).json({ message: "Successfully deleted" });

});


module.exports = router;
