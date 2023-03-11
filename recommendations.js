document.addEventListener('DOMContentLoaded', function() {
    const myElement = document.querySelector('.Name');
    myElement.textContent = localStorage.getItem('name');
  });

// Get the recommendation table body
const recommendationTable = document.getElementById('recommendations');

// Get the bookData array from localStorage, or create an empty array if it doesn't exist yet
const bookData = JSON.parse(localStorage.getItem('bookDataArray')) || [];

// Loop through the bookData array and append a new row to the table for each object
bookData.forEach(function(book) {
  // Create a new row element
  const row = document.createElement('tr');

  // Add the book data to the row as table cells
  const userCell = document.createElement('td');
  userCell.textContent = book.user;
  row.appendChild(userCell);

  const titleCell = document.createElement('td');
  titleCell.textContent = book.title;
  row.appendChild(titleCell);

  const authorCell = document.createElement('td');
  authorCell.textContent = book.author;
  row.appendChild(authorCell);

  const summaryCell = document.createElement('td');
  summaryCell.textContent = book.summary;
  row.appendChild(summaryCell);

  // Append the row to the table
  recommendationTable.appendChild(row);
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
