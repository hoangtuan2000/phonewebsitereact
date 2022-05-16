const express = require('express')
const cors = require('cors')
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer')


const app = express()

// middleware

app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }))

app.use(cors(
    {
        origin: ['http://localhost:3000', 'http://localhost:3006'], // port of web client front-end 'http://localhost:3000' and web admin front-end 'http://localhost:3006'
        methods: ['GET', "POST"],
        credentials: true //pass header
    }
))

app.use(session({
    key: 'user',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // expires: 60
        httpOnly: true, //not accessible via function document.cookie
        maxAge: 60000 * 60000 * 24
    }
}));
// **************************************************************************************
// ****************************** Client Web ******************************
// Products Routers
const productRouter = require('./clientWebServer/routers/productRouter.js')
app.use('/api/products', productRouter)

// Smartphones Routers
const smartphoneRouter = require('./clientWebServer/routers/smartphoneRouter.js')
app.use('/api/products', smartphoneRouter)

// Headphones Routers
const headphoneRouter = require('./clientWebServer/routers/headphoneRouter.js')
app.use('/api/products', headphoneRouter)

// Phonecases Routers
const phonecaseRouter = require('./clientWebServer/routers/phonecaseRouter.js')
app.use('/api/products', phonecaseRouter)

//Login/Register Router
const authRouter = require('./clientWebServer/routers/authRouter.js')
app.use('/auth', authRouter)

//Address Router
const addressRouter = require('./clientWebServer/routers/addressRouter.js')
app.use('/address', addressRouter)

//Cart Router
const cartRouter = require('./clientWebServer/routers/cartRouter.js')
app.use('/cart', cartRouter)

//Order Router
const orderRouter = require('./clientWebServer/routers/orderRouter.js')
app.use('/order', orderRouter)

//account Router
const accountRouter = require('./clientWebServer/routers/accountRouter.js')
app.use('/account', accountRouter)

//get database Router
const getDatabaseRouter = require('./clientWebServer/routers/getDatabaseRouter.js')
app.use('/getDatabase', getDatabaseRouter)







// **************************************************************************************
// ****************************** Admin Web ******************************
//Login/Register Router
const authRouterAdmin = require('./clientAdminServer/routersAdmin/authRouterAdmin.js')
app.use('/authAdmin', authRouterAdmin)

//Products Router
const productsRouterAdmin = require('./clientAdminServer/routersAdmin/productsRouterAdmin.js')
app.use('/productsAdmin', productsRouterAdmin)

//product config info Router
const productConfigInfoRouterAdmin = require('./clientAdminServer/routersAdmin/productConfigInfoRouterAdmin.js')
app.use('/productConfigInfoAdmin', productConfigInfoRouterAdmin)

//add product Router
const addProductRouterAdmin = require('./clientAdminServer/routersAdmin/addProductRouterAdmin.js')
app.use('/addProductAdmin', addProductRouterAdmin)

//update product Router
const updateProductRouterAdmin = require('./clientAdminServer/routersAdmin/updateProductRouterAdmin.js')
app.use('/updateProductAdmin', updateProductRouterAdmin)

//account Router
const accountsRouterAdmin = require('./clientAdminServer/routersAdmin/accountsRouterAdmin.js')
app.use('/accountsAdmin', accountsRouterAdmin)

//orders Router
const ordersRouterAdmin = require('./clientAdminServer/routersAdmin/ordersRouterAdmin.js')
app.use('/ordersAdmin', ordersRouterAdmin)

//get database Router
const getDatabaseRouterAdmin = require('./clientAdminServer/routersAdmin/getDatabaseRouterAdmin')
app.use('/getDatabaseRouterAdmin', getDatabaseRouterAdmin)





// **************************************************************************************
// static images folder
app.use(express.static('./public'))

app.listen(3001, () => {
    console.log('server is running on port 3001')
})
