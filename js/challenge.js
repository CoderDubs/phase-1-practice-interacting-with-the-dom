/*
  This JavaScript code creates a dynamic counter that auto-increments every second. 
  Users can manually adjust the counter, pause/resume it, "like" specific numbers, 
  and submit comments. Event listeners handle button clicks, form submissions, and 
  update the UI in real-time.
*/

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('form').addEventListener('submit', (e1) => {
        e1.preventDefault()
        const userInput= document.getElementById('comment-input').value;
        handleSubmit(userInput);
    });
});

let counter = 0;
let intervalID;  // store interval
let isPaused = false;  // if timer paused
let likes = {};
let userInput;

const counterElement = document.getElementById('counter');
const pause = document.getElementById('pause');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const heart = document.getElementById('heart');

function updateCounter() {
    counterElement.textContent = counter;
}

// Function to start the interval (called on page load and on resume)
function startInterval() {
    intervalID = setInterval(function() {
        counter++;
        updateCounter();
    }, 1000);
}

window.onload = function() {
    startInterval(); 
};

document.addEventListener("click", function(e) {
    if (e.target === minus && counter>0) {
        counter--;
    } else if(e.target === plus) {
        counter++;
    }
    updateCounter();
});

heart.addEventListener("click", function() {
    if (likes[counter]) {
        likes[counter]++;
    } else {
        likes[counter] = 1;
    }
    updateLikesDisplay(); 
});

pause.addEventListener("click", function() {
    if (!isPaused) {
        clearInterval(intervalID);  // Stop interval
        pause.textContent = 'resume'; 
        isPaused = true; 
        [plus, minus, heart].forEach(button => button.disabled = true);
    } else {
        startInterval();  
        pause.textContent = 'pause';  
        isPaused = false;  
        [plus, minus, heart].forEach(button => button.disabled = false);  
    }
});

function updateLikesDisplay() {
    let likeList = document.getElementById('likes');
    //↓maybe not needed other ways to handle this function???
    if (!likeList) {
        likeList = document.createElement('ul');
        likeList.id = 'likes';
        pause.insertAdjacentElement('afterend', likeList); 
    }
    // Populate the like list with new items
    for (const [aHeart, likeCount] of Object.entries(likes)) {
        const listItem = document.createElement('li');
        listItem.textContent = `Number ${aHeart} has been liked ${likeCount} times!`;
        likeList.appendChild(listItem);
    }
}
function handleSubmit(userInput) {
    const commentSection = document.getElementById('list');
    const newComment = document.createElement('p');
    newComment.textContent = userInput;
    commentSection.appendChild(newComment); 
}