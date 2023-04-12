document.addEventListener('DOMContentLoaded', function() {
    const myElement = document.querySelector('.Name');
    myElement.textContent = localStorage.getItem('name');
  });

async function loadRecommendations() {
  let recommendations = [];
  try {
    // Get the latest recommendations from the service
    const response = await fetch('/api/recommendations');
    recommendations = await response.json();

    // Save the recommendations in case we go offline in the future
    localStorage.setItem('recommendations', JSON.stringify(recommendations));
  } catch {
    // If there was an error then just use the last saved recommendations
    const recommendationsText = localStorage.getItem('recommendations');
    if (recommendationsText) {
      recommendations = JSON.parse(recommendationsText);
    }
  }

  displayRecommendations(recommendations);
}

function displayRecommendations(recommendations) {
  const tableBodyEl = document.querySelector('#recommendations');

  if (recommendations.length) {
    // Update the DOM with the scores
    for (const [i, recommendation] of recommendations.entries()) {
      const userTdEl = document.createElement('td');
      const titleTdEl = document.createElement('td');
      const authorTdEl = document.createElement('td');
      const summaryTdEl = document.createElement('td');

      userTdEl.textContent = recommendation.user;
      titleTdEl.textContent = recommendation.title;
      authorTdEl.textContent = recommendation.author;
      summaryTdEl.textContent = recommendation.summary;

      const rowEl = document.createElement('tr');
      rowEl.appendChild(userTdEl);
      rowEl.appendChild(titleTdEl);
      rowEl.appendChild(authorTdEl);
      rowEl.appendChild(summaryTdEl);

      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to recommend!</td></tr>';
  }
}

loadRecommendations();
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
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
  });
