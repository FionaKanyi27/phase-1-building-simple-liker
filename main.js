// Select the necessary DOM elements
const errorModal = document.getElementById('modal');
const hearts = document.querySelectorAll('.like-glyph');

// Initially hide the error modal
errorModal.classList.add('hidden');

// Function to handle server call and heart toggle
function handleHeartClick(event) {
  const heart = event.target;

  // Simulate a server call
  mimicServerCall()
    .then(() => {
      // Successful server response
      if (heart.innerText === '♡') {
        // Change to full heart
        heart.innerText = '♥';
        heart.classList.add('activated-heart');
      } else {
        // Change back to empty heart
        heart.innerText = '♡';
        heart.classList.remove('activated-heart');
      }
    })
    .catch((error) => {
      // Server call failed, display error modal
      errorModal.classList.remove('hidden');
      errorModal.querySelector('#modal-message').innerText = error;

      // Hide the error modal after 3 seconds
      setTimeout(() => {
        errorModal.classList.add('hidden');
      }, 3000);
    });
}

// Attach event listeners to each heart element
hearts.forEach(heart => {
  heart.addEventListener('click', handleHeartClick);
});

// Mock server call function (provided)
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
