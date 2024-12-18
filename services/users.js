const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './env/.env' });

exports.authenticate = async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    
    try {

        let user = await User.findOne({ email }, '-__V -createdAt -updatedAt');
        if (user) {
            let userId = user._id;
            bcrypt.compare(password, user.password, function(err, response) {

                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;
                    const expireIn = 2 * 60 * 60;
                    const token = jwt.sign({
                        user: user
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: expireIn 
                    }
                );
                res.cookie('token', token, {httpOnly: true, secure: true});
                return res.redirect('/users/' + userId + '/userboard');
                }
                return res.status(403).json('echec_authentification');
            });
        } else {
            return res.status(404).json('utilisateur_introuvable');
        } 

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.userBoard = async (req, res, next) => {

    const id = req.params.id;

    try {

        let user = await User.findById(id);
        
        if (user) {
            return res.status(200).render('user/userboard.ejs', {
                title: 'Tableau de bord utilisateur',
                user: user  
            });
        }
        return res.status(404).json('utilisateur_introuvable');

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.list = async (req, res, next) => {

    const users = await User.find();

    try {

        return res.status(200).render('user/list.ejs', {
            users: users,
            title: 'Liste des utilisateurs'
        });

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getById = async (req, res, next) => {

    const id = req.params.id;

    try {

        let user = await User.findById(id);

        if (user) {
            return res.status(200).render('user/card.ejs', {
                user: user,
                title: 'Fiche utilisateur'
            });
        }
        return res.status(404).json('utilisateur_introuvable');

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.add = async (req, res, next) => {

    const temp = ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {

        let user = await User.create(temp);
        return res.status(201).render('user/adduser.ejs', {
            user: user
        });

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {

    const id = req.params.id;
    const temp = ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {

        let user = await User.findOne({_id: id});

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });
            await user.save();

            return res.status(204).render('user/updateuser.ejs', {
                user: user
            });
        }
        return res.status(404).json('utilisateur_introuvable');

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {

    const id = req.params.id;

    try {

        await User.deleteOne({_id: id});
        return res.status(204).render('user/deleteuser.ejs');

    } catch (error) {
        return res.status(501).json(error);
    }
}