const usernameBox = document.getElementById('username-box');
const questionBox = document.getElementById('question-box');
const commentForm = document.getElementById('comment-form');
const socket = io();
let uName = '';
let uQual = '';

const qsArr = window.location.search.slice(1).split('&');

socket.emit('link-clicked', (qsArr[0]));

socket.on('return-question', (post, username, qualification) => {

    uName = qsArr[1].split('=')[1]; //name
    uQual = qsArr[2].split('=')[1]; //qualification

    usernameBox.innerText = post["username"] + ", " + post["qualification"];
    questionBox.innerText = post["question"];
});

const currName = qsArr[3].split('-')[1]; // current user's name
const currQual = qsArr[4].split('-')[1];

socket.on('commentPost', (comment) => {
    commentObj = {"comment": comment, "username": qsArr[3].split('-')[1], "qualification": qsArr[4].split('-')[1], "pId": qsArr[0]};

    const commentTxt = commentObj.comment;
    const commentUs = commentObj.username;
    const commentQual = commentObj.qualification;
    const commentId = commentObj.pId;

    console.log(typeof commentTxt + "  " + typeof commentUs + " " + typeof commentQual + "  " + typeof commentId + " fddddddddd");

    socket.emit('commentPosted', (commentTxt, commentUs, commentQual, commentId));
})

socket.on('commentMade', (comment)=>{
    postComment(comment);
});

//Post button submit
commentForm.addEventListener('submit', e => {
    e.preventDefault();

    //getting the question from the post Box 
    let comment = e.target.elements.commentInput.value;

    comment = comment.trim();

    if(!comment){
        return false;
    }

    //Emitting message to the server
    socket.emit('comment', (comment));

    //clearning the postbox values
   // e.target.elements.commentInput.value.clear();
    e.target.elements.commentInput.focus();
})


function postComment(comment){
    const div = document.createElement('div');
    div.classList.add('comments');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = comment.username + ', ' + comment.qualification;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = comment.comment;
    div.appendChild(para);
    document.querySelector('.posted-comments').appendChild(div);
}

