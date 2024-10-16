function getCatrgoryJSON() {
    return fetch('https://darkw1nged.github.io/Hangman/scripts/data/categories.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data.categories;
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
            return [];
        });
}

// Function to get words from the JSON file using Fetch API
function getWordJSON(category) {
    return fetch('https://darkw1nged.github.io/Hangman/scripts/data/words.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data.categories[category].words;

        })
        .catch(error => {
            console.error('Error fetching words:', error);
            return [];
        });
}

function generateCategoryList() {
    const categorySection = document.querySelector('.categories');
    const categoryList = categorySection.querySelector('.category-list');
    categoryList.innerHTML = '';

    getCatrgoryJSON().then(categories => {
        categories.forEach(category => {
            if (category.disabled) return;

            const categoryItem = document.createElement('li');
            categoryItem.textContent = category.name;
            categoryItem.classList.add('category-item');
            categoryItem.addEventListener('click', () => setCategory(category.id));
            categoryList.appendChild(categoryItem);
        });
    }).catch(error => {
        console.error('Error fetching categories:', error);
    });
}

function generateWord(category) {
    showLoading();

    getWordJSON(category).then(words => {
        hideLoading();
        if (words.length > 0) {
            let randomIndex = Math.floor(Math.random() * words.length);
            word = words[randomIndex].word;
            clue = words[randomIndex].clue;
            generateWordDivs(word);
        } else {
            console.error('No words available');
        }
    }).catch(error => {
        hideLoading();
        console.error('Error fetching words:', error);
    });
}


// Generate divs respective to the length of the word with class .letter
function generateWordDivs(word) {
    console.log('Word received in generateWordDivs:', word);

    if (typeof word !== 'string' || word === '') {
        // console.error('Invalid word:', word);
        return;
    }

    const wordDiv = document.querySelector('.word');
    wordDiv.innerHTML = '';

    for (let i = 0; i < word.length; i++) {
        const letter = document.createElement('div');
        letter.classList.add('letter');

        if (word[i] === ' ') {
            letter.classList.add('space');
        }

        wordDiv.appendChild(letter);
    }

    const hint = document.querySelector('.hint');
    hint.textContent = clue;
}