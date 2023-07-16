'use strict';

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new')
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let start = false;
let scores, currentScore, activePlayer;
const init = function (){
     scores = [0, 0];
     currentScore = 0;
     activePlayer = 0;
}
const switchPlayer = function (){
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
}

btnNewGame.addEventListener('click', function(){
    start = true;
    init()
    // currentScore = 0;
    // scores = [0, 0];
    score0.textContent = '0';
    score1.textContent = '0';
    current0.textContent = '0';
    current1.textContent = '0';
    dice.style.display = 'none';
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
})

btnRollDice.addEventListener('click', function (){
    if (start){
        if (scores[activePlayer] >= 100){
            return
        }
        const randomNumber = Math.trunc(Math.random() * 6) + 1;
        dice.style.display = 'block';
        dice.src = `static/dice-${randomNumber}.png`;
        if (randomNumber !== 1){
            currentScore += randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer()
        }
    }
})

btnHold.addEventListener('click', function (){
    if (start) {
        scores[activePlayer] += currentScore;
        currentScore = 0;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100){
            dice.style.display = 'none';
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        } else {
            switchPlayer()
        }
    }
})




