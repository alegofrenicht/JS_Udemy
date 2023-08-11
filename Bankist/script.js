'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
      "2019-11-18T21:31:17.178Z",
      "2019-12-23T07:42:02.383Z",
      "2020-01-28T09:15:04.904Z",
      "2020-04-01T10:17:24.185Z",
      "2020-05-08T14:11:59.604Z",
      "2023-08-05T17:01:17.194Z",
      "2023-07-28T23:36:17.929Z",
      "2023-08-10T10:51:36.790Z",
  ],
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2020-04-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z",
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const formatDate = function (date) {
  const dayCount = (date1, date2) => Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  const movDate = dayCount(new Date(), date);
  if (movDate < 1){
    return `today`;
  } else if (movDate < 2 ) {
    return  'yesterday';
  } else {
    if (movDate > 7){
      return new Intl.DateTimeFormat('il').format(date)
    } else {
      return `${movDate} days ago`}
  }
}
let sort;
let currentAccount = {};
let timer;
const currencySignFormat = num => new Intl.NumberFormat('nor', {style: 'currency', currency: 'EUR'}).format(num);
const displayMovements = function (acc, sort = false){
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  containerMovements.innerHTML = ''
  movs.forEach(function (mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div >
          <div class="movements__date">${formatDate(new Date(acc.movementsDates[i]))}</div>
          <div class="movements__value">${currencySignFormat(mov)}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  }
  )
}

accounts.map(account => account.username = account.owner.toLowerCase().split(' ').map(name => name[0]).join(''));
const updateUI = function (acc){
  calcDisplaySummary(acc);
  displayMovements(acc);
  calcDisplayBalance(acc);
  const now = new Date();
  // labelDate.textContent = `${`${now.getDate()}`.padStart(2, 0)}/${`${now.getMonth()}`.padStart(2, 0)}/${now.getFullYear()}, ${now.getHours()}:${`${now.getMinutes()}`.padStart(2, 0)}`;

  labelDate.textContent = new Intl.DateTimeFormat('il').format(now);
}

const startTimer = function (){
  const tick = function(){
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String((time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0){
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = '0';
    }
    time--;
  };
  let time = 300;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

const calcDisplaySummary = function (acc){
  const depositMovements = acc.movements.filter(mov => mov > 0).reduce((sum, mov) => sum + mov);
  const withdrawalMovements = acc.movements.filter(mov => mov < 0).reduce((sum, mov) => sum + mov);
  const interest = acc.movements.filter(mov => mov > 0).map(mov => (mov * acc.interestRate) / 100).filter(int => int >= 1).reduce((sum, mov) => sum + mov)
  labelSumIn.textContent = currencySignFormat(depositMovements);
  labelSumOut.textContent = currencySignFormat(withdrawalMovements);
  labelSumInterest.textContent = currencySignFormat(interest);
}

const calcDisplayBalance = function (acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = currencySignFormat(acc.balance);

}

btnLogin.addEventListener('click', function (e){
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)){
    inputLoginPin.blur();
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
    updateUI(currentAccount);
    containerApp.style.opacity = '1';
    if (timer) clearInterval(timer);
    timer = startTimer();
  } else {
    alert('Wrong PIN or Username');
  }
  inputLoginUsername.value = inputLoginPin.value = '';
});

btnTransfer.addEventListener('click', function (e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
  if (amount > 0 && receiverAcc && amount <= currentAccount.balance && receiverAcc?.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date());
    currentAccount.movementsDates.push(new Date());
    updateUI(currentAccount);
    clearInterval(timer);
    timer = startTimer();
  }
});

btnClose.addEventListener('click', function (e){
  e.preventDefault();
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    accounts.splice(index, 1);
    containerApp.style.opacity = '0';
    labelWelcome.textContent = 'Account was deleted';
  }
  inputCloseUsername.value = inputClosePin.value = '';
})

btnLoan.addEventListener('click', function (e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date());
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
  clearInterval(timer);
  timer = startTimer();
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
