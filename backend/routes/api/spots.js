// NOTES

const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spots } = require('../../db/models');
const { validationResult } = require("express-validator");


const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Address is required")
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
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 10, max: 500})
        .withMessage("Description must be between 10 and 500 characters"),
    check('price')
        .exists({ checkFalsy: true})
        .isFloat({ min: 1, max: 100000})
        .withMessage('Price must be between 1 and 100000'),
    check('angRating')
        .exists({ checkFalsy: true})
        .isFloat({ min: 1.0, max: 5.0})
        .withMessage('Raitings must be between 1.0 and 5.0'),
    check('previewImage')
        .exists({ checkFalsy: true})
        .isURL()
        .withMessage("Neds to have a valid URL format, https://foo.com"),
    handleValidationErrors
];

// API ENDPOINT ROUTED FOR SPOTS HERE




module.exports = router;
