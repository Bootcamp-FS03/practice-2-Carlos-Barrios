
// You have to create a tic tac toe game


// REQUIREMENTS

// 1. SHOW A 3X3 TABLE ON THE UI
// 2. ADD THE ABILITY TO INSERT PLAYER 1 NAME AND PLAYER 2 NAME
// 3. ADD THE ABILITY TO START A GAME
// 4. ADD THE ABILITY TO MAKE A MOVEMENT AND ALTERNATE PLAYERS IN TURNS
// 5. ONCE THE GAME FINISH SHOW A MESSAGE ON THE CONSOLE WITH THE NAME OF THE WINNER OR IF IT IS A TIE

// DESIRABLE
// 6. ADD THE ABILITY TO SELECT THE TABLE DIMENSION 3X3, 4X4, 5X5, ETC

let isGameActive = false;
let player1Name;
let player2Name;
let currentPlayer;

const playerForm = document.getElementById('playerForm');
const gameBoard = document.getElementById('gameBoard');
const gameContainer = document.getElementById('gameContainer');
const turnInfo = document.getElementById('turnInfo');

function initializeGameBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
}

document.getElementById('playerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    player1Name = document.getElementById('player1').value;
    player2Name = document.getElementById('player2').value;

    if (player1Name && player2Name && player1Name !== player2Name) {
        playerForm.style.display = 'none';
        gameContainer.style.display = 'block';
        isGameActive = true;
        initializeGameBoard();

        currentPlayer = Math.random() < 0.5 ? player1Name : player2Name;
        turnInfo.innerText = `${currentPlayer} turn(${currentPlayer === player1Name ? 'X' : 'O'})`;      

    } else if (!player1Name || !player2Name) {
        document.getElementById('errorMessage').innerText = 'Enter names for both players';
    } else {
        document.getElementById('errorMessage').innerText = 'Player names should be different';
    }
});

function handleCellClick(event) {
    if (isGameActive && event.target.textContent === '') {
        const selectedCell = event.target;
        selectedCell.textContent = currentPlayer === player1Name ? 'X' : 'O';

        selectedCell.classList.remove('x-cell', 'o-cell');

        selectedCell.classList.add(currentPlayer === player1Name ? 'x-cell' : 'o-cell');

        if (checkWinner()) {
            console.log(`¡${currentPlayer} won!`);
            isGameActive = false;
        } else if (checkTie()) {
            console.log('¡It´s a tie!');
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
            turnInfo.innerText = `${currentPlayer} turn (${currentPlayer === player1Name ? 'X' : 'O'})`;
        }
    }
}

function checkWinner() {
    const cells = document.querySelectorAll('.cell');
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return (
            cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent
        );
    });
}

function checkTie() {
    const cells = document.querySelectorAll('.cell');
    return Array.from(cells).every(cell => cell.textContent !== '');
}
