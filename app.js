const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const {initClientDbConnection} = require('./db/mongo');
const bodyParser = require('body-parser');
const catwayRoute = require('./routes/catways');

const indexRouter = require('./routes/index');

const app = express();

initClientDbConnection()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use('/', indexRouter);
app.use('/catways', catwayRoute);

app.use((req, res, next) => {
    res.status(404).json({ name: 'API', version: '1.0', status: 404, message: 'introuvable'});
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur serveur !');
});

module.exports = app;