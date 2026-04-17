// DOM elements
const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const pairsEl = document.getElementById('pairs');
const timeEl = document.getElementById('timeLeft');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const resetBtn = document.getElementById("resetBtn");
const bestScoreEl = document.getElementById('bestScore');
const overlay = document.getElementById('countdownOverlay');

// Game configuration
const rows = 3;
const cols = 6;
const totalPairs = 9;
const initialTime = 60;

// state
let firstCard = null;
let secondCard = null;
let busy = false;
let moves = 0;
let matchedPairs = 0;
let timeLeft = initialTime;
let timerId = null;
let pendingTimeouts = [];
let bestScore = 0;

// Load best score
function onLoad() {
    const temp = localStorage.getItem('highScoreGame');
    bestScore = temp ? parseInt(temp) : 0;
}

// Display initial values
function displayContent() {
    timeEl.textContent = timeLeft;
    bestScoreEl.textContent = bestScore;
}

onLoad();
displayContent();

// card values (9 pairs)
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];


MediaKeySession; 
// Create card UI
function createCard(value) {
    const card = document.createElement('div');
    // card.classList.add('card');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('inner');

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = value;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    // Store card value inside DOM
    card.dataset.value = value;

    return card;
}


// Card click handler
function matchFound(card) {

    if (busy) return; // prevent fast clicking
    if (card === firstCard) return; // clicking same card

    card.classList.add('flipped');

    // First card selected
    if (firstCard === null) {
        firstCard = card;
        return;
    }

    // Second card selected
    secondCard = card;

    // Count move
    moves++;
    movesEl.textContent = moves;

    // Check match
    checkMatch();
}


// Match checking logic
function checkMatch() {

    const value1 = firstCard.dataset.value;
    const value2 = secondCard.dataset.value;

    if (value1 === value2) {
        // MATCHED 🎉
        matchedPairs++;
        pairsEl.textContent = matchedPairs;

        // Reset for next pair
        firstCard = null;
        secondCard = null;

    } else {
        // NOT MATCH — flip back
        busy = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            firstCard = null;
            secondCard = null;
            busy = false;
        }, 600);
    }
}


// Card creation + shuffling
function cardMaking() {

    let deck = [...arr1, ...arr1]; // duplicates

    // Shuffle using Fisher–Yates
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    console.log("Shuffled:", deck);

    board.innerHTML = ""; // clear old cards

    deck.forEach(value => {
        const card = createCard(value);
        board.appendChild(card);
        card.addEventListener('click', () => matchFound(card));
    });        
}
cardMaking();
