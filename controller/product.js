const mongoose = require('mongoose')
const product = require('../model/product')
const addProduct = async (req, res) => {
    const newProduct = new product({
        // _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path

    })
    try {
        await newProduct.save().then(result => {
            console.log(req.file)
            console.log(result)
            res.status(200).json({
                Message: 'Created Data Successfully',
                name: result.name,
                price: result.price,
                productImage: result.productImage,
                _id: result._id,
                resquest: {
                    type: 'Get',
                    url: 'http://localhost:3000/products/addProducts' + result._id
                }
            })
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const updateProduct = (req, res) => {
    const id = req.params.productId;
    product.findByIdAndUpdate({ _id: id }, req.body, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.status(201).json({ status: "Updated Data Successfully", data: data })
    })
}

const deleteProduct = (req, res) => {
    const id = req.params.productId
    product.findByIdAndRemove(id).exec().then(doc => {
        console.log(doc)
        res.status(200).json({ message: 'Your Product is  Successfully Deleted', data: doc })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
}

const getAllData = async (req, res) => {
    try {
        await product.find({}).select('name price_id').exec()
            .then(result => {
                const response = {
                    counts: result.length,
                    product: result.map(result => {
                        return {
                            name: result.name,
                            price: result.price,
                            _id: result._id,
                            resquest: {
                                type: 'Get',
                                url: 'http://localhost:3000/products/' + result._id
                            }
                        }
                    })
                }
                res.status(200).json(response)
                console.log(response)
            })
    }
    catch (err) {
        res.status(404).json({ message: err })
    }
}

const getData = (req, res) => {
    const id = req.params.id
    product.findById({ _id: id }).exec().then(result => {
        console.log(result)
        res.status(200).json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
}

module.exports = { getData, getAllData, addProduct, updateProduct, deleteProduct }