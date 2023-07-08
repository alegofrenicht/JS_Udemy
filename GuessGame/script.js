'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message
};
const displayNumber = function (number) {
  document.querySelector('.number').textContent = number
}
document.querySelector('.check').addEventListener('click', function(){
  const guess = Number(document.querySelector('.guess').value);
  if (score > 0){
      if (!guess || guess > 20 ){
        displayMessage('Incorrect input');
      } else if (guess === secretNumber){
        displayMessage('Correct number!!!');
        displayNumber(guess);
        document.querySelector('body').style.background = 'green';
        if (highscore < score) {
          highscore = score;
          document.querySelector('.highscore').textContent = highscore
        }
      }
      else if (guess !== secretNumber){
        displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        displayMessage('Incorrect number');
      }
  } else {
    displayMessage('GAME OVER...');
    displayNumber(secretNumber);
    document.querySelector('body').style.background = 'red';

  }
})
document.querySelector('.again').addEventListener('click', function(){
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayNumber('?');
  displayMessage('Start guessing...');
  document.querySelector('body').style.background = 'black';
  score = 20;
  document.querySelector('.score').textContent = '20';
  document.querySelector('.guess').value = '';
})
