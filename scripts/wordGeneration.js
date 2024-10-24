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

async function generateFoundWordList() {
    const foundWordSection = document.querySelector('.words-found');
    const foundWordList = foundWordSection.querySelector('.found-words-list');
    foundWordList.innerHTML = ''; // Clear the list

    try {
        const categories = await getCatrgoryJSON();

        // Fetch all data in parallel
        const promises = categories.map(async category => {
            if (category.disabled) return;

            const [foundWords, wordsJSON] = await Promise.all([
                getFoundWords(category.id),
                getWordJSON(category.id)
            ]);

            // Create category container and heading
            const categoryContainer = document.createElement('li');
            const containerHeading = document.createElement('h3');
            containerHeading.innerHTML = `${category.name} (${foundWords[1]}/${wordsJSON.length})`;
            const underline = document.createElement('hr');

            // Create the words container
            const wordsContainer = document.createElement('div');
            wordsContainer.classList.add("words");

            // Build all words for this category
            const fragment = document.createDocumentFragment();
            wordsJSON.forEach(wordObj => {
                const item = document.createElement('div');
                item.classList.add('word');
                item.innerHTML = foundWords[0].includes(wordObj.word)
                    ? wordObj.word.charAt(0).toUpperCase() + wordObj.word.slice(1)
                    : wordObj.word.replaceAll(/[a-zA-Z]/g, '?');

                if (foundWords[0].includes(wordObj.word)) {
                    item.classList.add('found');
                }

                fragment.appendChild(item);
            });

            wordsContainer.appendChild(fragment); // Append all words at once

            // Append everything to the category container
            categoryContainer.appendChild(containerHeading);
            categoryContainer.appendChild(underline);
            categoryContainer.appendChild(wordsContainer);

            return categoryContainer;
        });

        const categoryContainers = await Promise.all(promises);
        categoryContainers.forEach(container => {
            if (container) foundWordList.appendChild(container);
        });

    } catch (error) {
        console.error('Error generating found word list:', error);
    }
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