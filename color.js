let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll('.square');
let colorDisplay = document.querySelector('#colorDisplay');
let msgDisplay = document.querySelector('#msg');
let h1 = document.querySelector('h1');
let resetbtn = document.querySelector('#reset');
let modeBtns = document.querySelectorAll('.mode');

const changeColors = (color) => {
  //loop through all squares
  for (let i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}
const pickColor = () => {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
const randomColor = () => {
  //pick a 'red' from 0-255
  let r = Math.floor(Math.random() * 256);
  //pick a 'green' from 0-255
  let g = Math.floor(Math.random() * 256);
  //pick a 'blue' from 0-255
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
const generateRandomColors = (num) => {
  //make an array
  let arr = [];
  //repeat num times
  for (let i = 0; i < num; i++) {
    //get random color and push into array
    arr.push(randomColor());
  }
  //return that arr
  return arr;
}
const reset = () => {
  //generate all new Colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from arr
  pickedColor = pickColor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  resetbtn.textContent = 'New Colours';
  msgDisplay.textContent = '';
  //change colors of squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  h1.style.backgroundColor = "steelblue";
}
const setupModeBtns = () => {
  for (let i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener('click', function(){
      modeBtns[0].classList.remove('selected');
      modeBtns[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
}
const setupSquares = () => {
  for (let i = 0; i < squares.length; i++) {
    // adds click listeners to squares
    squares[i].addEventListener('click', function(){
      //grab color of clicked square
      let clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        msgDisplay.textContent = "Correct!";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetbtn.textContent = "Play Again?"
      } else {
        this.style.backgroundColor = '#232323';
        msgDisplay.textContent = "Try Again";
      }
    });
  }
}
const init= () => {
  //mode buttons event Listener
  setupModeBtns();
  setupSquares();
  reset();
}

init();

resetbtn.addEventListener('click', function(){
  reset();
})
