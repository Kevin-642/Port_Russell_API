const express = require('express');
const router = express.Router();

const catwayService = require('../services/catway');
const reservationService = require('../services/reservation');
const private = require('../middlewares/private');
const checks = require('../middlewares/checkForms')

const reservationRoute = require('../routes/reservations');

router.get('/', private.checkJWT, catwayService.list);
router.get('/:id', private.checkJWT, catwayService.getById);
router.post('/', checks.checkCatway, private.checkJWT, catwayService.add);
router.patch('/:id', checks.checkCatwayState, private.checkJWT, catwayService.update);
router.put('/:id', checks.checkCatway, private.checkJWT, catwayService.replace);
router.delete('/:id', private.checkJWT, catwayService.delete);

router.get('/board/:idReservation', private.checkJWT, reservationService.getReservationById);
router.delete('/board/:idReservation', private.checkJWT, reservationService.deleteReservationById);
router.use('/:id/reservations', reservationRoute);

module.exports = router;