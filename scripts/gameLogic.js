// Function to handle keydown events
function handleKeydown(event) {
    const key = event.key.toLowerCase(); 

    // Check if the key is a letter from 'a' to 'z'
    if (key >= 'a' && key <= 'z') {
        // console.log('Key pressed:', key);
        checkLetter(key);
    }
}

// Function to check if the letter is in the word (example)
function checkLetter(letter) {
    // console.log('Checking letter:', letter);

    if (guessedLetters.includes(letter)) {
        console.log('Letter already guessed:', letter);
        return;
    }

    guessedLetters.push(letter);

    if (word.includes(letter)) {
        showLetter(letter);
    } else {
        if (letter !== 'backspace' && letter !== 'enter') {
            markIncorrectLetter(letter);
            removeLife();
        }
    }
}

// Function to mark the letter as incorrect on the virtual keyboard
function markIncorrectLetter(letter) {
    const rows = document.querySelectorAll('.keyboard .row');
    
    rows.forEach(row => {
        const keys = row.querySelectorAll('.key');
        keys.forEach(keyDiv => {
            if (keyDiv.textContent.toLowerCase() === letter) {
                keyDiv.querySelector('button').classList.add('incorrect');
                // console.log('Marking incorrect letter:', letter);
            }
        });
    });
}

// Function to show the letter in the word
function showLetter(letter) {
    // console.log('Showing letter:', letter);

    // get all positions of the letter in the word
    const positions = [];
    word.split('').forEach((char, index) => {
        if (char === letter) positions.push(index);
    });

    // Display the letter in the correct positions
    var letters = document.querySelectorAll('.letter');
    positions.forEach(pos => {
        letters[pos].textContent = letter;
    });

    // Mark the letter as correct on the virtual keyboard
    markCorrectLetter(letter);

    // Check if the word is fully revealed
    checkWordCompletion();
}

function markCorrectLetter(letter) {
    const rows = document.querySelectorAll('.keyboard .row');
    
    rows.forEach(row => {
        const keys = row.querySelectorAll('.key');
        keys.forEach(keyDiv => {
            if (keyDiv.textContent.toLowerCase() === letter) {
                keyDiv.querySelector('button').classList.add('correct');
                // console.log('Marking correct letter:', letter);
            }
        });
    });
}

function checkWordCompletion() {
    const letters = document.querySelectorAll('.letter');
    
    // Check if all letter divs are filled or if they are spaces
    const wordComplete = [...letters].every((letterDiv, index) => {
        const letterContent = letterDiv.textContent;
        // Assuming your words may include spaces, check if the corresponding word character is a space
        return letterContent !== '' || (word[index] === ' ' && letterContent === '');
    });
    
    if (wordComplete) {
        gameOver(true);
    }
}

function removeLife() {
    const hangmanParts = document.querySelectorAll('.hangman div');
    hangmanParts[hangmanParts.length - lives].style.display = 'block';
    lives--;

    if (lives === 0) {
        gameOver(false);
    }
}

function gameOver(win = false) {
    const winScreen = document.querySelector('.win-screen');
    const winMessage = winScreen.querySelector('h2');
    const winWord = winScreen.querySelector('.win-word');
    const livesRemaining = winScreen.querySelector('.lives-remaining');

    if (win) {
        winMessage.textContent = 'Congratulations!';
        winWord.textContent = 'You correctly guessed the word!';
        livesRemaining.textContent = `You had ${lives} lives remaining.`;
    } else {
        winMessage.textContent = 'Game Over!';
        winWord.textContent = `The word was: ${word}`;
        livesRemaining.textContent = 'You ran out of lives.';
    }
    
    winScreen.style.display = 'flex';
}

// Add event listener for keydown
document.addEventListener('keydown', handleKeydown);
