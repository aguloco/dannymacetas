// Middleware de ruta
// Función MW: configuración Multer como mw para el proceso de registro del usuario

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({

    destination: function(req, file, cb) {       
        cb(null, path.join(__dirname,"../../public/img/avatars"));   
    },



    
    filename: function(req, file, cb) {          
        let imageName = Date.now() + path.extname(file.originalname);  
        cb(null, imageName);         
    },
    
});

const uploadAvatar = multer ({storage: storage ,  limits: { fileSize: 1000000}});

module.exports = uploadAvatar;
