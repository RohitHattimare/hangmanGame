const hangmanImage = document.querySelector('.hangman-box img');
const keyboardDiv = document.querySelector('.keyboard');
const wordDisplay = document.querySelector('.word-display');
const life_display = document.querySelector('.life-display b');
let life = 0;
let max_life = 6;
let curWord = '';
//getting Random word from WordList
function getRandomWord() {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word, hint);
    curWord = word;
    document.querySelector('.hint-text b').innerText = hint;
    wordDisplay.innerHTML = word.split('').map((letter) => '<li class="letter" ></li>').join('');
}

//Check if clicked letter is in word
function checkLetter(button, clickedLetter) {

    if (curWord.includes(clickedLetter)) {
        //Show all the currect letter in the Display Word
        [...curWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                wordDisplay.children[index].innerText = letter;
                wordDisplay.children[index].classList.add('guessed');
            }
        })
    } else {
        //When Wronng Letter is clicked decrease life and update heart display     ;
        life++;
        hangmanImage.src = `images/hangman-${life}.svg`;
    }
    life_display.innerText = `${life}/${max_life}`;
    //Disable the keyboard key if pressed 
    button.disabled = true;
    //Check if all the letter is guessed
    if (life >= 6) {
        console.log("Game Lost !!!!!");
    }
    if (wordDisplay.innerText === curWord) {
        console.log("Game Won !!!!!");
    }
}

getRandomWord()

//creating Keyboard Buttons 
for (let i = 97; i < 123; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i).toUpperCase();
    button.addEventListener('click', e => checkLetter(e.target, String.fromCharCode(i)));
    keyboardDiv.appendChild(button);
} 