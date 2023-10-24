const port = process.env.PORT || 3006
const express = require('express');
const path = require('path');
const app = express();
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const cors = require("cors")
const ejs = require('ejs');

// ---------- CATALOGO MACETAS ----------
// Datos de ejemplo de productos
const products = [
    {
        name: 'Rectangular chica',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 114,
        category: 'Primera',
        image: "/img/tiendaProductos/rectangularchica.jpg"
    },
    {
        name: 'Plato Girasol',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 138,
        category: 'Segunda',
        image: '/img/tiendaProductos/platogirasol.jpg'
    },
    {
        name: 'Impronta Escamas',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 186,
        category: 'Tercera',
        image: '/img/tiendaProductos/improntaescamas.jpg'
    },

    {
        name: 'Octogonal Grande',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 600,
        category: 'Tercera',
        image: '/img/tiendaProductos/octogonalgrande.jpg'
    },

    {
        name: 'Hexagonal Cónica Grande',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 210,
        category: 'Tercera',
        image: '/img/tiendaProductos/hexagonalconicagrande.jpg'
    },

    {
        name: 'Cilíndrica Cónica',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 216,
        category: 'Tercera',
        image: '/img/tiendaProductos/cilindricaconica.jpg'
    },

    {
        name: 'Impronta Redonda',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 156,
        category: 'Tercera',
        image: '/img/tiendaProductos/improntaredonda.jpg'
    },

    {
        name: 'Impronta Rombo',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 174,
        category: 'Tercera',
        image: '/img/tiendaProductos/improntarombo.jpg'
    },

    {
        name: 'Facetada',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 168,
        category: 'Tercera',
        image: '/img/tiendaProductos/facetada.jpg'
    },

    {
        name: 'Hexagonal Recta Alta',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 210,
        category: 'Tercera',
        image: '/img/tiendaProductos/hexagonalrectaalta.jpg'
    },

    {
        name: 'Hexagonal Cónica Baja',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 192,
        category: 'Tercera',
        image: '/img/tiendaProductos/hexagonalconicabaja.jpg'
    },

    {
        name: 'Hexagonal Cónica Chica',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 138,
        category: 'Tercera',
        image: '/img/tiendaProductos/hexagonalconicachica.jpg'
    },

    {
        name: 'Tronco', 
        description2: '★ Nuevos diseños',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        
        price: 222,
        category: 'Tercera',
        image: '/img/tiendaProductos/tronquito.png'
    },


    {
        name: 'Vintage con tapa',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 222,
        category: 'Cuarta',
        image: '/img/tiendaProductos/vintagecontapa.jpg'
    },

    {
        name: 'Caramelera',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 204,
        category: 'Cuarta',
        image: '/img/tiendaProductos/caramelera.jpg'
    },

    {
        name: 'Vintage sin tapa',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 126,
        category: 'Cuarta',
        image: '/img/tiendaProductos/vintagesintapa.jpg'
    },

    {
        name: 'Caramelera sin tapa',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 156,
        category: 'Cuarta',
        image: '/img/tiendaProductos/caramelerasintapa.jpg'
    },


    {
        name: 'Buho con hijito',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 312,
        category: 'Quinta',
        image: '/img/tiendaProductos/buhoconhijito.jpg'
    },

    {
        name: 'Buho grande',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 396,
        category: 'Quinta',
        image: '/img/tiendaProductos/buhogrande.jpg'
    },

    {
        name: 'Niña con corona',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 186,
        category: 'Sexta',
        image: '/img/tiendaProductos/niñaconcorona.jpg'
    },

    {
        name: 'Jóven de pelo largo',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 228,
        category: 'Sexta',
        image: '/img/tiendaProductos/jovenpelolargo.jpg'
    },

    {
        name: 'Centro de mesa',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 792,
        category: 'Septima',
        image: '/img/tiendaProductos/centrodemesa.jpg'
    },


    {
        name: 'Gatito',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 138,
        category: 'Octava',
        image: '/img/tiendaProductos/gatito.jpg'
    },

    {
        name: 'Sahumerio Vintage',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 168,
        category: 'Novena',
        image: '/img/tiendaProductos/sahumeriovintage.jpg'
    },

    {
        name: 'Sahumerio Mandala',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 180,
        category: 'Novena',
        image: '/img/tiendaProductos/sahumeriomandala.jpg'
    },

    {
        name: 'Sahumerio Hexagonal',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 156,
        category: 'Novena',
        image: '/img/tiendaProductos/sahumeriohexagonal.jpg'
    },

    {
        name: 'Sahumerio Girasol',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 174,
        category: 'Novena',
        image: '/img/tiendaProductos/sahumeriogirasol.jpg'
    },

    {
        name: 'Bolita porta sahumerio con agujero',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 30,
        category: 'Novena',
        image: '/img/tiendaProductos/bolita.jpg'
    },

    {
        name: 'Sahumerio Flores',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 150,
        category: 'Novena',
        image: '/img/tiendaProductos/sahumerioflores.jpg'
    },

    {
        name: 'Sahumerio Estrellitas',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 180,
        category: 'Novena',
        image: '/img/tiendaProductos/sahumerioestrellitas.jpg'
    },



    // Agregar más productos a la Primera Categoría
    {
        name: 'Flor de loto',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 162,
        category: 'Primera',
        image: '/img/tiendaProductos/flordeloto.png'
    },
    {
        name: 'Cara de chino',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 108,
        category: 'Primera',
        image: '/img/tiendaProductos/caradechino.png'
    },
    // Agregar más productos a la Segunda Categoría
    {
        name: 'Plato Estrellitas',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 138,
        category: 'Segunda',
        image: '/img/tiendaProductos/platoestrellitas.jpg'
    },

    {
        name: 'Plato Mandala',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 144,
        category: 'Segunda',
        image: '/img/tiendaProductos/platomandala.jpg'
    },

    {
        name: 'Plato Mandala Flores con puntas',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 168,
        category: 'Segunda',
        image: '/img/tiendaProductos/platomandalafloresconpuntas.jpg'
    },



    {
        name: 'Bandeja Mandala Corazones',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 264,
        category: 'Segunda',
        image: '/img/tiendaProductos/bandejamandalacorazones.jpg'
    },

    {
        name: 'Bandeja Mandala Flores',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 252,
        category: 'Segunda',
        image: '/img/tiendaProductos/bandejamandalaflores.jpg'
    },



    {
        name: 'Plato Vintage',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 114,
        category: 'Segunda',
        image: '/img/tiendaProductos/platovintage.jpg'
    },

    {
        name: 'Plato Hexagonal',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 114,
        category: 'Segunda',
        image: '/img/tiendaProductos/platohexagonal.jpg'
    },

    {
        name: 'Plato Bandeja',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 210,
        category: 'Segunda',
        image: '/img/tiendaProductos/platobandeja.jpg'
    },


    

    {
        name: 'Plato Flores',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 126,
        category: 'Segunda',
        image: '/img/tiendaProductos/platoflores.jpg'
    },



    {
        name: 'Plato Octogonal Grande',
        description: 'Descripción del Producto 7',
        price: 348,
        category: 'Segunda',
        image: '/img/tiendaProductos/platooctogonalgrande.jpg'
    },
    // ... agregar más productos a otras categorías ...
    // Agregar más productos a la Primera Categoría
    {
        name: 'Redonda',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 162,
        category: 'Primera',
        image: '/img/tiendaProductos/redonda.jpg'
    },
    {
        name: 'Rosa',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 138,
        category: 'Primera',
        image: '/img/tiendaProductos/rosa.jpg'
    },
    {
        name: 'Flor de loto Vintage',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 138,
        category: 'Primera',
        image: '/img/tiendaProductos/flordelotovintage.png'
    },
    {
        name: 'Tres puntas',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 108,
        category: 'Primera',
        image: '/img/tiendaProductos/trespuntas.jpg'
    },
    {
        name: 'Octogonal chica',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 120,
        category: 'Primera',
        image: '/img/tiendaProductos/octogonalchica.jpg'
    },
    {
        name: 'Cilíndrica chica',
        description: '\n RECOMENDACIONES: \n Las macetas o bandejas van en bruto, por esa misma razón deben ser lijadas e impermeabilizadas para protegerlas del polvo y condiciones meteorológicas desfavorables.',
        price: 115,
        category: 'Primera',
        image: '/img/tiendaProductos/cilindricachica.jpg'
    },
    // ... agregar más productos a la Primera Categoría ...


];

