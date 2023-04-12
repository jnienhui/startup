document.addEventListener('DOMContentLoaded', function() {
    const myElement = document.querySelector('.Name');
    myElement.textContent = localStorage.getItem('name');
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

const signoutBtn = document.querySelector('#signout-btn');

// check if the user is signed in
if (localStorage.getItem('isLoggedin')) {
  // show the signout button
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