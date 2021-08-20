const usernameBox = document.getElementById('username-box');
const questionBox = document.getElementById('question-box');

const socket = io();



socket.emit('link-clicked', (window.location.search.slice(1)));

socket.on('return-question', (post, username, qualification) => {
    usernameBox.innerText = post["username"] + ", " + post["qualification"];
    questionBox.innerText = post["question"];

    let uName = '';
    let qual = '';    

    socket.emit('getUserInfo');

    socket.on('sendUserInfo', (username, qualification) => {
        uName = username;
        qual = qualification;

        console.log('am here');
    } );

    socket.on('send-UQ', (username, qualification) => {
    
    comment = {username: uName, qualification: qual, comment:"sure i can help"}

    postComment(comment);
    });


});


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

