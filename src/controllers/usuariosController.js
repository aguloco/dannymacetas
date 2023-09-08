const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../database/models');

// -------------------- CONTROLADOR USUARIOS --------------------

const controller = {
    
    registro: (req, res) => {
        res.render('registro')
    },

    procesoRegistro: (req, res) => {
        const resultValidation = validationResult(req);
        
        

        // Si hay errores de validación en el proceso de registro...
        if (resultValidation.errors.length > 0) {
            return res.render('registro', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        };     
        
        // Después tengo que hacer una mini-validación previa para que si ese mail ya está en mi DB
        db.Usuario.findOne ({where:{email: req.body.emailUsuario}}).then(userInDB => { 
            // Si el usuario a registrarse ya está en mi DB ... le voy a mostrar el error, porque no puede volver a registrarse
            if (userInDB != null) {
                return res.render('registro', {
                    errors: {
                        emailUsuario: {msg: 'Éste email ya está registrado'}
                    },
                    oldData: req.body,
                });
            } else {
                // Si el usuario no está en mi DB, lo guardo en mi DB 
                db.Usuario.create ({
	         		nombre: req.body.nombreUsuario,
	         		apellido: req.body.apellidoUsuario,
	         		email: req.body.emailUsuario,
	         		clave: bcrypt.hashSync(req.body.claveUsuario, 10),
	         		direccion: req.body.direccionUsuario,
	         		imagen: req.file.filename,
                    rol: "COMUN",
                    Local_id: "1"
                }).then(results => {res.redirect("/usuario/ingreso")}).catch(err => {res.send(err)})
            }
            
        })
    },
        
    login: (req, res) => {
        res.render('login')
    },

    procesoLogin: (req, res) => {
        const resultValidationLogin = validationResult(req);
        // Si hay errores de validación en el proceso de registro...
        if (resultValidationLogin.errors.length > 0) {
            return res.render('login', {
                errors: resultValidationLogin.mapped(),
                oldData: req.body
            });
        };    

        // Si no hay errores de validación en el login, me fijo si el email que ponen en el login está en mi DB
        db.Usuario.findOne ({where:{email: req.body.emailUsuario}}).then(userToLogin => {
            // Si efectivamente quiere entrar alguien que ya tiene un email registrado...
            if(userToLogin != null){
                let contraseñaCorrecta = bcrypt.compareSync(req.body.claveLogin, userToLogin.clave);
                

                if (contraseñaCorrecta) {
                    // La persona ingresó con el email y la contraseña correcta, entonces...
                    delete userToLogin.clave; // por seguridad que no se guarde la contraseña en memoria del navegador
                    req.session.userLogged = userToLogin; //.userLogged es una propiedad de session donde se va a guardar la información de este userToLogin
                    
                    if(req.body.recordame) {
                        res.cookie('emailUsuario', req.body.emailUsuario, { maxAge: (1000 * 60) * 60 })
                    }
                    return res.redirect('/usuario/perfil/:id');
                } else {
                    // Si es un usuario que quiere ingresar, pero está poniendo mal su contraseña... 
                    return res.render('login', {
                    errors: {
                        emailUsuario: {msg: 'Las credenciales son inválidas'},
                        claveLogin: {msg: 'Las credenciales son inválidas'}
                    }
                    });    
                }
            } else {
                // Si no se encuentra ese email registrado en nuestra DB...
                return res.render('login', {
                    errors: {
                        emailUsuario: {msg: 'No se encuentra registrado este email, por favor verificar'}
                    }
                });
            }
        }).catch(err => (console.log(err)))
    },
    
    profile: (req, res) => {
        res.render('userProfile', { user: req.session.userLogged });
    },
    
    logout: (req, res) => {
        res.clearCookie('emailUsuario');
        req.session.destroy();
        res.redirect('/');
    },

    destroy : (req, res) => {

        db.Usuario.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((resultado) => {req.session.destroy()})
        .then((resultado) => {res.redirect('/')})
        .catch(err => {res.send(err)})
        },


}; 


// ********** Exportación del controlador de usuario. No tocar **********
module.exports = controller;
