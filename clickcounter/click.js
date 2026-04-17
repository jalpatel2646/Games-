var currentScore = document.querySelector('#currentScore')
var highScore = document.querySelector('#highScore');
var timer = document.querySelector('#timer');
var clickButton = document.querySelector('#clickButton');
var startButton = document.querySelector('#startButton');
var statusMessage = document.querySelector('#statusMessage');
var resetButton = document.querySelector('#resetButton');
var pauseButton = document.querySelector('#pauseButton');
var resumeButton = document.querySelector('#resumeButton');
var video = document.querySelector(".video");

var current = 0;
var high = 0;
var timer1 = 10;
var flag = false;
var timeId = null;
var cond = 1;
var k = 11;

function onWebsite() {
    loadData();
    displayContent();
}

function loadData() {
    var temp = localStorage.getItem('highScore');
    if (temp != null) {
        high = temp;
    }
    else {
        high = 0;
    }
}
function displayContent() {
    currentScore.textContent = current;
    highScore.textContent = high;
    timer.textContent = timer1;
}
function statusMsg(msg) {
    statusMessage.textContent = msg;
}
function endGame() {

    // 4. Show Clicks Per Second (CPS)
    document.querySelector(".persec").textContent = `Clicks Per Second is ${current / 10}`;


    clearInterval(timeId);
    resumeButton.disabled = false;
    pauseButton.disabled = false;
    startButton.disabled = false;
    resumeButton.style.backgroundColor = "blue"
    pauseButton.style.backgroundColor = "darkorange";
    flag = false;
    clickButton.disabled = true;
    startButton.disabled = false;
    startButton.style.backgroundColor = "purple";
    clickButton.style.backgroundColor = 'lightgrey';

    if (current > high) {
        localStorage.setItem('highScore', current);
        high = current;
        highScore.textContent = current;
        statusMsg("Your scored more than the previous HighScore");
        video.style.display = "flex";





        // 6. Confetti on New High Score

        document.body.style.background = 'gold'
        var backcolor = setInterval(() => {
            document.body.style.background = 'blue'

        },
            1000
        )




    }
    else {
        statusMsg(`you're current is ${current}`);
    }
    current = 0;
    timer1 = 10;
    clickButton.style.transform = 'scale(1)';


    startButton.innerText = "Play Again";
    currentScore.style.color = "white";













    displayContent();
}

function startGame() {
    clickButton.disabled = false;
    clickButton.style.backgroundColor = 'green'
    clickButton.style.cursor = 'pointer';
    flag = true;
    startButton.disabled = true;
    startButton.style.backgroundColor = "gray";
    currentScore.style.color = "white";




    // 2. "Click Me!" Message Flashes on Start
    if (cond == 1) {
        var id2 = setInterval(
            () => {
                statusMsg("The game is started!!");
            },
            1000

        )

        statusMsg("Click Me!");
    }
    else {
        statusMsg("resume");

    }
    timeId = setInterval(function () {
        timer1--;
        if (timer1 <= 0) {
            endGame();
            startButton.style.display = "block";
        }
        displayContent();
    }, 1000);
    k = 11;






}
pauseButton.addEventListener("click", () => {
    flag = false;
    clickButton.disabled = true;
    clickButton.style.backgroundColor = "gray";
    clearInterval(timeId);
    statusMsg("pause");
    pauseButton.style.backgroundColor = "gray";
    resumeButton.style.backgroundColor = "blue"
    resumeButton.disabled = false;
    pauseButton.disabled = true;






});

resumeButton.addEventListener('click', () => {
    cond = 2;
    startGame();
    resumeButton.disabled = true;
    pauseButton.disabled = false;

    pauseButton.style.backgroundColor = "blue";
    resumeButton.style.backgroundColor = "gray";

});

function updateDisplay() {
    currentScore.style.color = "red";
}
function handleClick() {
    clickButton.style.transform = `scale(1.${k})`;
}

function userClick() {
    if (flag) {

        current++;
        k++;





        // 3. Button Grows When You Click
        handleClick();

        // 1. Click Counter Turns Red When > 20

        if (current > 20) {
            updateDisplay();
        }


        // 4. Show Clicks Per Second (CPS)
        document.querySelector(".persec").textContent = `Clicks Per Second is ${current / 10}`;






        displayContent();
    }
}

onWebsite();

startButton.addEventListener('click', startGame);
clickButton.addEventListener('click', userClick);


resetButton.addEventListener("click", () => {
    high = 0;
    current = 0;

    endGame();

    currentScore.style.color = "white";
    statusMsg("reset and your high score is 0");




    // 5. Start Button Says "Play Again" After Game
    startButton.innerText = "Start Game";

})
