RecentRecommendation = 'RecentRecommendation';
document.addEventListener('DOMContentLoaded', function() {
    const myElement = document.querySelector('.Name');
    myElement.textContent = localStorage.getItem('name');
    configureWebSocket();
    boundConfigureWebSocket(); // ensure socket is defined
  });


// Get the form element and add an event listener to the submit button
const form = document.querySelector('#addRec');
form.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  
  // Get the values of the form inputs
  const name = localStorage.getItem('name');
  if(name === null){
    document.querySelector('#addRecSuccess').textContent = "Must be logged in to add recommendations!";
    return;
  }
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const summary = document.querySelector('#summary').value;
  
  // Create a JavaScript object to hold the form data
  const recommendation = {
    user: name,
    title: title,
    author: author,
    summary: summary
  };
  
  addRecommendation(recommendation);
  
  document.querySelector('#addRecSuccess').textContent = "Recommendation added sucessfully!";
  broadcastEvent(name,RecentRecommendation ,title);
  form.reset();
});

async function addRecommendation(recommendation){
  try {
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(recommendation),
    });

    const recommendations = await response.json();
    localStorage.setItem('recommendations', JSON.stringify(recommendations));
  } catch(error) {
    console.log(error);
  }
}

function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  this.socket.onopen = (event) => {
    console.log('Websocket opened');
  };
  this.socket.onclose = (event) => {
    console.log('Websocket closed');
  };
  this.socket.onmessage = async (event) => {
    console.log('Recommendation broadcasted');
    const msg = JSON.parse(await event.data.text());
    if (msg.type === RecentRecommendation) {
      this.displayMsg('user', msg.from, `recently recommended ${msg.value}`);
    } 
  };
}

const boundConfigureWebSocket = configureWebSocket.bind(this);


const MAX_MESSAGES = 10;
function displayMsg(cls, from, msg) {
  const chatText = document.querySelector('#recent-recommendations');
  const newRec =
    `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>`;
    chatText.insertAdjacentHTML('afterbegin', newRec);
  // remove the oldest message if the maximum limit is reached
  if (chatText.children.length > MAX_MESSAGES) {
    chatText.removeChild(chatText.lastElementChild);
  }
}

function broadcastEvent(from, type, value) {
  const event = {
    from: from,
    type: type,
    value: value,
  };
  
  if (this.socket.readyState === WebSocket.OPEN) {
    this.socket.send(JSON.stringify(event));
  } else {
    console.log('WebSocket connection is not fully open yet');
    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify(event));
    });
  }
}

const signoutBtn = document.querySelector('#signout-btn');

// check if the user is signed in
if (localStorage.getItem('isLoggedin')) {
  console.log('configuredWebsocket');
  // show the signout button
  console.log('error configuring websocket did not occur');
  signoutBtn.style.display = 'block';
} else {
  // hide the signout button
  signoutBtn.style.display = 'none';
}

signoutBtn.addEventListener('click', function() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('name');
    signoutBtn.style.display = 'none';
    location.reload();
  });