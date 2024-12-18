const express = require('express');
const router = express.Router({ mergeParams: true });

const reservationService = require('../services/reservation');
const private = require('../middlewares/private');
const check = require('../middlewares/checkForms')

router.get('/', private.checkJWT, reservationService.list);
router.get('/:idReservation', private.checkJWT, reservationService.getById);
router.post('/', check.checkReservation, private.checkJWT, reservationService.add);
router.delete('/:idReservation', private.checkJWT, reservationService.delete);

module.exports = router;