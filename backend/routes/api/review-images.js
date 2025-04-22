
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

router.delete('/review-images/:imageId', requireAuth, async (req, res, next) => {
    try {

        const imageId = req.params.imageId;
        const userId = req.user.id;

        const image = await ReviewImage.findByPk(imageId, {
          include:  Review
        });

        if (!image) {
          return res.status(404).json({ message: "Review Image couldn't be found" });
        }

        if (image.userId !== userId) {
            return res.status(403).json({ message: "Forbidden: You don't own this review" });
        }

        await image.destroy();
        return res.status(200).json({ message: "Successfully deleted" });
    }
    catch (error){
        next(error);
    }
  });


module.exports = router;
