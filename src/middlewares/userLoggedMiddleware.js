const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {

    res.locals.isLogged = false;

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    if (req.cookies.emailUsuario != undefined) {

        let userFromCookie = await db.Usuario.findOne({
            where: {
                email: req.cookies.emailUsuario
            }
        })

        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }


    }
    next();
}

module.exports = userLoggedMiddleware;