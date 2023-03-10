function tryLogin() {
    const storedUsernames = localStorage.getItem("usernames");
    const myUsernames = storedUsernames ? JSON.parse(storedUsernames) : [];
  
    const storedPasswords = localStorage.getItem("passwords");
    const myPasswords = storedPasswords ? JSON.parse(storedPasswords) : [];
  
    const inputUsername = document.querySelector('#loginUsername').value;
    const inputPassword = document.querySelector('#loginPassword').value;

    let usernamePass = false;
    let index = 0;
    let passwordPass = false;

    for(let i = 0; i < myUsernames.length; i++){
        if(myUsernames[i] === inputUsername){
          usernamePass = true;
          index = i;
        }
    }

    if(usernamePass){
        if(myPasswords[index] === inputPassword){
            passwordPass = true;
            localStorage.setItem("name",inputUsername)
            localStorage.setItem('isLoggedin', true);
            window.location.href = "myBooks.html";
        }
        else{
            document.querySelector('#loginPasswordError').textContent = 'Password invalid!';
        }
    }
    else{
        document.querySelector('#loginUserError').textContent = 'Username invalid!';
    }
}

const LoginForm = document.querySelector('#loginForm');
LoginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    tryLogin(); 
  });