app.get('/', (req, res) => {
    res.render('index.ejs', { products });
});

// ---------- Motor de plantillas ----------
app.set('view engine', 'ejs');
app.set('views', './views');


// ---------- Recursos estáticos ----------
app.use(express.static(path.join(__dirname, './public')));  // Necesario para los archivos estáticos en el folder /public
app.use(cors())

// ---------- Middlewares de aplicación ----------
app.use(express.urlencoded({ extended: false })); // para acceder a los datos del método POST
app.use(express.json()); // para acceder a los datos del método POST
app.use(methodOverride('_method')); // Para poder usar el method="POST" en el formulario por PUT y DELETE
app.use(session({
    secret: "Este es mi secreto", 
    resave: false, 
    saveUninitialized: false})); 
app.use(cookies());
app.use(userLoggedMiddleware);


// ---------- Rutas ----------
const mainRouter = require('./src/routes/mainRoutes')
const tiendaRouter = require('./src/routes/tiendaRouter');
const usuariosRouter = require('./src/routes/usuariosRouter');
const apiRouter = require('./src/routes/apiRouter');

app.use('/', mainRouter);
app.use('/tienda', tiendaRouter);
app.use('/usuario', usuariosRouter);
app.use('/api', apiRouter);


// ********** Comprobación de que el servidor está funcionando (Hard coded) **********
app.listen(port, function () {
    console.log(`Servidor corriendo en puerto ${port}`)
});












// ********** Exportación de todo lo construido con express. No tocar **********
module.exports = app;
