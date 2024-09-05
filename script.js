const cards = [
    'A', 
    'A', 
    'B',
    'B',
    'C',
    'C',
    'D',
    'D',
    'E',
    'E',
    'F',
    'F',
    'G',
    'G',
    'H',
    'H'
];

let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let attempts = 0;
let lockBoard = false;

const gameBoard = document.getElementById('game-board');
const attemptsDisplay = document.getElementById('attempts');
const restartButton = document.getElementById('restart-button');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    shuffledCards = cards.slice();
    gameBoard.innerHTML = '';
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    lockBoard = false;

    shuffledCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        // Create front face (shows the image or letter)
        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'front');
        
        // Create back face (hidden initially)
        const backFace = document.createElement('div');
        backFace.classList.add('card-face', 'back');
        backFace.textContent = card; // Show the letter or image URL on the back face

        // Append both faces to the card
        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        cardElement.setAttribute('data-card', card);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    attempts++;
    attemptsDisplay.textContent = attempts;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartButton.addEventListener('click', createBoard);
createBoard();
