const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io')
const io = socketio(server);
const formatQuestion = require('./utils/questions');
const {userJoin, getCurrentUser} = require('./utils/users');
const Post = require('./models/posts');
const Comment = require('./models/comments');
const mongoDB = 'mongodb+srv://LearnItDev__Omar:dev@LearnIt@cluster0.wqog7.mongodb.net/posts-DB?retryWrites=true&w=majority'

let user = undefined;
let username = '';
let qualification = ''

//connecting to mongoose
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
}).catch(err => console.log(err))



//Setting the static folder
app.use(express.static(path.join(__dirname,'public')));

//Server listenting for connection
io.on('connection', socket => {

    Post.find().then((result)=>{
        socket.emit('output-posts', result);
    })
    
    socket.on('link-clicked', (id)=>{

        //socket.on('sendUserInfo', (uId, username, qualification) => {
            Post.findOne({ _id: id},(error, result) => {
                //console.log(username + " " + qualification + "pepe");
                socket.emit('return-question', (result));
            }); 
    
    });

    console.log("connection made");

    //listening for joinAp to create a user and join them
    socket.on('joinApp', ({username, qualification}) =>{
        const user = userJoin(socket.id, username, qualification)
    })

    
 
    //Listening for post in order to emit postMade
    socket.on('post', (question) =>{
        user = getCurrentUser(socket.id);
        username = user.username;
        qualification = user.qualification;
      

        const post = new Post({question, username, qualification});

        post.save().then(() => {
            io.emit('postMade', (post));
        })
        
        
    });    

    
    socket.on('comment', (comment) => {



        console.log(username +  " " + qualification);

        socket.emit('commentPost', (comment));
    })


    //  console.log(getCurrentUser(socket.id).username);;

    socket.on('commentPosted', (usrName, usrQual, usrComment, postId) => {

        console.log(usrName + "  " + usrQual + "  " + usrComment + "  " + postId );   


        const commentss = new Comment({usrComment, usrName, usrQual, postId});

        commentss.save().then(() => {
            io.emit('commentMade', (commentss));
        })

    });
 
})

module.exports = mongoDB;

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("Server Running on " + PORT));