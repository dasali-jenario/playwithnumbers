// Function to change the difficulty of the game
function changeDifficulty() {
    var difficulty = document.getElementById('difficulty').value;
    // Implement the logic to change the difficulty of the game
    // This could involve changing the grid size, the time limit, etc.
}

// Function to submit a word
function submitWord() {
    var wordInput = document.getElementById('wordInput').value;
    // Implement the logic to check the submitted word and update the game state
    // This could involve checking if the word is valid, updating the score, etc.
}

// Function to reshuffle the grid
function reshuffle() {
    // Implement the logic to reshuffle the grid
    // This could involve generating a new grid of letters
}

// Function to share the score on Twitter
function shareOnTwitter() {
    var score = document.getElementById('score').innerText;
    // Implement the logic to share the score on Twitter
    // This could involve creating a tweet with the score and opening it in a new window
}
function checkWord(word) {
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '8a31b0a430msh805f0073a1340c5p18e2a3jsn35cae4f0c64c',
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Do something with the data
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });
}
// You can add more functions as needed