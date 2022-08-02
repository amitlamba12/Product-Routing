const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema({
    name:{type:String,required:true},
    // _id:mongoose.Schema.Types.ObjectId,
    price:{type:String,required:true},
    productImage:{type:String,required:true}
})

module.exports=mongoose.model('Product',ProductSchema)