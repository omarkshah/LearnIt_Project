const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    question:{
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
    }
})

const Post = mongoose.model('posts', postSchema);
module.exports = Post;