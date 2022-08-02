const express = require('express')
const app = express()
const productRotes = require('./routes/Products')
const orderRotes = require('./routes/order')
const UserRoutes=require('./routes/User')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const Router=require('./routes/router')
app.use(morgan('dev'))
require('dotenv').config()
const mongoose = require('mongoose')
app.use(express.json())

try {
    mongoose.connect(process.env.url, { useNewUrlParser: true }).then(() => {
        console.log("Database is Connected")
    })
}

catch (err) {
    console.log("Database is not Connected")
}

app.use(bodyparser.urlencoded({ extended: false }))

// app.use((req, res, next) => {
//     const error = new Error();
//     error.status(404)
//     next(error)
// })

// app.use((error, req, res, next) => {
//     res.status(error.status || 500)
//     res.json({
//         error: {
//             error: error.message
//         }
//     })
// })

// app.use((req,res,next)=>{
//     res.header("Access Control-Allow-Origin","*")
//     res.header(
//         "Access Control-Allow-Headers",
//         "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//     )
//     if(req.method==='OPTIONS'){
//         res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,PUT,DELETE')
//         return res.status(200).json({message:'success'})
//     }
//     next()
// })


app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use('/api/v1',Router)
// app.use('/products', productRotes)
// app.use('/orders', orderRotes)
// app.use('/users', UserRoutes)
app.listen(process.env.Port, () => {
    console.log(`Server is Started port No ${process.env.Port}`)
})