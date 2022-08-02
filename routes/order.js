const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const order = require('../model/order')
const Product = require('../model/product')

// router.get("/", (req, res, next) => {
//     res.status(200).json({ message: 'Your Order is fatched' })
// })

router.post("/", (req, res) => {
    Product.findById(req.body.productId).then(product => {
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' })
        }
    })
    const neworder = new order({
        _id:new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    })
    neworder.save().then(result => {
        console.log(result)
        res.status(200).json({ message: 'Your Order is Created', data: result })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get("/:orderId", (req, res, next) => {
    order.findById(req.params.orderId).exec().then(order => {
        res.status(200).json(
            {
                order: order,
                resquest: {
                    type: 'Get',
                    url: 'http://localhost:3000/orders'
                }
            })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete("/:orderId", (req, res, next) => {
    order.findByIdAndRemove(req.params.orderId).then(result => {
        if (!result) {
            return res.status(404).json("Order Not Found")
        }
        console.log(result)
        res.status(200).json({
            data: result, resquest: {
                type: ' Delete',
                url: 'http://localhost:3000/orders',

            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/',(req,res)=>{
    order.find().select('product').populate('product','name').exec()
    .then(docs=>{
        res.status(200).json({
            count:docs.length,
            orders:docs.map(docs=>{
                return {
                    _id:docs._id,
                     product:docs.product,
                     quantity:docs.quantity,
                     resquest: {
                        type: 'Get',
                        url: 'http://localhost:3000/orders',
        
                    }
                }
            })
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router

