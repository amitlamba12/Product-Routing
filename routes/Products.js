const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const product = require('../model/product')
const multer=require('multer')
const checkauth=require('../middleware/checkauth')
// const upload=multer({dest:'uploads/'})
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + file.originalname)
    }
})

// const fileFilter=(req,file,cb)=>{
//     if(file.mimetype==='image/jpeg' || file.mimetype==='image/png')
//     {
//     cb(null,true)
//     }
//     else{
//         cb(null,false)
//     }
// }

const upload=multer({storage:storage,
limits:{
    fileSize:1024*1024*5
},
})
//Products Home Routes
router.get('/', (req, res, next) => {
    res.status(200).json({ message: "Handling Get Products to Products" })
})

router.post('/addData', checkauth, upload.single('productImage'),async(req, res) => {
    const newProduct = new product({
        // _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage:req.file.path

    })
    try{
            await  newProduct.save().then(result=>{
            console.log(result)
            res.status(200).json({Message:'Created Data Successfully',
            name: result.name,
            price: result.price,
            productImage:result. productImage,
            _id: result._id,
            resquest: {
                type: 'Get',
                url: 'http://localhost:3000/products/addProducts' + result._id
            }})
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

//Updated Products
router.patch('/:productId', checkauth,(req, res, next) => {
    const id = req.params.productId;
    product.findByIdAndUpdate({ _id: id }, req.body, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.send(data);
    })
    // const updateops = {}
    // for (const ops of req.body) {
    //     updateops[ops.propName] = ops.value
    // }
    // product.updateOne({ _id: id }, { $set: {name:req.body.name, price:req.body.price }})
    // .exec().then((result) => {
    //     console.log(result)
    //     res.status(200).json({ message: 'Your Product is  Successfulloy Updated' ,data:result})
    // }).catch(err => {
    //     console.log(err)
    //     res.status(500).json({error:err})
    // })
})
// Deleted the Products On His Id
router.delete('/:productId', checkauth,(req, res) => {
    const id = req.params.productId
    product.findByIdAndRemove(id).exec().then(doc => {
        console.log(doc)
        res.status(200).json({ message: 'Your Product is  Successfully Deleted', data: doc })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})
//Fetching the All Data Of Products
router.get('/', checkauth,async (req, res) => {
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
})
//Find The Product On his Id 
router.get('/:id', checkauth,(req, res) => {
    const id = req.params.id
    product.findById({ _id: id }).exec().then(result => {
        console.log(result)
        res.status(200).json(result)
    })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router  
