// const postId =window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
const Post = require('./models/posts');
const postId = Qs.parse(location.search,{
    ignoreQueryPrefix: true,
});
const mongoose = require('mongoose');
const questionBox = document.getElementById('question-box');
const comments = document.getElementById('comments');
const questionContainer = document.getElementsByClassName('question-container');
const usernameBox = document.getElementById('username-box');
const post;
console.log(window.location.href);
Post.find({ "_id": postId}).limit(1).then(result => {
    post = result
    console.log(post)

});
usernameBox.innerText = post.username+', '+post.qualification;
questionBox.innerText = post.question;
// function showQuestion(postId){
//     Post.find({ "_id": postId}).limit(1).then(result => {
//         post = result
//     });
//     usernameBox.innerText = post.username+', '+post.qualification;
//     questionBox.innerText = post.question;
// }
function postComment(comment){


}