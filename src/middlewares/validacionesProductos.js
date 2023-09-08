// Middleware de ruta

// Función MW: sirve para validar con express-validator la creación de productos que hace el administrador 

const {body} = require('express-validator');
const path = require('path');

validacionesProducto = [
    body('nombre')
        .notEmpty().withMessage('Ingresa el nombre del producto').bail()
        .isLength({min:5}).withMessage('Debe contener al menos 5 caracteres'),
    body('precio').notEmpty().withMessage('Ingresa el precio correspondiente'),
    body('imagenProducto').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            
        if (!file) { //cuando no suben un archivo
            throw new Error ('Carga una imagen');
        } else {  //cuando suben un archivo, verificar la extensión del mismo
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            };
        }
        return true;
        }),
    body('descripcion')
        .notEmpty().withMessage('Ingresar una descripción del nuevo producto').bail()
        .isLength({min:20}).withMessage('Debe contener al menos 20 caracteres'),
];

module.exports = validacionesProducto;
