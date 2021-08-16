const postBox = document.getElementById('post-box-form');


//Getting username and qualification from the URL 
const {username, qualification} = Qs.parse(location.search,{
    ignoreQueryPrefix: true,
});

const socket = io();

//emit joinApp to user user and their qualification into the application
socket.emit('joinApp', {username, qualification});

//On postmade outputting the text and username
socket.on('postMade', (post) => {
   

    postQuestion(post);


})

socket.on('output-posts', data => {
 
    console.log(data);

    if (data.length){
        data.forEach(question => {
            postQuestion(question);
        })
    }
    


})

//Post button submit
postBox.addEventListener('submit', e => {
    e.preventDefault();

    //getting the question from the post Box 
    let question = e.target.elements.questionInput.value;

    question = question.trim();

    if(!question){
        return false;
    }

    // console.log(question);

    //Emitting message to the server
    socket.emit('post', (question));

    //clearning the postbox values
    e.target.elements.questionInput.value =  '';
    e.target.elements.questionInput.focus();


})

//Posting question to DOM
function postQuestion(question){
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = question.username + ', ' + question.qualification;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = question.question;
    div.appendChild(para);
    const a = document.createElement('a');
    a.href = '/post/' + question._id;
    a.innerText = 'Comment'
    // a.onclick = function myFunction(){
    //     socket.emit('comment-clicked', (question.question));
    // }
    div.appendChild(a);
    const imag =  document.createElement("IMG");
    imag.src = "comment_logo.png";
    a.appendChild(imag);
    document.querySelector('.posted-questions').appendChild(div);
}



