//CONTAINERS
const startContainer = document.querySelector('.start-text');
const winContainer = document.querySelector('.win-container');
const loseContainer = document.querySelector('.lose-container');

const shipContainer = document.querySelector('.ship-container');
const scoreContanier = document.querySelector('.score-box');

// BUTTONS
const btnWin = document.querySelector('#win-btn');
const btnStart = document.querySelector('.btn-start');
const loseBtn = document.querySelector('#lose-btn');

//OTHER
const scoreSpan = document.querySelector('.score');

//GLOBAL VARIABLES
let healthPoint = 6;
let score = 0;
let time = 0;

let img;
//BTNS EVENTS

btnStart.addEventListener('click', function () {
  callBack();
  afterClickStart();
});

loseBtn.addEventListener('click', function (e) {
  score = 0;
  scoreSpan.textContent = `${score}`;

  healthPoint = 6;

  loseContainer.classList.add('startHidden');
  shipContainer.classList.remove('startHidden');

  document
    .querySelectorAll('.point')
    .forEach((point) => point.classList.remove('startHidden'));
});

btnWin.addEventListener('click', function (e) {
  score = 0;
  scoreSpan.textContent = `${score}`;

  healthPoint = 6;

  winContainer.classList.add('startHidden');
  shipContainer.classList.remove('startHidden');

  document
    .querySelectorAll('.point')
    .forEach((point) => point.classList.remove('startHidden'));
});
// after click start

function afterClickStart() {
  startContainer.classList.add('startHidden');
  scoreContanier.classList.remove('startHidden');
  shipContainer.classList.remove('startHidden');
}

//create ships
function creatShips() {
  let numOfTarget = randomNumber(4);

  for (let i = 0; i < numOfTarget; i++) {
    img = document.createElement('img');
    img.src = 'removed.png';

    img.id = 'ship';
    img.classList = `ship-${i + 1}`;
    shipContainer.appendChild(img);
  }
}

//after click ship
function clickShip() {
  const ships = document.querySelectorAll('#ship');

  ships.forEach((ship) => {
    ship.addEventListener('click', (e) => {
      // change ship to boom
      console.log(ship.src);
      ship.src = 'to.png';
      // add points
      score = score + 200;
      scoreSpan.textContent = `${score}`;
      afterWin();
    });
  });
}

//random position for ship
function randomPosition() {
  const ships = document.querySelectorAll('#ship');

  ships.forEach(function (ship) {
    let randomX = randomNumber(70);
    let randomY = randomNumber(70);

    ship.style.left = `${randomX}vw`;
    ship.style.top = `${randomY}vh`;
  });
}

// Create 5 healt points img
function addPoints() {
  for (let i = 0; i < 5; i++) {
    scoreContanier.insertAdjacentHTML(
      'beforebegin',
      `<img src='img/point.png' alt='' class='point' id='health${i}'>`
    );
  }
}

// after wrong click remove health point
function removePoint() {
  document.body.addEventListener('click', function (e) {
    if (e.target.id === 'ship') {
    } else if (healthPoint === 1) {
      shipContainer.classList.add('startHidden');
      loseContainer.classList.remove('startHidden');
      removeShips();
    } else {
      healthPoint--;
      const current = document.body.querySelector(`#health${healthPoint}`);

      current.classList.add('startHidden');
    }
  });
}

// remove all ship from html
function removeShips() {
  const ships = document.querySelectorAll('#ship');

  ships.forEach((ship) => {
    ship.parentNode.removeChild(ship);
  });
}

//make ships dynamic create and removed

function dynamicShips() {
  time = Math.floor(Math.random() * 1000) + 2000;

  setInterval(() => {
    creatShips();
    clickShip();
    randomPosition();
  }, time);

  setInterval(() => {
    removeShips();
  }, time + time);
}

function afterWin() {
  if (score >= 5000) {
    shipContainer.classList.add('startHidden');
    winContainer.classList.remove('startHidden');
  }
}

function callBack() {
  dynamicShips();
  addPoints();
  removePoint();
}

//random Number
const randomNumber = (num) => Math.floor(Math.random() * num) + 1;
