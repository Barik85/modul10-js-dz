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
    SPACE.classList.add('key');
    SPACE.style.width = "350px";
    SPACE.innerHTML = " ";
    keyboard.appendChild(SPACE);
    const TYPEAREA = document.createElement('pre');
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

const countKPS = function() {
  const answerArr = lang.split('');
  const keyboard = document.querySelector('.keyboard');
  let targetHit = 0;

  const timerStart = () =>{
    timerID = setInterval(() => {
    timerOutput.innerHTML++;
    keyboard.removeEventListener('click', timerStart);
    }, 1000);}
  
  
  keyboard.addEventListener('click', timerStart);  
  const userTyping = (event) => {
    let symbol = event.target.innerHTML;
    answerArr.forEach(function (item, i, arr) {
      if (event.target.classList.contains('key') && symbol == item) {
        arr.splice(i, 1);
        targetHit ++;
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
 
  keyboard.addEventListener('click', userTyping);  
};
countKPS();
let resultBox = document.querySelector('.best-result');
resultBox.textContent = ("Лучший результат: " + localStorage.getItem("bestResult")) || " ";
const resultInput = () => {
  resultBox.textContent = 
  ("Лучший результат: " + localStorage.getItem("bestResult")) || " ";
}