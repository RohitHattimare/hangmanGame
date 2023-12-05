const keyboardDiv = document.querySelector('.keyboard');
const wordDisplay = document.querySelector('.word-display');

//getting Random word from WordList
function getRandomWord() {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word, hint);
    document.querySelector('.hint-text b').innerText = hint;
    wordDisplay.innerHTML = word.split('').map((letter) => '<li class="letter" ></li>').join('');
}

getRandomWord()


//creating Keyboard Buttons 
for (let i = 97; i < 123; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i).toUpperCase();
    button.addEventListener('click', () => {
        console.log(String.fromCharCode(i));
    });
    keyboardDiv.appendChild(button);
} 