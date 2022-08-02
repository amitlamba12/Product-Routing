const mongoose=require('mongoose')
const ordereSchema=mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
    quantity:{type:String,default:1}
})

module.exports=mongoose.model('Order',ordereSchema)