let difficulty = 'easy';
let category = '';
let word = '';
let clue = '';
let lives = 6;
let guessedLetters = [];

function showLoading() {
    document.querySelector('.loading').style.display = 'block';
}

function hideLoading() {
    document.querySelector('.loading').style.display = 'none';
}

function back() {
    document.querySelector('.categories').style.display = 'none';
    document.querySelector('.difficulties').style.display = 'block';
}

function restartGame() {
    word = '';
    clue = '';
    lives = 6;
    guessedLetters = [];

    generateWord(category);

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

function goHome() {
    document.querySelector('.game').style.display = 'none';
    document.querySelector('.difficulties').style.display = 'none';
}

function setDifficulty(diff) {
    difficulty = diff;

    document.querySelector('.difficulties').style.display = 'none';
    document.querySelector('.categories').style.display = 'block';
    generateCategoryList();
}

function setCategory(cat) {
    category = cat;
    
    document.querySelector('.categories').style.display = 'none';
    document.querySelector('.difficulties').style.display = 'none';
    document.querySelector('.game').style.display = 'block';
    generateWord(cat);
}