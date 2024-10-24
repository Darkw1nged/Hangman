var notificationQueue = [];
var closingQueue = [];
var globalDelay = 3000; // Set the global delay in milliseconds (adjust as needed)
var isClosingNotification = false;

function showNotification(word) {
    var notificationContainer = document.querySelector('.notifications');

    if (notificationQueue.length >= 9) {
        removeOldestNotification();
    }

    var notification = document.createElement('div');
    notification.classList.add('notification');
    notification.style.animationDelay = (notificationQueue.length * 0.1) + 's';

    notification.innerHTML = `
        <div class="type-name">
            <h2>NEW WORD</h2>
        </div>
        <div class="value">
            <p>${word}</p>
        </div>
    `;

    notificationContainer.appendChild(notification);
    notificationQueue.push(notification);

    if (!isClosingNotification) {
        processNextNotification();
    }
}

function removeOldestNotification() {
    var oldestNotification = notificationQueue[0];
    enqueueCloseNotification(oldestNotification);
}

function enqueueCloseNotification(notification) {
    var index = notificationQueue.indexOf(notification);
    if (index !== -1) {
        notificationQueue.splice(index, 1);
    }
    closingQueue.push(notification);

    if (!isClosingNotification) {
        processNextNotification();
    }
}


function processNextNotification() {
    if (notificationQueue.length > 0) {
        var nextNotification = notificationQueue.shift();
        var animationDuration = parseFloat(getComputedStyle(nextNotification).animationDuration);
        var delay = (animationDuration * 1000) + globalDelay + 100;

        setTimeout(function () {
            closeNotification(nextNotification);
        }, delay);
    } else if (closingQueue.length > 0) {
        var nextNotification = closingQueue.shift();
        closeNotification(nextNotification);
    }
}

function closeNotification(notification) {
    isClosingNotification = true;

    var index = closingQueue.indexOf(notification);
    if (index !== -1) {
        closingQueue.splice(index, 1);
    }

    var animationDuration = parseFloat(getComputedStyle(notification).animationDuration);
    notification.style.animationName = 'slideOut';

    setTimeout(function () {
        notification.remove();
        isClosingNotification = false;
        processNextNotification();
    }, animationDuration * 1000);
}