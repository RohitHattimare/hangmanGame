const hangmanImage = document.querySelector('.hangman-box img');
const keyboardDiv = document.querySelector('.keyboard');
const wordDisplay = document.querySelector('.word-display');
const display_life = document.querySelector('.life-display b');
const gameModal = document.querySelector('.game-modal');
const resetGameBtn = document.querySelector('.play-again');

let wrongGuess, curWord, currectLetters;
let max_life = 6;

//getting Random word from WordList
function getRandomWord() {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word, hint);
    curWord = word;
    document.querySelector('.hint-text b').innerText = hint;
    resetGame();
}

function gameOver(isWin) {
    setTimeout(() => {
        gameModal.classList.add('show');
        const modalText = (isWin ? 'You Found the Word:' : 'You Lost, The Word was:');
        gameModal.querySelector('img').src = (isWin ? 'images/victory.gif' : 'images/lost.gif');
        gameModal.querySelector('h4').innerText = (isWin ? 'Congratulations ' : 'Game Over!');
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${curWord}</b>`;
    }, 300);
}

function resetGame() {
    wrongGuess = 0;
    currectLetters = [];
    hangmanImage.src = `images/hangman-${wrongGuess}.svg`;
    display_life.innerText = `${wrongGuess}/${max_life}`;
    [...keyboardDiv.children].forEach(button => button.disabled = false);
    wordDisplay.innerHTML = curWord.split('').map(() => '<li class="letter" ></li>').join('');
    gameModal.classList.remove('show');
}

//Check if clicked letter is in word
function checkLetter(button, clickedLetter) {

    if (curWord.includes(clickedLetter)) {
        [...curWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                currectLetters.push(letter);
                wordDisplay.children[index].innerText = letter;
                wordDisplay.children[index].classList.add('guessed');
            }
        })
    } else {
        wrongGuess++;
        hangmanImage.src = `images/hangman-${wrongGuess}.svg`;
    }
    display_life.innerText = `${wrongGuess}/${max_life}`;
    button.disabled = true;
    if (wrongGuess === max_life) return gameOver(false);
    if (curWord.length === currectLetters.length) return gameOver(true);
}

//creating Keyboard Buttons 
for (let i = 97; i < 123; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i).toUpperCase();
    button.addEventListener('click', e => checkLetter(e.target, String.fromCharCode(i)));
    keyboardDiv.appendChild(button);
}

//Get FIrst Random Number
getRandomWord()
resetGameBtn.addEventListener('click', getRandomWord);