document.addEventListener('DOMContentLoaded', function() {
    const myElement = document.querySelector('.Name');
    myElement.textContent = localStorage.getItem('name');
  });
  
  async function rating(number) {
    const isLoggedin = JSON.parse(localStorage.getItem('isLoggedin'));

    if (isLoggedin) {
      const rating = {
        user: localStorage.getItem('name'),
        rate: number
      };

      try {
        const response = await fetch('/api/rate', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(rating),
        });
    
        const avgRating = await response.json();
        document.querySelector('#overallRating').textContent = avgRating.avg;
      } catch(error) {
        console.log(error);
      }
    } else {
      document.querySelector('#ratingError').textContent = 'Must be logged in to rate!';
    }
  }

  async function loadRating(){
    try {
      const response = await fetch('/api/ratings');
      recommendations = await response.json();
  
      const avgRating = await response.json();
      localStorage.setItem('avgRating', avgRating.avg);
    } catch(error) {
      console.log(error);
    }
    document.querySelector('#overallRating').textContent = avgRating.avg;
  }

loadRating();

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