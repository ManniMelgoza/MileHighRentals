
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Booking } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

// const validateReviews = [
//     check('review')
//         .exists({ checkFalsy: true })
//         .withMessage("Review text is required"),
//     check('stars')
//         .exists({ checkFalsy: true })
//         .withMessage("Stars must be an integer from 1 to 5"),
//     handleValidationErrors
// ];


// API ENDPOINT ROUTED FOR SPOTS HERE

// 4. Implement GET /api/reviews/current endpoint:
//    - Apply requireAuth middleware
// router.get('/current', requireAuth, validateReviews, async (req, res) => {
//     //    - Get current user ID from request
//     const getUserId = req.user.id
//     try {
//         //    - Query database for reviews by this user
//         const reviewsQuer = await Review.findAll({
//             where: {
//                 getUserId
//             },
//             include: {
//                 attribute
//             }
//         })
//         //    - Include associated User, Spot (with preview image), and ReviewImages
//         //    - Format response with proper data structure:
//         //      - Add previewImage to each Spot
//         //      - Arrange the data in the required format
//         //    - Return JSON response with reviews array
//     }
//     catch (error) {

//     };
// });

// 5. Implement POST /api/reviews/:reviewId/images endpoint:
//    - Apply requireAuth middleware
//    - Extract review ID and image URL from request
//    - Check if review exists, return 404 if not
//    - Check if user owns the review, return 403 if not
//    - Check if review already has 10 images, return 403 if so
//    - Create new ReviewImage with reviewId and url
//    - Return 201 status with image ID and URL
