const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');
const streaktex = document.querySelector('#bestStreak');
const currenttex = document.querySelector('#currentStreak');

const colorBoxes = document.querySelectorAll('.color-box');
const hart = document.querySelectorAll('.hart');
console.log(colorBoxes);

const newRoundBtn = document.querySelector('#newRoundBtn');

const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');

var currentStreak = 0;
var bestStreak = 0;
var pickCorrectColor = 0;
var color = [];
var num = 6;
var streak = 0;
var streak1 = 0;


function userName() {
    var userName = prompt();
    document.querySelector(".name").textContent = userName;

}

userName();

document.querySelector(".add").addEventListener("click", userName);


function webLoad() {
    onLoad();
    setGame();
    displayContent();
}


// Whenever the website will load, it will first check the previous data stored....if there will be any stored value...it will be displayed in the highestBestStreak else it will display Zero
function onLoad() {
    var temp = localStorage.getItem('highBestStreak');
    if (temp != null) {
        bestStreak = parseInt(temp);  //Here the value will be stored in form of string...to convert it into integer parseInt is used.
    }
    else {
        bestStreak = 0;
    }
}


function displayContent() {
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;

    streaktex.textContent = `${streak}`;
    currenttex.textContent = `${streak1}`;

}


function colorGenerate() {
    var a = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var c = Math.floor(Math.random() * 256);
    return `rgb(${a}, ${b}, ${c})`;
}

function generateColor(num) {
    const arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(colorGenerate());
    }
    return arr;
}

function pickGenerator() {
    const index = Math.floor(Math.random() * num);
    console.log(index);
    return color[index];
}

function setGame() {
    color = generateColor(num);
    pickCorrectColor = pickGenerator();
    console.log(color);
    console.log(pickCorrectColor);
    colorDisplay.textContent = pickCorrectColor;
    for (var i = 0; i < color.length; i++) {
        colorBoxes[i].style.backgroundColor = color[i];
    }
}

webLoad();
var i = 2;
function winGuess(event) {
    var tempBox = event.target;
    if (pickCorrectColor == tempBox.style.backgroundColor) {
        messageDisplay.textContent = "You answered it right";
        streak++;
        streak1++;
        streaktex.textContent = `${streak}`;
        currenttex.textContent = `${streak1}`;
        if (i <= 1 && i >= -1) {
            i++;
            hart[i].style.display = "flex";
        }


        setGame();
    }
    else {
        messageDisplay.textContent = "Try Again";
        if (i <= 2 && i >= 0) {
            hart[i].style.display = "none";


            if (i == 0) {
                for (var k = 0; k < 6; k++) {
                    colorBoxes[k].style.opacity = "0.2";
                    colorBoxes[k].style.pointerEvents = "none";
                }

            }






            i--;







        }
    }
}

colorBoxes.forEach((box) => {
    box.addEventListener('click', winGuess);
})

function resetStreak() {
    bestStreak = 0;
    currentStreak = 0;
    streak1 = 0;
    // localStorage.removeItem('highBestStreak');
    messageDisplay.textContent = "Game is Reseted!";



    hart[0].style.display = "flex";
    hart[1].style.display = "flex";
    hart[2].style.display = "flex";

    i = 2;
    for (var k = 0; k < 6; k++) {
        colorBoxes[k].style.opacity = "1";
        colorBoxes[k].style.pointerEvents = "auto";
    }





    displayContent();

}

function newRound() {
    currentStreak = 0;
    streak = 0;
    streak1 = 0;
    messageDisplay.textContent = "New Round Started";
    displayContent();
    setGame();
    streak1 = 0;



    hart[0].style.display = "flex";
    hart[1].style.display = "flex";
    hart[2].style.display = "flex";
    i = 2;
    for (var k = 0; k < 6; k++) {
        colorBoxes[k].style.opacity = "1";
        colorBoxes[k].style.pointerEvents = "auto";
    }

}

resetStreakBtn.addEventListener('click', resetStreak);
newRoundBtn.addEventListener('click', newRound);



resetStreakBtn.addEventListener("click", setGame);

hardBtn.addEventListener("click", () => {

    colorBoxes[3].style.display = "none";
    colorBoxes[4].style.display = "none";
    colorBoxes[5].style.display = "none";

    hart[0].style.display = "flex";
    hart[1].style.display = "flex";
    hart[2].style.display = "flex";
    i = 2;
    for (var k = 0; k < 6; k++) {
        colorBoxes[k].style.opacity = "1";
        colorBoxes[k].style.pointerEvents = "auto";
    }



    num = 3;
    streak1 = 0;
    setGame();
})
easyBtn.addEventListener("click", () => {
    colorBoxes[3].style.display = "flex";
    colorBoxes[4].style.display = "flex";
    colorBoxes[5].style.display = "flex";
    hart[0].style.display = "flex";
    hart[1].style.display = "flex";
    hart[2].style.display = "flex";
    i = 2;
    for (var k = 0; k < 6; k++) {
        colorBoxes[k].style.opacity = "1";
        colorBoxes[k].style.pointerEvents = "auto";
    }

    num = 6;
    streak1 = 0;

    setGame();
})