
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

const playerForm = document.getElementById('playerForm');
const gameBoard = document.getElementById('gameBoard');

function initializeGameBoard() {
    // console.log(isGameActive);
    for (let i = 0; i < 3; i++) {
        const row = gameBoard.insertRow();
        for (let j = 0; j < 3; j++) {
            const cell = row.insertCell();
            cell.textContent = '';
        }
    }
}

document.getElementById('playerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

    if (player1Name && player2Name && player1Name !== player2Name) {
        playerForm.style.display = 'none';
        gameBoard.innerHTML = '';
        isGameActive = true;
        initializeGameBoard();

        const startingPlayer = Math.random() < 0.5 ? player1Name : player2Name;

        gameBoard.style.display = 'table';
    } else if (!player1Name || !player2Name) {
        document.getElementById('errorMessage').innerText = 'Enter names for both players';
    } else {
        document.getElementById('errorMessage').innerText = 'Player names should be different';
    }
});