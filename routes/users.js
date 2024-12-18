const express = require('express');
const router = express.Router();

const userService = require('../services/users');
const checks= require("../middlewares/checkForms")
const private = require('../middlewares/private');

/* GET users listing. */
router.post('/', checks.checkAuth, userService.authenticate);
router.get('/', private.checkJWT,userService.list);
router.get('/:id', private.checkJWT, userService.getById);
router.put('/add', checks.checkUser, private.checkJWT, userService.add);
router.patch('/:id', checks.checkUser, private.checkJWT, userService.update);
router.delete('/:id', private.checkJWT, userService.delete);

router.get('/:id/userboard', private.checkJWT, userService.userBoard);

module.exports = router;