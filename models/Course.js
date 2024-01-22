const mongoose=require('mongoose')
const slugify = require('slugify')
const Schema=require('mongoose').Schema


const CourseSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:String,
        default:Date.now
    },
    slug:{
        type:String,
        unique:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

CourseSchema.pre('validate',function (next){
this.slug=slugify(this.name,{
    lower:true,
    strict:true
})
next()
})

const Course=mongoose.model('Course',CourseSchema)
module.exports=Course