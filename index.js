const X_CLASS = 'x';
const CIRCLE_CLASS ='circle'
// now we dont need to duplicate them everywhere
const board = document.getElementById('board')
const WINNING_COMBINATION = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
//these are all possible combination for winning tic tac toe game
]
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageTextElement = document.querySelector('[data-winning-msg-text]')
const restartButton = document.getElementById('restartButton')
const winningMessageElement = document.getElementById('winningMessage')
let circleTurn

startGame()
restartButton.addEventListener('click' ,startGame)

function startGame(){
    circleTurn=false
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click' ,handleClick)
        cell.addEventListener('click',handleClick, {once:true})
        // once:True prevents overwiting something , once clicked on sme box , not gonaa showagain and again on the same box not until we click other box
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
   const cell = e.target
   const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
   placeMark(cell,currentClass)

   if(checkWin(currentClass)){
endGame(false)

   }else if (isDraw()){
    endGame(true)
   }
   swapTurns()
   setBoardHoverClass()
}

// what we need to do is :
// place x or circle mark 
// check for win ;
// check for draw ;
// switch turns ; ---most important thing
function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    }
    else{
        winningMessageTextElement.innerText = ` ${circleTurn ? "O's" : "X's"} Win:)`
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    circleTurn =!circleTurn
}

function isDraw(){
    //since cell elements do not have an every function we can destructure them into an array
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

// we must do this after we swap turns so that we know that which current player is or whsoe turn it is not whose turn it used to be

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}
function checkWin(currentClass){
    return WINNING_COMBINATION.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        //this says that if the current class in all three of the elements inside of the combination then we are a winner ;
       
    })
    })
    //this will return true if any of the combinations are true;
}