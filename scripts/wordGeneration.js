let word = '';

// Function to get words from the JSON file using Fetch API
function getWordJSON() {
    return fetch('/Hangman/scripts/data/words.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data.words;
        })
        .catch(error => {
            console.error('Error fetching words:', error);
            return [];
        });
}

// Function to generate a random word
function generateWord() {
    getWordJSON().then(words => {
        // console.log('Fetched words:', words);

        if (words.length > 0) {
            var randomIndex = Math.floor(Math.random() * words.length);
            word = words[randomIndex];
            // console.log('Selected word:', word);
            generateWordDivs(word);
        } else {
            console.error('No words available');
        }
    });
}

// Generate divs respective to the length of the word with class .letter
function generateWordDivs(word) {
    // console.log('Word received in generateWordDivs:', word);

    if (typeof word !== 'string' || word === '') {
        // console.error('Invalid word:', word);
        return;
    }

    var wordDiv = document.querySelector('.word');
    wordDiv.innerHTML = '';

    for (var i = 0; i < word.length; i++) {
        var letter = document.createElement('div');
        letter.classList.add('letter');
        wordDiv.appendChild(letter);
    }
}