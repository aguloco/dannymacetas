// Middleware de ruta
// Función MW: configuración Multer como mw para el proceso de la tienda

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({

    destination: function(req, file, cb) {       
        cb(null, path.join(__dirname,"../../public/img/tiendaProductos"));   
    },

    filename: function(req, file, cb) {          
        let imageName = Date.now() + path.extname(file.originalname);  
        cb(null, imageName);         
    }
});

const uploadFile = multer ({storage: storage,  limits: { fileSize: 10000000 }});

module.exports = uploadFile;

