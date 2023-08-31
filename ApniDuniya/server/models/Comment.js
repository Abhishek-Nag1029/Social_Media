const mongoose=require('mongoose');
// const User=require('./User.js');
// const Post=require('./Post.js');
const commentSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    comment:{
        type:String,
        required:true
    },
    name:{
        type:String,
    }
},
{timestamps:true}
)

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;
