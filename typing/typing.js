// DOM Elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerDisplay = document.querySelector('#timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWPMDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');

const testTexts = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster.",
    "Technology has revolutionized the way we communicate and work in the modern digital era.",
    "Typing speed is an essential skill for anyone working with computers in today's workplace."
];

// textDisplay.style.pointerEvents = "none";


let currentText = '';
let timeLeft = 60;
let timerInterval = null;
let startTime = null;
let isTestActive = false;
let bestWPM = 0;

function webLoad() {
    onLoad();
    displayContent();
}

function onLoad() {
    const temp = sessionStorage.getItem('previousWpm');
    if (temp != null) {
        bestWPM = parseInt(temp);
    } else {
        bestWPM = 0;
    }
}

function displayContent() {
    timerDisplay.textContent = timeLeft;
    bestWPMDisplay.textContent = bestWPM;
}

webLoad();

function endGame() {
    clearInterval(timerInterval);
    isTestActive = false;
    typingArea.disabled = true;
    startBtn.disabled = false;
    typingArea.disabled = true;

    const typedText = typingArea.value.trim();
    const mainText = currentText.trim();

    // Save best WPM
    const currentWPM = parseInt(wpmDisplay.textContent) || 0;
    if (currentWPM > bestWPM) {
        bestWPM = currentWPM;
        sessionStorage.setItem('previousWpm', bestWPM);
    }

    let message = "";
    if (typedText.toLowerCase() === mainText.toLowerCase()) {
        message = "✅ Both texts are exactly the same!";
    } else {
        // Compare word similarity
        const mainWords = mainText.split(/\s+/);
        const typedWords = typedText.split(/\s+/);
        const commonWords = mainWords.filter(word => typedWords.includes(word));
        message = `Texts are different.${commonWords.length} out of ${mainWords.length} words match.`;
    }

    let messageDisplay = document.querySelector('#resultMessage');
    if (!messageDisplay) {
        messageDisplay = document.createElement('div');
        messageDisplay.id = 'resultMessage';
        messageDisplay.style.marginTop = '10px';
        messageDisplay.style.fontWeight = 'bold';
        typingArea.parentNode.appendChild(messageDisplay);
    }
    messageDisplay.textContent = message;

    timeLeft = 60;
    displayContent();
}

document.querySelector("#ten").addEventListener("click", () => {
    timeLeft = 10;
    displayContent();

})
document.querySelector("#ten2").addEventListener("click", () => {
    timeLeft = 20;
    displayContent();

})
document.querySelector("#ten3").addEventListener("click", () => {
    timeLeft = 30;
    displayContent();

})
document.querySelector("#ten4").addEventListener("click", () => {
    timeLeft = 40;
    displayContent();

})
document.querySelector("#ten5").addEventListener("click", () => {
    timeLeft = 50;
    displayContent();

})
document.querySelector("#ten6").addEventListener("click", () => {
    timeLeft = 60;
    displayContent();

})

function startGame() {
    startBtn.disabled = true;
    isTestActive = true;
    startTime = null;



    currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
    textDisplay.textContent = currentText;
    typingArea.disabled = false;
    typingArea.value = "";
    typingArea.focus();
    typingArea.setAttribute('placeholder', 'Start typing here...');

    timerInterval = setInterval(() => {
        timeLeft--;
        displayContent();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function updateStatus() {
    const typed = typingArea.value;
    const elapsedTime = (Date.now() - startTime) / 1000 / 60; // minutes

    const words = typed.trim().split(/\s+/).filter(w => w.length > 0);
    const wpm = elapsedTime > 0 ? Math.floor(words.length / elapsedTime) : 0;
    wpmDisplay.textContent = wpm;

    let currentScore = 0;
    for (let i = 0; i < typed.length; i++) {
        if (currentText[i] === typed[i]) {
            currentScore++;
        }
    }

    const accuracy = typed.length > 0 ? Math.floor((currentScore / typed.length) * 100) : 0;
    accuracyDisplay.textContent = accuracy;
}

var currentText1;
function textchange() {
    currentText1 = testTexts[Math.floor(Math.random() * testTexts.length)];
    currentText = currentText + currentText1;
    textDisplay.textContent = currentText;
}


function Highlights() {
    const typed = typingArea.value;
    let highlightText = "";

    for (let i = 0; i < currentText.length; i++) {
        if (i < typed.length) {
            if (currentText[i] === typed[i]) {
                highlightText += `<span class="correct">${currentText[i]}</span>`;
                if (currentText === typed) {
                    textchange();

                }
            } else {
                highlightText += `<span class="incorrect">${currentText[i]}</span>`;
            }
        } else {
            highlightText += currentText[i];
        }
    }

    textDisplay.innerHTML = highlightText;
}

function wordType() {
    if (!isTestActive) return;

    if (startTime == null) {
        startTime = Date.now();
    }

    updateStatus();
    Highlights();
}

startBtn.addEventListener('click', startGame);
typingArea.addEventListener('input', wordType);
resetBtn.addEventListener('click', endGame);