const playerOneButton = document.querySelector('.player1');
const playerTwoButton = document.querySelector('.player2');
const resetButton = document.querySelector('.reset');
const twoPlayerBtn = document.querySelector('.twoPlayer');
const vsComputerBtn = document.querySelector('.vsComputer');
const mainContainer = document.querySelector('main');
const introContainer = document.querySelector('.intro-card');

let player1 = 'Player 1';
let player2 = 'Player 2';
let gameBoard = ['','','','','','','','','',];

// Buttons to change player names
playerOneButton.addEventListener('click', () => {
    player1 = prompt(`${player1}, what is your name?`)
})
playerTwoButton.addEventListener('click', () => {
    player2 = prompt(`${player2}, what is your name?`)
})

// Button to reset game - return to front
resetButton.addEventListener('click', () => {
    clearBoard();
    // mainContainer.classList.add('display-blur');
    // introContainer.classList.remove('display-none');
})

// intro selection - 2 player
twoPlayerBtn.addEventListener('click', () => {
    mainContainer.classList.remove('display-blur');
    introContainer.classList.add('display-none');
    twoPlayer();
})

// intro selection - vs Computer
vsComputerBtn.addEventListener('click', () => {
    mainContainer.classList.remove('display-blur');
    introContainer.classList.add('display-none');
    vsComputer();
})

const cellContainer = document.querySelector('.gameboard');
const gameCell = document.querySelector('.cell')

// Function for button event listener for 2 player
let twoPlayer = () => {
    Array.from(cellContainer.children).forEach((gameCell) => {
        let cellNum = Number(gameCell.dataset.num); // grabs the dataset value and converts to number

        gameCell.addEventListener('click', () => {
            if (gameBoard[cellNum] === '') { // stops multiple clicks to overwrite previous value
                // check array empty strings is odd/even, outputs depending
                if ((gameBoard.length - gameBoard.filter(String).length) % 2 === 0 ) { 
                    gameBoard[cellNum] = 'X'; // gameBoard[cell you clicked] is now 'X' and then rune drawGameBoard() to refresh output
                    drawGameBoard(gameBoard);
                    checkWinner(gameBoard);
                } else {
                    gameBoard[cellNum] = 'O';
                    drawGameBoard(gameBoard);
                    checkWinner(gameBoard);
                }
            }
        })
    })
}

// Function for button event listener for vs Computer 
let vsComputer = () => {
    player1 = 'User';
    player2 = 'Computer';
    playerOneButton.textContent = 'Player Name';
    playerTwoButton.textContent = 'Computer Name';

    Array.from(cellContainer.children).forEach((gameCell) => {
        let cellNum = Number(gameCell.dataset.num); // grabs the dataset value and converts to number

        gameCell.addEventListener('click', () => {
            if (gameBoard[cellNum] === '') { // stops multiple clicks to overwrite previous value
                gameBoard[cellNum] = 'O';
                drawGameBoard(gameBoard);
                checkWinner(gameBoard);
                computerMove();
            }
        })
    })
}

// Function to determine computers move
let computerMove = () => {
    let num = randomNum()

    if (gameBoard[num] === '') {
        gameBoard[num] = 'X';
        drawGameBoard(gameBoard);
        checkWinner(gameBoard);
    } else {
        randomNum()
        computerMove()
    }
}

// function for random number
let randomNum = () => {
    let randomNum = Math.floor(Math.random() * 8);
    return randomNum;
}

// Function to run the array and output elements into HTML
let drawGameBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
        // loops through every child of gameboard section (9 divs) and prints anything that is on the corresponding array
        cellContainer.children[i].textContent = board[i]; 
    }
}

// Function to reset board
let clearBoard = () => {
    gameBoard = ['','','','','','','','','',];
    drawGameBoard(gameBoard); 
}

// Function to check winner using Brute Force method
let checkWinner = (board) => {

    let subText = document.querySelector('.header-text > p')

    if (gameBoard[0] === 'X' && gameBoard[1] === 'X' && gameBoard[2] === 'X' ||
        gameBoard[3] === 'X' && gameBoard[4] === 'X' && gameBoard[5] === 'X' ||
        gameBoard[6] === 'X' && gameBoard[7] === 'X' && gameBoard[8] === 'X' ||
        gameBoard[0] === 'X' && gameBoard[3] === 'X' && gameBoard[6] === 'X' ||
        gameBoard[1] === 'X' && gameBoard[4] === 'X' && gameBoard[7] === 'X' ||
        gameBoard[2] === 'X' && gameBoard[5] === 'X' && gameBoard[8] === 'X' ||
        gameBoard[0] === 'X' && gameBoard[4] === 'X' && gameBoard[8] === 'X' ||
        gameBoard[2] === 'X' && gameBoard[4] === 'X' && gameBoard[6] === 'X') {
            subText.textContent = `${player2} Wins!`;
            setTimeout(() => {
                subText.textContent = 'Make your move!'
                clearBoard(gameBoard);
            }, 3000);

        } else if (gameBoard[0] === 'O' && gameBoard[1] === 'O' && gameBoard[2] === 'O' ||
        gameBoard[3] === 'O' && gameBoard[4] === 'O' && gameBoard[5] === 'O' ||
        gameBoard[6] === 'O' && gameBoard[7] === 'O' && gameBoard[8] === 'O' ||
        gameBoard[0] === 'O' && gameBoard[3] === 'O' && gameBoard[6] === 'O' ||
        gameBoard[1] === 'O' && gameBoard[4] === 'O' && gameBoard[7] === 'O' ||
        gameBoard[2] === 'O' && gameBoard[5] === 'O' && gameBoard[8] === 'O' ||
        gameBoard[0] === 'O' && gameBoard[4] === 'O' && gameBoard[8] === 'O' ||
        gameBoard[2] === 'O' && gameBoard[4] === 'O' && gameBoard[6] === 'O') {
            subText.textContent = `${player1} Wins!`;
            setTimeout(() => {
                subText.textContent = 'Make your move!'
                clearBoard(gameBoard);
            }, 3000);

        } else if ((gameBoard.length - gameBoard.filter(String).length) === 0) {
            subText.textContent = 'Draw';
            setTimeout(() => {
                subText.textContent = 'Make your move!'
                clearBoard(gameBoard);
            }, 3000);
        }
}