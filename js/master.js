//Html Elements
const statusDiv= document.querySelector('.status');
const resetDiv= document.querySelector('.reset');
const cellDivs=document.querySelectorAll('.game-cell');
// console.log(cellDivs)
//game constants
const xSimbol='×';
const oSimbol='○'
//game variables
let gameIsLive = true;
let xIsNext = true;
let winner = null;

//functions
const letterToSymbol=(letter)=> letter ==='x'?xSimbol:oSimbol;
const handdleWin=(letter)=>{
  gameIsLive = false;
  winner = letter;
  if(winner==='x'){
    statusDiv.innerHTML = letterToSymbol(winner)+' has won!';

  }else{
    statusDiv.innerHTML = '<span>'+letterToSymbol(winner)+' has won!'+'</span>';


  }
}
const checkGameStatus = ()=>{
  const topLeft= cellDivs[0].classList[1]
  const topMiddle= cellDivs[1].classList[1]
  const topRight= cellDivs[2].classList[1]
  const middleLeft= cellDivs[3].classList[1]
  const middleMiddle= cellDivs[4].classList[1]
  const middleRight= cellDivs[5].classList[1]
  const bottomLeft= cellDivs[6].classList[1]
  const bottomMiddle= cellDivs[7].classList[1]
  const bottomRight= cellDivs[8].classList[1]
  //check winner
  //handlening horizontal wins
  if(topLeft&&topLeft===topMiddle && topLeft===topRight){
    handdleWin(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[1].classList.add('won');
    cellDivs[2].classList.add('won');
  }else if(middleLeft&&middleLeft===middleMiddle&&middleLeft===middleRight){
      handdleWin(middleLeft);
      cellDivs[3].classList.add('won');
      cellDivs[4].classList.add('won');
      cellDivs[5].classList.add('won');
  }else if(bottomLeft&&bottomLeft===bottomMiddle&&bottomLeft===bottomRight){
    handdleWin(bottomLeft);
    cellDivs[6].classList.add('won');
    cellDivs[7].classList.add('won');
    cellDivs[8].classList.add('won');


    // hanndleing diagonal wins
  }else if(topLeft && topLeft===middleMiddle && topLeft===bottomRight){
    handdleWin(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[8].classList.add('won');
  }else if(topRight&&topRight===middleMiddle&&topRight===bottomLeft){
    handdleWin(topRight);
    cellDivs[2].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[6].classList.add('won');


    // handdling horizontal wins
  }else if(topMiddle&&topMiddle===middleMiddle&&topMiddle===bottomMiddle){
    handdleWin(topMiddle);
    cellDivs[1].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[7].classList.add('won');
  }else if(topRight&& topRight===middleRight&&topRight===bottomRight){
    handdleWin(topRight);
    cellDivs[0].classList.add('won');
    cellDivs[3].classList.add('won');
    cellDivs[6].classList.add('won');
  }else if (topLeft&&topLeft===middleLeft&&topLeft===bottomLeft){
    handdleWin(topLeft)
    cellDivs[2].classList.add('won');
    cellDivs[5].classList.add('won');
    cellDivs[8].classList.add('won');
  }else if(topLeft&&topMiddle&&topRight&&middleLeft&&middleMiddle&&middleRight&&bottomLeft&&bottomMiddle&&bottomRight){
    gameIsLive=false;
    statusDiv.innerHTML='Game is Tied!'
  }else{


    if(xIsNext==='x'){
      statusDiv.innerHTML = xSimbol +" is next"
    }else{
      statusDiv.innerHTML= '<span>'+ oSimbol +' is next'+'</span>'
    }
  }
};


//event Handlers
const handleReset = (e) =>{
  xIsNext=true;
  winner = null;
  gameIsLive = true;
  statusDiv.innerHTML =xSimbol+ "is next";
  for(const cellDiv of cellDivs){
    cellDiv.classList.remove('x');
    cellDiv.classList.remove('o');
    cellDiv.classList.remove('won');

  }
}

const handleCellClick = (e) =>{
  const classList = e.target.classList;

  // console.log("location",location);/* this gives you the location,"top-left or top-middle etc"*/

  if(!gameIsLive||classList[1]==='x'|| classList[1]==='o' /*this is to make sure not to add x and o in one class */){
    return;
  }
  if(xIsNext/*is same statement as xIsNext===true*/){
    xIsNext=!xIsNext;/*this sets xIsNext to false*/
    classList.add('x');/*this add a class called x*/
    checkGameStatus();
  }else{
    xIsNext=!xIsNext;/*this sets xIsNext to false*/
    classList.add('o');
    checkGameStatus();
  }
}

//event listeners
resetDiv.addEventListener('click',handleReset);



for(const cellDiv of cellDivs){
  cellDiv.addEventListener('click',handleCellClick)
}
