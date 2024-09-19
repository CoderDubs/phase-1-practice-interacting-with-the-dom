
let counter = 0;
const counterElement = document.getElementById('counter');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const heart = document.getElementById('heart');
const pause = document.getElementById('pause');

let intervalID;
let likes = {};
let buttons = {};

function updateCounter() {
    counterElement.textContent = counter;
}

document.addEventListener("click", function(e) {
    if (e.target === minus) {
        counter--;
    } else if(e.target === plus) {
        counter++;
    }
    // Initial display update
    updateCounter();
});

function updateLikesDisplay() {
    let likeList = document.getElementById('likes');
    
    // If the likeList doesn't exist, create it as a <ul>
    if (!likeList) {
        likeList = document.createElement('ul');
        likeList.id = 'likes'; // Give it an ID so we can access it later
        document.body.appendChild(likeList);
    }
    // Clear the previous likes list
    likeList.innerHTML = '';
    // Populate the likes list
    for (const [n, likeCount] of Object.entries(likes)) {
        const listItem = document.createElement('li'); // Create individual <li> for each liked number
        listItem.textContent = `Number ${n} has been liked ${likeCount} times!`;
        
        //need guidance here↓
        const container = document.getElementById('likes');
        container.appendChild(listItem);
    }
}

heart.addEventListener("click", function() {
    // Check if the current counter value has been liked before
    if (likes[counter]) {
        likes[counter]++;
    } else {
        likes[counter] = 1;
    }
    updateLikesDisplay(); 
});

pause.addEventListener("click", function() {
    if (pause.textContent==='pause') {
        clearInterval(intervalID);
        pause.textContent = 'resume';
        [plus, minus, heart].forEach(buttons => buttons.disabled=true);
    } else {
        intervalID = setInterval(function() {
            counter++;
            updateCounter();
        }, 1000);
        pause.textContent = 'pause';
    
    [plus, minus, heart].forEach(buttons => buttons.disabled=false);
    }
});

/*
TO DO
submite button -> log input to id="list" class="comments"
*/