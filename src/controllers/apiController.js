const db = require('../database/models');
const path = require('path');

const controller = {
    usuarios: (req, res) => {
        
        const usersList = [];
        
        db.Usuario.findAll({where: {rol: "COMUN"}})
        .then((users) => {
            for (u of users) {
                let user = {
                    nombre: u.nombre,
                    apellido: u.apellido,
                    email: u.email,
                    rol: u.rol,
                    imagen: u.imagen
                } 
                usersList.push(user);
            }

            db.Usuario.count()
            .then((total_users) => {
                res.json({
                    descripcion: "Detalle usuarios",
                    users: usersList,
                    count: total_users
                }) 
            })
        })
        .catch(err => (console.log(err)))
    },

    usuario: (req, res) => {
        const idUser = req.params.id;
        
        db.Usuario.findOne({where: {id:idUser}})
        .then((user) => {
            let usuarioBuscado = {
                id: user.id,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email, 
            }
            let urlImagenUsuario = path.join(__dirname,"../../public/img/avatars/",user.imagen)
            
            res.json({
                user: usuarioBuscado,
                urlImagen: urlImagenUsuario
            }) 
        })
        .catch(err => (console.log(err)))
    },

    

}

// ********** Exportación del controlador del main. No tocar **********
module.exports = controller;