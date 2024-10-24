function showPage(page) {
    const pages = ['categories', 'words-found', 'difficulties', 'game'];
    pages.forEach(p => {
        // console.log(p, page);
        document.querySelector(`.${p}`).style.display = (p === page) ? 'block' : 'none';
    });

    if (page) {
        window.history.pushState({ page: page }, '', `/${page}`);
    } else {
        window.history.pushState({}, '', '/');
    }
}

// Use the showPage function in your existing methods
function goHome() {
    showPage('difficulties');
}

function back() {
    showPage('difficulties');
}

function showWordsFoundPage() {
    showPage('words-found');
}

function showGamePage() {
    showPage('game');
}

function showCategoriesPage() {
    showPage('categories');
}
