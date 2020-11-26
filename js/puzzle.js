(function (window) {
	'use strict';
})(window); 

document.getElementById('buttonSubmit').addEventListener('click', () => playPuzzle());

let correctAnswersCount;
function askQuestion (textBoxId, answer) {
    let userAnswer = document.getElementById(textBoxId).value;
    if (userAnswer === answer) {
        correctAnswersCount++;
    }
}
function playPuzzle() {
    correctAnswersCount = 0;
    askQuestion("userAnswer1", "Космос");
    askQuestion("userAnswer2", "Подушка");
    alert("Количество правильных ответов: " + correctAnswersCount);
}       

