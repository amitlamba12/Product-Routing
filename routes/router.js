const express=require('express')
const router=express.Router()
const checkauth=require('../middleware/checkauth')
const login_Registre_Router=require('../controller/login_register')
const ProductRouter=require('../controller/product')
const OrderRouter=require('../controller/order')
const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png')
    {
    cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const upload=multer({storage:storage,
limits:{
    fileSize:1024*1024*5
},
fileFilter:fileFilter})

router.post('/register',login_Registre_Router.register)
router.post('/login',login_Registre_Router.login)
router.post('/addProduct',checkauth,upload.single('productImage'),ProductRouter.addProduct)
router.post('/addOrder',checkauth,OrderRouter.addOrder)
router.get('/getProductById/:id',checkauth,ProductRouter.getData)
router.get('/getAllProduct',checkauth,ProductRouter.getAllData)
router.get('/getOrder/:orderId',checkauth,OrderRouter.getOrder)
router.get('/getOrder',checkauth,OrderRouter.getAllOrder)

router.patch('/updateProduct/:productId',ProductRouter.updateProduct)
router.delete('/deleteProduct/:productId',ProductRouter.deleteProduct)
router.delete('/deleteOrder/:orderId',OrderRouter.DeleteOrder)

module.exports=router