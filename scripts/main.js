window.onload = function () {
    generateWord();
}

function restartGame() {
    lives = 6;
    guessedLetters = [];
    generateWord();

    document.querySelector('.keyboard').querySelectorAll('.incorrect').forEach(function (button) {
        button.classList.remove('incorrect');
    });

    document.querySelector('.keyboard').querySelectorAll('.correct').forEach(function (button) {
        button.classList.remove('correct');
    });

    const hangmanParts = document.querySelectorAll('.hangman div');
    hangmanParts.forEach(function (part) {
        part.style.display = 'none';
    });

    document.querySelector('.win-screen').style.display = 'none';
}