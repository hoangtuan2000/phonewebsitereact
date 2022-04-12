const express = require('express')
const cors = require('cors')
const session = require('express-session');
const path = require('path');

const app = express()

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors(
    {
        origin: 'http://localhost:3000', // port of front-end 'http://localhost:3000'
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



// ****************************** Admin Web ******************************


// **************************************************************************************
// static images folder
app.use(express.static('./public'))

app.listen(3001, () => {
    console.log('server is running on port 3001')
})
