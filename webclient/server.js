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
        maxAge: 60000
    }
}));

// Products Routers
const productRouter = require('./routers/productRouter.js')
app.use('/api/products', productRouter)

//Login/Register Router
const authRouter = require('./routers/authRouter.js')
app.use('/auth', authRouter)

// static images folder
app.use(express.static('./public'))

app.listen(3001, () => {
    console.log('server is running on port 3001')
})
