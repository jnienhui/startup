async function createUser(endpoint) {
    const inputUsername = document.querySelector('#newUsername').value;
    const inputPassword = document.querySelector('#newPassword').value;
    const inputPasswordConfirm = document.querySelector('#confirmPassword').value;
    let passwordPass = true;

    if(inputPassword !== inputPasswordConfirm){
      passwordPass = false;
      document.querySelector('#createPasswordError').textContent = 'Passwords do not match or invalid!';
    }
  
    if(passwordPass){
      try{
        const response = await fetch(endpoint, {
          method: 'post',
          body: JSON.stringify({ email: inputUsername, password: inputPassword }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
      });
      const body = await response.json();

      if (response?.status === 200) {
          localStorage.setItem('name', inputUsername);
          localStorage.setItem('isLoggedin', true)
          window.location.href = 'myBooks.html';
      } else {
          document.querySelector('#createPasswordError').textContent = 'Create Failed!';
      }
      } catch(error){
        console.log(error);
        document.querySelector('#createPasswordError').textContent = error;
      }
    }
    
  }

  const createLoginForm = document.querySelector('#createLoginForm');
  createLoginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    createUser(`/api/auth/create`); 
  });

const clearStorageButton = document.querySelector('#clearStorageButton');

clearStorageButton.addEventListener('click', function() {
  localStorage.clear();
  document.querySelector('#clearStorage').textContent = 'Storage cleared!';
});
