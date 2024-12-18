const Catway = require('../models/catways');

exports.list = async (req, res, next) => {

    const catways = await Catway.find();

    try {

        return res.status(200).render('catway/list.ejs', {
            catways: catways,
            title: 'Liste des catways'
        });

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getById = async (req, res, next) => {

    const id = req.params.id;

    try {

        let catway = await Catway.findById(id);

        if (catway) {
            return res.status(200).render('catway/card.ejs', {
                catway: catway,
                title: 'Fiche catway'
            });
        }
        return res.status(404).json('catway_introuvable');

    } catch (error) {
        return res.status(501).json(error)
    }
}

exports.add = async (req, res, next) => {

    const temp = ({
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState
    });

    try {

        let catway = await Catway.create(temp);

        return res.status(201).render('catway/addcatway.ejs', {
            catway: catway
        });

    } catch (error) {
        return res.status(501).json(error)
    }
}

exports.update = async (req, res, next) => {

    const id = req.params.id;
    const temp = ({
        catwayState: req.body.catwayState
    });

    try {

        let catway = await Catway.findOne({_id: id});

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });
            await catway.save();
            let temp2 = "été modifié";
            return res.status(204).render('catway/updatecatway.ejs', {
                catway: catway,
                temp: temp2
            });
        }
        return res.status(404).json('catway_introuvable');

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.replace = async (req, res, next) => {

    const id = req.params.id;
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState
    });

    try {

        let catway = await Catway.findOne({_id: id});
        let catwayNumb = catway.catwayNumber;

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });
            await catway.save();
            let temp2 = "remplacé le catway numéro " + catwayNumb;
            return res.status(204).render('catway/updatecatway.ejs', {
                catway: catway,
                temp: temp2
            });
        }
        return res.status(404).json('catway_introuvable');

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {

    const id = req.params.id;

    try {

         await Catway.deleteOne({_id: id});
         return res.status(204).render('catway/deletecatway.ejs');

    } catch (error) {
        return res.status(501).json(error);
    }
}