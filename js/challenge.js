//TODO clean up code and comments


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('form').addEventListener('submit', (e1) => {
        e1.preventDefault()
        const userInput= document.getElementById('comment-input').value;
        handleSubmit(userInput);
    });
});

function handleSubmit(userInput) {
    const commentSection = document.getElementById('list');
    const newComment = document.createElement('p');
    newComment.textContent = userInput;
    commentSection.appendChild(newComment); 
}

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

// Start the interval automatically when the page loads
window.onload = function() {
    startInterval(); 
};

// Event listener for the pause/resume button
pause.addEventListener("click", function() {
    // If the button says 'Pause', we need to pause the timer
    if (!isPaused) {
        clearInterval(intervalID);  // Stop the interval
        pause.textContent = 'resume'; 
        isPaused = true; 
        [plus, minus, heart].forEach(button => button.disabled = true);
    } 
    // If the button says 'Resume', restart the interval
    else {
        startInterval();  
        pause.textContent = 'pause';  
        isPaused = false;  
        [plus, minus, heart].forEach(button => button.disabled = false);  
    }
});

document.addEventListener("click", function(e) {
    if (e.target === minus) {
        counter--;
    } else if(e.target === plus) {
        counter++;
    }
    // Initial display update
    updateCounter();
});

heart.addEventListener("click", function() {
    // Check if the current counter value has been liked before
    if (likes[counter]) {
        likes[counter]++;
    } else {
        likes[counter] = 1;
    }
    updateLikesDisplay(); 
});

function updateLikesDisplay() {
    let likeList = document.getElementById('likes');

    // If the likeList doesn't exist, create it as a <ul>
    if (!likeList) {
        likeList = document.createElement('ul');
        likeList.id = 'likes'; // Give it an ID for future access

        // Locate the pause button
        const pauseButton = document.getElementById('pause');

        // Use insertAdjacentElement to insert the likeList after the pause button but before the comments
        pauseButton.insertAdjacentElement('afterend', likeList); 
    }

    // Clear existing likes to avoid duplication
    likeList.innerHTML = '';

    // Populate the like list with new items
    for (const [n, likeCount] of Object.entries(likes)) {
        const listItem = document.createElement('li');
        listItem.textContent = `Number ${n} has been liked ${likeCount} times!`;
        likeList.appendChild(listItem); // Add each liked number to the list
    }
}