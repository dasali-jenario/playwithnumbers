window.onload = function() {
    generateGrid();
};

// Function to change the difficulty of the game
function changeDifficulty() {
    var difficulty = document.getElementById('difficulty').value;  
    // Example implementation: Changing the grid size based on difficulty
    var gridSize;
    if (difficulty === 'easy') {
        gridSize = 4;
    } else if (difficulty === 'medium') {
        gridSize = 5;
    } else if (difficulty === 'hard') {
        gridSize = 6;
    }
    
    // Update the grid size in the game state
    gameState.gridSize = gridSize;
    
    // Example implementation: Changing the time limit based on difficulty
    var timeLimit;
    if (difficulty === 'easy') {
        timeLimit = 60;
    } else if (difficulty === 'medium') {
        timeLimit = 45;
    } else if (difficulty === 'hard') {
        timeLimit = 30;
    }
    
    // Update the time limit in the game state
    gameState.timeLimit = timeLimit;
}

// Function to submit a word
function submitWord() {
    var wordInput = document.getElementById('wordInput').value;
    checkWord(wordInput);
    
    // Clear the word input field
    document.getElementById('wordInput').value = '';
    
    // Update the score display
    updateScore();
}

// Function to update the score display
function updateScore() {
    var scoreElement = document.getElementById('score');
    var currentScore = parseInt(scoreElement.innerText);
    var newScore = currentScore + 1;
    scoreElement.innerText = newScore;
}

// Function to reshuffle the grid
function reshuffle() {    
    // Get the grid element
    var gridElement = document.getElementById('grid');
    
    // Clear the existing grid
    gridElement.innerHTML = '';
    
    // Generate a new grid of letters
    var letters = generateLetters(gameState.gridSize);
    
    // Populate the grid with the new letters
    for (var i = 0; i < letters.length; i++) {
        var letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        letterElement.innerText = letters[i];
        gridElement.appendChild(letterElement);
    }
}

// Function to generate a grid of random letters
function generateLetters(gridSize) {
    var letters = [];
    var possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (var i = 0; i < gridSize * gridSize; i++) {
        var randomIndex = Math.floor(Math.random() * possibleLetters.length);
        var randomLetter = possibleLetters.charAt(randomIndex);
        letters.push(randomLetter);
    }
    
    return letters;
}

// Function to share the score on Twitter
function shareOnTwitter() {
    var score = document.getElementById('score').innerText;
    var tweet = `My score is ${score} in the play with letters game! #PlayWithLetters`;
    var tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(tweetUrl, '_blank');
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
        if (data.word) {
            // The word exists, update the game state
            // This could involve adding the word to a list of valid words, updating the score, etc.
            updateGameState(word);
            console.log(`The word "${word}" is valid.`);
        } else {
            // The word does not exist, display an error message
            displayErrorMessage(`The word "${word}" is not valid.`);
        }
    })
    .catch(err => {
        console.error(err);
    });
}

function updateGameState(word) {
    validWords.push(word);
    updateScore();
}

function displayErrorMessage(message) {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.innerText = message;
}

function generateGrid() {
    // Get the grid container
    var gridContainer = document.getElementById('grid');

    // Use the grid size from the game state
    var gridSize = gameState.gridSize;

    // Define the letters that can be used in the grid
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Generate the grid
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            // Create a new grid cell
            var cell = document.createElement('div');

            // Add a random letter to the cell
            var randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
            cell.textContent = randomLetter;

            // Add the cell to the grid container
            gridContainer.appendChild(cell);
        }

        // Add a line break after each row
        gridContainer.appendChild(document.createElement('br'));
    }
}