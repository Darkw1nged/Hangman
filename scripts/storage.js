// Per category i want to store all words found and the amount of words comapred to the total amount of words in that category.
function storeWord(word, category) {
    if (!localStorage.getItem('words')) {
        localStorage.setItem('words', JSON.stringify({}));
    }

    const words = JSON.parse(localStorage.getItem('words'));
    if (!words[category]) {
        words[category] = { found: [], total: 0 };
    }

    // If word is already found, do nothing
    if (words[category].found.includes(word)) {
        console.log('Word already found');
        return;
    }

    words[category].found.push(word);
    words[category].total++;

    localStorage.setItem('words', JSON.stringify(words));
    console.log('Word stored:', word);
}

function getFoundWords(category) {
    if (!localStorage.getItem('words')) return;

    const words = JSON.parse(localStorage.getItem('words'));
    if (!words[category]) words[category] = { found: [], total: 0 };

    return [words[category].found, words[category].total];
}