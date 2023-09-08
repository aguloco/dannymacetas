const path = require('path');

const controller = {
    index: (req, res) => {
        res.render('index', { user: req.session.userLogged })
    },

    faq: (req, res) => {
        res.render('', { user: req.session.userLogged })
    },

    elegirnos: (req, res) => {
        res.render('', { user: req.session.userLogged})
    },

    nuevacontra: (req, res) => {
        res.render('nuevacontra', { user: req.session.userLogged})
    }
}

// ********** Exportación del controlador del main. No tocar **********
module.exports = controller;