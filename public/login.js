async function tryLogin(endpoint) {
    const inputUsername = document.querySelector('#loginUsername').value;
    const inputPassword = document.querySelector('#loginPassword').value;

    try {
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
            localStorage.setItem('isLoggedin', true);
            window.location.href = 'myBooks.html';
        } else {
            document.querySelector('#loginPasswordError').textContent = 'Login Failed!';
        }
    } catch (error) {
        console.log(error);
        document.querySelector('#loginPasswordError').textContent = error;
    }
}

const LoginForm = document.querySelector('#loginForm');
LoginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    await tryLogin('/api/auth/login'); 
});

function displayQuote(data) {
    const containerEl = document.querySelector("#quote");
  
    const quoteEl = document.createElement("p");
    quoteEl.classList.add("quote");
    const authorEl = document.createElement("p");
    authorEl.classList.add("author");
  
    quoteEl.textContent = data.content;
    authorEl.textContent = data.author;
  
    containerEl.appendChild(quoteEl);
    containerEl.appendChild(authorEl);
  }
  
  function callService(url, displayCallback) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        displayCallback(data);
      });
  }
  
  const random = Math.floor(Math.random() * 1000);

  callService("https://api.quotable.io/random", displayQuote);