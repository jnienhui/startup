function createUser() {
    const storedUsernames = localStorage.getItem("usernames");
    const myUsernames = storedUsernames ? JSON.parse(storedUsernames) : [];
  
    const storedPasswords = localStorage.getItem("passwords");
    const myPasswords = storedPasswords ? JSON.parse(storedPasswords) : [];
  
    const inputUsername = document.querySelector('#newUsername').value;
    const inputPassword = document.querySelector('#newPassword').value;
    const inputPasswordConfirm = document.querySelector('#confirmPassword').value;
    let usernamePass = true;
    let passwordPass = true;
  
    for(let i = 0; i < myUsernames.length; i++){
      if(myUsernames[i] === inputUsername){
        usernamePass = false;
      }
    }
  
    if(inputUsername.length === 0){
      usernamePass = false;
    }
  
    if(!usernamePass){
      document.querySelector('#createUserError').textContent = 'Username already taken or invalid!';
    } 
    else {
      if(inputPassword !== inputPasswordConfirm){
        passwordPass = false;
        document.querySelector('#createPasswordError').textContent = 'Passwords do not match or invalid!';
      }
    }
  
    if(usernamePass && passwordPass){
      myUsernames.push(inputUsername);
      myPasswords.push(inputPassword);
      localStorage.setItem("usernames", JSON.stringify(myUsernames));
      localStorage.setItem("passwords", JSON.stringify(myPasswords));
      window.location.href = "index.html";
    }
  }

  const createLoginForm = document.querySelector('#createLoginForm');
  createLoginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    createUser(); 
  });

const clearStorageButton = document.querySelector('#clearStorageButton');

clearStorageButton.addEventListener('click', function() {
  localStorage.clear();
  document.querySelector('#clearStorage').textContent = 'Storage cleared!';
});
