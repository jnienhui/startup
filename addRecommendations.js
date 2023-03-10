document.addEventListener('DOMContentLoaded', function() {
    const myElement = document.querySelector('.Name');
    myElement.textContent = localStorage.getItem('name');
  });

let storedFormData = JSON.parse(localStorage.getItem('bookDataArray')) || [];

// Get the form element and add an event listener to the submit button
const form = document.querySelector('#addRec');
form.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  
  // Get the values of the form inputs
  const user = localStorage.getItem('name');
  if(user === null){
    document.querySelector('#addRecSuccess').textContent = "Must be logged in to add recommendations!";
    return;
  }
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const summary = document.querySelector('#summary').value;
  
  // Create a JavaScript object to hold the form data
  const formData = {
    user: user,
    title: title,
    author: author,
    summary: summary
  };
  
  storedFormData.push(formData);

  // Convert the JavaScript object to a JSON string
  const jsonData = JSON.stringify(storedFormData);
  
  // Store the JSON data in localStorage
  localStorage.setItem('bookDataArray', jsonData);
  document.querySelector('#addRecSuccess').textContent = "Recommendation added sucessfully!";
  form.reset();
});

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