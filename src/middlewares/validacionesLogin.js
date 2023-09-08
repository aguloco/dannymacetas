// Middleware de ruta

// Función MW: sirve para validar con express-validator el login

const { body } = require('express-validator');

validacionesLogin = [
    body('emailUsuario')
        .notEmpty().withMessage('Ingresar un email').bail()
        .isEmail().withMessage('Email inválido'),
    body('claveLogin').notEmpty().withMessage('Ingresar una contraseña')
];

module.exports = validacionesLogin;


