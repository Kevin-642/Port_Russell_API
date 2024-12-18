const { validationResult, check } = require('express-validator');

exports.checkAuth = [

    [
        check('password').notEmpty().trim(),
        check('email').isEmail().trim()
    ],

    async (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array() });
        }
        next();
    }
]

exports.checkUser = [

    [
        check('name').notEmpty().trim()
            .isLength({ min: 3}).withMessage('3 caractères minimum')
            .isAlpha().withMessage('Des lettres sont demandées'),
        check('password').notEmpty().trim()
            .isLength({ min: 6}).withMessage('6 caractères minimum'),
        check('email').isEmail().trim()
    ],

    async (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array()});
        }
        next()
    }
]

exports.checkCatway = [

    [
        check('catwayNumber').isNumeric().trim(),
        check('type').notEmpty().trim().isLength({ min: 4, max: 5}),
        check('catwayState').notEmpty().trim()
    ],

    async (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array()});
        }
        next()
    }
]

exports.checkCatwayState = [

        check('catwayState').notEmpty().trim(),

    async (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array()});
        }
        next()
    }
]

exports.checkReservation = [

    [
        check('clientName').notEmpty().trim()
            .isLength({ min: 3}).withMessage('3 caractères minimum')
            .isAlpha().withMessage('Des lettres sont demandées'),
        check('boatName').notEmpty().trim(),
        check('checkIn').isDate().trim(),
        check('checkOut').isDate().trim()
    ],

    async (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array()});
        }
        next()
    }
]