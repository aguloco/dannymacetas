const express = require('express');
const router = express.Router();

const tiendaController = require('../controllers/tiendaController');


//***  Middlewares  ****/
const uploadFile = require('../middlewares/multerTienda');
const validacionesProducto = require('../middlewares/validacionesProductos');
const authMiddleware = require('../middlewares/authMiddleware');


// ********** RUTAS **********
/* La tienda */ 
router.get('/', tiendaController.tienda);

/* Crear un producto que va a la tienda y guardarlo */ 
router.get('/crear', authMiddleware, tiendaController.tiendaCreateForm);
router.post('/crear', authMiddleware, uploadFile.single('imagenProducto'), validacionesProducto, tiendaController.create);

/* Detalle de un producto cuando lo tocas particularmente en la tienda */ 
router.get('/detalle/:id', authMiddleware, tiendaController.detalleProducto)

/* Para editar un producto de la tienda */ 
router.get('/editar/:id', authMiddleware, tiendaController.edit)
router.put('/editar/:id', authMiddleware, uploadFile.single('imagenProducto'), tiendaController.update)

/*** Para eliminar un producto de la tienda ***/ 
router.delete('/eliminar/:id', authMiddleware, tiendaController.destroy); 




// ********** Exportación de las rutas. No tocar **********
module.exports = router;


