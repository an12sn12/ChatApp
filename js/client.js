 const socket = io('http://localhost:8000', { transports: ['websocket'] });
 // Get DOM element in respective js variable//
 const form = document.getElementById('sendcontainer')
 const messageInput = document.getElementById('messageInp')
 const messageContainer = document.querySelector(".container")
     //audio that will paly on receving the message//

 var audio = new Audio('ting.mp3');

 //function which will append event to the container//  
 const append = (message, position) => {
     const messageElement = document.createElement('div');
     messageElement.innerText = message;
     messageElement.classList.add('message');
     messageElement.classList.add(position);
     messageContainer.append(messageElement);
     if (position == 'left') {
         audio.play();
     }
 }

 /// Ask  new user for his/her name and let the server know//
 const name = prompt("enter your name to join");
 socket.emit('new-user-joined', name);

 //if a new user join receive the event from server//
 socket.on('user-joined', name => {
     append(`${name} joined the chat`, 'right')
 })

 // if the server sends a message recive it//
 socket.on('receive', data => {
     append(`${data.name}:${data.message}`, 'left')
 })

 ///if a users left the chat append the info to the container//
 socket.on('left', name => {
     append(`${name} left the chat`, 'right')
 })

 //if the form get submited  send the server the message//
 form.addEventListener('submit', (e) => {
     e.preventDefault();
     const message = messageInput.value;
     append(`You:${message}`, 'right')
     socket.emit('send', message);
     messageInput.value = ' '
 })