const keyboardDiv = document.querySelector('.keyboard');
const wordDisplay = document.querySelector('.word-display');

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
        console.log(clickedLetter + '  Found');
        [...curWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                wordDisplay.children[index].innerText = letter;
                wordDisplay.children[index].classList.add('guessed');
            }
        })
    } else {
        console.log(clickedLetter + '  Not Found')
    }
}

// checkLetter(curWord);
getRandomWord()


//creating Keyboard Buttons 
for (let i = 97; i < 123; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i).toUpperCase();
    button.addEventListener('click', (e) => checkLetter(e.target, String.fromCharCode(i)));
    keyboardDiv.appendChild(button);
} 