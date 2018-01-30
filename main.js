/*
  Создать компонент счетчика времени.
  
  Простой прямоугольник который показывает время
  со старта упражения и до того момента когда все
  клавиши были верно нажаты.
  
  На входе есть строка символов для упражнения.
  
  Написать метод countKPS() который,по окончанию упражнения,
  возвращает кол-во верных клавишь в секунду которое было нажато за
  время выполнения упражнения.
  
  Записать результат в localStorage, но только в том случае если
  он лучше чем тот что уже есть в localStorage.
  
  При повторном посещении страницы надо брать то что записано
  в localStorage и вешать на страницу, это будет компонент
  лучшего результата.
*/

// дается строка и от первого нажатия до посленего
// правильного набранного знака считать время
const lang = "qwerty";
const string = "qryte";
const charsArr = string.split("").reverse();
const timerOutput = document.querySelector(".timer");

const keyboard = {
  topRow: "qwertyuiop[]\\",
  midlleRow: "asdfghjkl;'",
  bottomRow: "zxcvbnm,./",
  creatKeys: function (row, placement) {
    let key;
    for (keyNumber = 0; keyNumber < row.length; keyNumber++) {
      key = document.createElement('div');
      key.textContent = row[keyNumber];
      key.classList.add('key');
      placement.appendChild(key);
    }
  },
  creatLayout: function (keyboardBox) {
    let keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    keyboardBox.appendChild(keyboard);
    for (let i = 0; i < 3; i++) {
      let = keyboard.innerHTML += '<div class="row"></div>';
    }
    const ROWS = document.querySelectorAll('.row');
    this.creatKeys(this.topRow, ROWS[0]);
    this.creatKeys(this.midlleRow, ROWS[1]);
    this.creatKeys(this.bottomRow, ROWS[2]);
    const SPACE = document.createElement('div');
    SPACE.classList.add('key', 'space');
    SPACE.style.width = "350px";
    SPACE.innerHTML = " ";
    keyboard.appendChild(SPACE);
    const TYPEAREA = document.createElement('div');
    TYPEAREA.classList.add('type-area');
    keyboard.before(TYPEAREA);

    const typing = (event) => {
      let symbol = event.target.innerHTML;
      if (event.target.classList.contains('key')) {
        TYPEAREA.textContent += symbol;
      }
    };
    keyboard.addEventListener('click', typing);
  }
}

const exercise = document.querySelector('.exercise');
exercise.textContent = `наберите на клавиатуре символы "${lang}"`;

const keyboardBox = document.querySelector('.keyboard-box');
keyboard.creatLayout(keyboardBox);

const timerStart = () =>{
  document.body.removeEventListener('click', timerStart);
  window.removeEventListener('keydown', timerStart);
  timerID = setInterval(() => {
  timerOutput.innerHTML++;
  }, 1000);}

const answerArr = lang.split('');
let targetHit = 0;

document.body.addEventListener('click', timerStart); 

let resultBox = document.querySelector('.best-result');
resultBox.textContent = ("Лучший результат: " + localStorage.getItem("bestResult")) || " ";
const resultInput = () => {
  resultBox.textContent = 
  ("Лучший результат: " + localStorage.getItem("bestResult")) || " ";
}

const countKPS = (event) => {
  let symbol = event.target.innerHTML;
  answerArr.forEach(function (item, i, arr) {
    if (event.target.classList.contains('key') && symbol == item) {
      arr.splice(i, 1);
      targetHit++;
      console.log(arr.length);
    }
  });
  if (answerArr.length < 1) {
    clearInterval(timerID);
    console.log('все символы совпали');
    targetHit = targetHit / timerOutput.innerHTML;
    if (localStorage.getItem("bestResult") < targetHit) {
      localStorage.setItem("bestResult", targetHit);
      resultInput();
    }
  }
};
document.body.addEventListener('click', countKPS);  

//PC keyboard
const buttonPress = (event) => {
  let key;
  let buttons = document.querySelectorAll('.key');
  switch (event.code) {
      case "Space":
          key = "space";
          break;
      case "BracketLeft":
          key = "[";
          break;
      case "BracketRight":
          key = "]";
          break;
      case "Semicolon":
          key = ";";
          break;
      case "Quote":
          key = "'";
          break;
      case "Comma":
          key = ",";
          break;
      case "Period":
          key = ".";
          break;
      case "Slash":
          key = "/";
          break;
      default:
          key = event.code.slice(-1).toString().toLowerCase();
  }
  // console.log(key);
  // console.log(event);
  // console.log(event.keyCode);
  
  TYPEAREA = document.querySelector('.type-area');
  const space = document.querySelector('.space');
  
  if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode == 219 ||
      event.keyCode == 221 || event.keyCode == 186 || event.keyCode == 222 ||
      event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 191 ||
      event.keyCode == 32 ) {
      buttons.forEach(function (item, i, arr) {
          if (item.innerHTML == key) {
              flashing(item);
              TYPEAREA.innerHTML += key;
          }
          if (key == 'space') {
            flashing(space);
            TYPEAREA.textContent += " ";          
          }
      });
      answerArr.forEach(function (item, i, arr) {
        if (key == item) {
          arr.splice(i, 1);
          targetHit++;
          console.log(arr.length);
        }
      });    
      if (answerArr.length < 1) {
        clearInterval(timerID);
        console.log('все символы совпали');
        targetHit = targetHit / timerOutput.innerHTML;
        if (localStorage.getItem("bestResult") < targetHit) {
          localStorage.setItem("bestResult", targetHit);
          resultInput();
        }
      }
  }
}

let flashing = function (element) {
  element.classList.add('key-active');
  setTimeout(() => { element.classList.remove('key-active') }, 500);
}

const countKPSforPC = (event) => {
  let symbol = event.target.innerHTML;
  answerArr.forEach(function (item, i, arr) {
    if (event.target.classList.contains('key') && symbol == item) {
      arr.splice(i, 1);
      targetHit++;
      console.log(arr.length);
    }
  });
  if (answerArr.length < 1) {
    clearInterval(timerID);
    console.log('все символы совпали');
    targetHit = targetHit / timerOutput.innerHTML;
    if (localStorage.getItem("bestResult") < targetHit) {
      localStorage.setItem("bestResult", targetHit);
      resultInput();
    }
  }
};

window.addEventListener('keydown', buttonPress);
window.addEventListener('keydown', timerStart);


