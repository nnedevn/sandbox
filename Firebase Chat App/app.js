
var input =$ ('input');
var loginModal = $('#loginModal');
var fbase = new Firebase('https://dazzling-fire-9594.firebaseio.com/Chats');
var Userfbase = new Firebase('https://dazzling-fire-9594.firebaseio.com/Users');
var chatQuery =  fbase.limit(10);

var activeUsers={};
//sets up the listener for the value. 
chatQuery.on('value', function(chatObj){
	var output = $('#output');
	output.empty(); // clear the div
	var chats = chatObj.val();
	
	var chatString ='';

	$.each(chats, function(){ //append each chat to the div
		chatString += (this + ' <br /> ');
	} );
	output.append(emotify(chatString));
}); 

Userfbase.on('value', function(userObj){
	activeUsers = {};
	var users = $('#users');
	users.empty(); // clear the div
	
	var usersString ='';

	userObj.forEach(function(childObj){ //append each users to the div
		activeUsers[childObj.val()] = childObj.ref();	
		usersString += (childObj.val() + '<br>');
	} );
	users.append(usersString);
}); 



function sendChat(msg){
	fbase.push(window.localStorage.username + ": " + 
		msg);

}

function  inputSend(){
	var newChat = input.val();
	if (newChat) { //if there is smth in input send it, otherwise do nothing
		input.val('');
		sendChat(newChat);
	};
}

input.keypress(function(ev){ //13 is the code for enter
	if (ev.which == 13) {
		inputSend();
	};
});

function init(){
	var username = window.localStorage.username;
	if (!username) {
		loginModal.modal({backdrop: 'static'}); 
	}
	
}

function login(){

	var username = $('#username').val();
	if (username) {
		$('#username').val('');
		window.localStorage.username = username;
		loginModal.modal('hide');
		$('#loggedInAs').text('Loged in as ' +username);
		Userfbase.push(username);
	};
}

function logout(){
	activeUsers[window.localStorage.username].remove();
	window.localStorage.username = '';
	loginModal.modal({backdrop:'static'});

}

init();