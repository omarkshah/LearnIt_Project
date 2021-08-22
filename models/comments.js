const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required: true
    },
    qualification:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        requiredl:true
    }
})

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;