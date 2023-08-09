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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
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

const accounts = [account1, account2, account3, account4];

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


let sort;
const displayMovements = function (movements, sort = false){

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = ''
  movs.forEach(function (mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<!--          <div class="movements__date">3 days ago</div>-->
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  }
  )
}

accounts.map(account => account.username = account.owner.toLowerCase().split(' ').map(name => name[0]).join(''));
const updateUI = function (acc){
  calcDisplaySummary(acc);
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
}

const calcDisplaySummary = function (acc){
  const depositMovements = acc.movements.filter(mov => mov > 0).reduce((sum, mov) => sum + mov);
  const withdrawalMovements = acc.movements.filter(mov => mov < 0).reduce((sum, mov) => sum + mov);
  const interest = acc.movements.filter(mov => mov > 0).map(mov => (mov * acc.interestRate) / 100).filter(int => int >= 1).reduce((sum, mov) => sum + mov)
  labelSumIn.textContent = `${depositMovements}€`;
  labelSumOut.textContent = `${withdrawalMovements}€`;
  labelSumInterest.textContent = `${interest}€`;
}

const calcDisplayBalance = function (acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${acc.balance}€`;

}

let currentAccount = {};

btnLogin.addEventListener('click', function (e){
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)){
    inputLoginPin.blur();
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
    updateUI(currentAccount);
    containerApp.style.opacity = '1';
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
    updateUI(currentAccount);
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
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sort);
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