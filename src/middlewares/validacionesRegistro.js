// Middleware de ruta

// Función MW: sirve para validar con express-validator el registro

const { body } = require('express-validator');
const path = require('path');

let validacionesRegistro = [
    body('nombreUsuario')
        .notEmpty().withMessage('Ingresa tu nombre').bail()
        .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres'),
    body('apellidoUsuario')
        .notEmpty().withMessage('Ingresa tu apellido').bail()
        .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres'),
    body('emailUsuario')
        .notEmpty().withMessage('Ingresa tu email').bail()
        .isEmail().withMessage('Formato de email inválido'),
        /*.custom(value => {
            userInvalid = user.findByEmail(value)
                if (userInvalid) {
                    return Promise.reject('Este e-mail ya está en uso')
                }
        }),*/
    body('claveUsuario').notEmpty().withMessage('Ingresa una contraseña'),
    body('direccionUsuario').notEmpty().withMessage('Ingresa tu dirección'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            
        if (!file) { //cuando no suben un archivo
            throw new Error ('Carga una imágen');
        } else {  //cuando suben un archivo, verificar la extensión del mismo
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
           else if (file.size>1000000) { //cuando la imagen supera 1MB
                throw new Error ('Carga una imágen');
        }}
        return true;
        })
];


module.exports = validacionesRegistro;
