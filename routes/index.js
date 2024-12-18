const express = require('express');
const router = express.Router();
const userRoute = require('../routes/users');

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index.ejs', { title: `Accueil de l'API, connexion.` });
});

router.use('/users', userRoute);
module.exports = router;
