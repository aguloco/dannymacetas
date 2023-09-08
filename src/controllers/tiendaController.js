const {where} = require("sequelize");
const db = require("../database/models");
const {validationResult} = require('express-validator');



// -------------------- EL CONTROLADOR DE TIENDA --------------------
const controller = {

    tienda: (req, res) => {
        const productList = [];
        db.Producto.findAll({include: [{association: 'Categoria'}, {association: 'Usuario'}]})
        .then((products) => {

            

            for (product of products) {

                let objectProduct = {
                    id: product.id,
                    imagen: product.imagen,
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    precio: product.precio,
                    descuento: product.descuento,
                    categoria: product.categoria
                } 

                productList.push(objectProduct);

            }
            
            res.render('tienda', {productos: productList, user: req.session.userLogged}); 
        })
        
    },

    // ---------- CARGAR PRODUCTOS EN LA TIENDA ----------
    
    tiendaCreateForm: (req, res) => {
        db.Categoria.findAll().then((categories) => {
            let categoriesList = [];

            for(category of categories){

                let objectCategories = {
                    id: category.id,
                    nombre: category.nombre
                }
                categoriesList.push(objectCategories);
            }
            
            res.render('tiendaCreateForm', {categorias: categoriesList, user: req.session.userLogged});
            
        })
    }, 

    create: (req, res) => {
        
        const categoriesList = [];

        db.Categoria.findAll().then((categories) => {

            for(category of categories){

                let objectCategories = {
                    id: category.id,
                    nombre: category.nombre
                }
                categoriesList.push(objectCategories);
            }
            
        })

        const resultValidation = validationResult(req);

        // Si hay errores de validación en el proceso de creación de productos...
        if (resultValidation.errors.length > 0) {
            return res.render('tiendaCreateForm', {
                errors: resultValidation.mapped(),
                oldData: req.body,
                categorias: [{nombre: "Plantas"},{nombre:"Macetas"},{nombre:"Artesanias"}],
                user: req.session.userLogged
            });
        };

        db.Producto.create (
        {
			nombre: req.body.nombre,
			precio: req.body.precio,
			descuento: req.body.descuento,
			imagen: req.file.filename,
            descripcion: req.body.descripcion,
            Usuario_id: req.session.userLogged.id,
            Categoria_id: req.body.categoria

        }).then((resultados) => {
			res.redirect('/tienda');
		}).catch(err => {res.send(err)})
    },

    // ---------- BUSCADOR DE PRODUCTOS EN LA TIENDA ----------
    detalleProducto: (req, res) => {

        db.Producto.findAll({
            where: {
                id: req.params.id
            }
        }).then((producto) => {
            res.render('tiendaDetalle', {productoDetalle: producto[0], user: req.session.userLogged});
        })   
    },


    edit: (req, res) => {

        db.Categoria.findAll().then((categories) => {
            const categoriesList = [];

            for(category of categories){

                let objectCategories = {
                    id: category.id,
                    nombre: category.nombre
                }
                categoriesList.push(objectCategories);
            }
        
            db.Producto.findOne({
                where: {
                    id: req.params.id
                }
            }).then((product) => {
                res.render('tiendaEditForm', {categorias: categoriesList, productEdit: product, user: req.session.userLogged})
            })
        })
	},

    update: (req, res) => {

        const categoriesList = [];

        db.Categoria.findAll().then((categories) => {

            for(category of categories){

                let objectCategories = {
                    id: category.id,
                    nombre: category.nombre
                }
                categoriesList.push(objectCategories);
            }
            
        })

        const resultValidation = validationResult(req);

        // Si hay errores de validación en el proceso de editar algún producto...
        if (resultValidation.errors.length > 0) {
            
            db.Producto.findOne({
                where: {
                    id: req.params.id
                }
            }).then((product) => {
                res.render('tiendaEditForm', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    categorias: categoriesList,
                    user: req.session.userLogged,
                    productEdit: product
                })
            })
        };

        db.Producto.update({ 
            nombre: req.body.nombre,
			precio: req.body.precio,
			descuento: req.body.descuento,
			imagen: req.file.filename,
            descripcion: req.body.descripcion,
            Usuario_id: req.session.userLogged.id,
            Categoria_id: req.body.categoria,   
        }, {
            where: { id: req.params.id },
        })
        .then((resultados) => {res.redirect('/tienda')})
        .catch(err => {res.send(err)})
    },
    
    destroy : (req, res) => {

    db.Producto.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((resultado) => {res.redirect('/tienda')})
    .catch(err => {res.send(err)})
    },

}

// ********** Exportación del controlador de la tienda. No tocar **********
module.exports = controller;
