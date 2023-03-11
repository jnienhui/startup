document.addEventListener('DOMContentLoaded', function() {
    const myElement = document.querySelector('.Name');
    myElement.textContent = localStorage.getItem('name');
  });
  
  function rating(number) {
    const isLoggedin = JSON.parse(localStorage.getItem('isLoggedin'));
    let rating = JSON.parse(localStorage.getItem('rating1'));
  
    if (!rating) {
      rating = [];
    }

    if (isLoggedin) {
      rating.push(number);
      const sum = rating.reduce((acc, cur) => acc + cur, 0);
      const avg = sum / rating.length;
      const roundedAvg = avg.toFixed(1);
  
      localStorage.setItem('rating1', JSON.stringify(rating));
      document.querySelector('#overallRating').textContent = roundedAvg;
    } else {
      document.querySelector('#ratingError').textContent = 'Must be logged in to rate!';
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