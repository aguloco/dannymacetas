/*  Midleware de ruta
Se encarga de verificar si haya un usuario logeado en session
y si lo hay, redirigir automáticamente al perfil en vez de volver a la ventana de login */

function guestMiddleware (req, res, next) {
    if(req.session.userLogged) {
        return res.redirect('/usuario/perfil');
    }
    next();
}

module.exports = guestMiddleware;

