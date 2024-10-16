document.addEventListener('DOMContentLoaded', () => {
    const keyboard = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
    ];

    const keyboardContainer = document.querySelector('.keyboard');

    // Add the buttons to the keyboard
    keyboard.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.classList.add('key');

            const button = document.createElement('button');
            button.textContent = key;

            // Special case for Backspace key (with icon)
            if (key === 'Backspace') {
                const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgIcon.setAttribute('clip-rule', 'evenodd');
                svgIcon.setAttribute('fill-rule', 'evenodd');
                svgIcon.setAttribute('stroke-linejoin', 'round');
                svgIcon.setAttribute('stroke-miterlimit', '2');
                svgIcon.setAttribute('viewBox', '0 0 24 24');
                svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                svgIcon.innerHTML = `<path d="m22 6c0-.552-.448-1-1-1h-12.628c-.437 0-.853.191-1.138.523-1.078 1.256-3.811 4.439-4.993 5.815-.16.187-.241.419-.241.651 0 .231.08.463.24.651 1.181 1.38 3.915 4.575 4.994 5.835.285.333.701.525 1.14.525h12.626c.552 0 1-.448 1-1 0-2.577 0-9.423 0-12zm-13.628.5h12.128v11h-12.126l-4.715-5.51zm5.637 4.427 1.71-1.71c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.384-.219.531l-1.711 1.711 1.728 1.728c.147.147.22.339.22.53 0 .427-.349.751-.75.751-.192 0-.384-.073-.531-.219l-1.728-1.729-1.728 1.729c-.146.146-.339.219-.531.219-.401 0-.75-.324-.75-.751 0-.191.073-.383.22-.53l1.728-1.728-1.788-1.787c-.146-.148-.219-.339-.219-.532 0-.425.346-.749.751-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/>`;
                
                button.classList.add('backspace');
                button.innerHTML = '';
                button.appendChild(svgIcon);
            }

            if (key === 'Enter') {
                button.classList.add('enter');
            }

            keyDiv.appendChild(button);
            rowDiv.appendChild(keyDiv);

            // Add click event listener for each button
            button.addEventListener('click', () => handleKeyClick(key));
        });

        keyboardContainer.appendChild(rowDiv);
    });

    // Handle keyboard button clicks
    function handleKeyClick(key) {
        if (key === 'Enter') {
            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            document.dispatchEvent(event);
        } else if (key === 'Backspace') {
            const event = new KeyboardEvent('keydown', { key: 'Backspace' });
            document.dispatchEvent(event);
        } else {
            const event = new KeyboardEvent('keydown', { key: key });
            document.dispatchEvent(event);
        }
    }
});
