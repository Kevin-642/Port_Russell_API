const Reservation = require('../models/reservations');
const Catway = require('../models/catways');

exports.list = async (req, res, next) => {

    const id = req.params.id;
    const catway = await Catway.findById(id);
    const catwayNumb = catway.catwayNumber;
    const reservations = await Reservation.find({catwayNumber: catwayNumb});

    try {

        return res.status(200).render('reservation/list.ejs', {
            catway: catway,
            reservations: reservations,
            title: 'Liste des réservations par catway' 
        });

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getById = async (req, res, next) => {

    const id = req.params.id;
    const catway = await Catway.findById(id);
    const idReservation = req.params.idReservation;

    try {

        let reservation = await Reservation.findById(idReservation);

        if (reservation) {
            return res.status(200).render('reservation/card.ejs', {
                reservation: reservation,
                catway: catway,
                title: 'Fiche réservation'
            });
        }
        return res.status(404).json('reservation_introuvable');

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getReservationById = async (req, res, next) => {
    const reservationId = req.params.idReservation;
    
    try {

        let reservation = await Reservation.findById(reservationId);
        let catwayNumb = reservation.catwayNumber;
        let catway = await Catway.findOne({catwayNumber: catwayNumb});
        let catwayId = catway._id;

        if (reservation) {
            return res.redirect('/catways/' + catwayId + '/reservations/' + reservationId);
        }
        return res.status(404).json(reservation_introuvable);

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.add = async (req, res, next) => {

    const id = req.params.id;
    const catway = await Catway.findById(id);
    const catwayNumb = catway.catwayNumber;
    const temp = ({
        catwayNumber: catwayNumb,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        checkIn: new Date(req.body.checkIn),
        checkOut: new Date (req.body.checkOut)
    });

    try {

        if (temp.checkIn.getTime() > Date.now() || temp.checkOut.getTime() > Date.now) {

            if (temp.checkIn.getTime() < temp.checkOut.getTime()) {
                let reservationsExists = await Reservation.find({catwayNumber: catwayNumb});

                if (reservationsExists) {
                    console.log(reservationsExists);

                    for (let r=0; r < reservationsExists.length; r++) {
                        let check1 = temp.checkIn.getTime() >= reservationsExists[r].checkIn.getTime() && temp.checkIn.getTime() <= reservationsExists[r].checkOut.getTime();
                        let check2 = temp.checkOut.getTime() >= reservationsExists[r].checkIn.getTime() && temp.checkOut.getTime() <= reservationsExists[r].checkOut.getTime();
                        let check3 = reservationsExists[r].checkIn.getTime() >= temp.checkIn.getTime() && reservationsExists[r].checkIn.getTime() <= temp.checkOut.getTime();
                        console.log(reservationsExists[r]);

                        if (check1 || check2 || check3) {
                            return res.status(400).json("Les dates correspondent déjà à une autre réservation");
                        } 
                    }
                }
                let reservation = await Reservation.create(temp);
                return res.status(201).render('reservation/addreservation.ejs', {
                    reservation: reservation
                });
            }
            return res.status(400).json("La date de sortie ne peut pas être antèrieure à la date d'entrée");
        }
        return res.status(400).json("Les dates de réservations ne peuvent être antèrieures à aujourd'hui");

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {

    const idReservation = req.params.idReservation;

    try {
        
        await Reservation.deleteOne({_id: idReservation});
        return res.status(204).render('reservation/deletereservation.ejs');

    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.deleteReservationById = async (req, res, next) => {

    const reservationId = req.params.idReservation;
    
    try {

        let reservation = await Reservation.findById(reservationId);
        let catwayNumb = reservation.catwayNumber;
        let catway = await Catway.findOne({catwayNumber: catwayNumb});

        if (reservation) {
            return res.status(204).render('reservation/delete.ejs', {
                reservation: reservation,
                catway: catway
            });
        }
        return res.status(404).json(reservation_introuvable);
        
    } catch (error) {
        return res.status(501).json(error);
    }
}