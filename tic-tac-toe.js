
// You have to create a tic tac toe game


// REQUIREMENTS

// 1. SHOW A 3X3 TABLE ON THE UI
// 2. ADD THE ABILITY TO INSERT PLAYER 1 NAME AND PLAYER 2 NAME
// 3. ADD THE ABILITY TO START A GAME
// 4. ADD THE ABILITY TO MAKE A MOVEMENT AND ALTERNATE PLAYERS IN TURNS
// 5. ONCE THE GAME FINISH SHOW A MESSAGE ON THE CONSOLE WITH THE NAME OF THE WINNER OR IF IT IS A TIE

// DESIRABLE
// 6. ADD THE ABILITY TO SELECT THE TABLE DIMENSION 3X3, 4X4, 5X5, ETC

(() => {

    let isGameActive = false;
    let player1Name;
    let player2Name;
    let currentPlayer;
    let boardSize;

    const playerForm = document.getElementById('playerForm');
    const gameBoard = document.getElementById('gameBoard');
    const gameContainer = document.getElementById('gameContainer');
    const turnInfo = document.getElementById('turnInfo');
    const restartButton = document.getElementById('restartButton');

    function initializeGameBoard() {
        gameBoard.innerHTML = '';

        for (let i = 0; i < boardSize; i++) {
            const row = gameBoard.insertRow();
            for (let j = 0; j < boardSize; j++) {
                const cell = row.insertCell();
                cell.classList.add('cell');
                cell.addEventListener('click', handleCellClick, { once: true });
            }
        }
    }

    document.getElementById('playerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        player1Name = document.getElementById('player1').value.trim();
        player2Name = document.getElementById('player2').value.trim();
        boardSize = parseInt(document.getElementById('boardSize').value);

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
                document.getElementById('winnerMessage').innerText = `${currentPlayer} won`;
                isGameActive = false;
            } else if (checkTie()) {
                console.log('¡It´s a tie!');
                document.getElementById('winnerMessage').innerText = 'It´s a tie';
                isGameActive = false;
            } else {
                currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
                turnInfo.innerText = `${currentPlayer} turn (${currentPlayer === player1Name ? 'X' : 'O'})`;
            }

            if (!isGameActive) {
                restartButton.disabled = false;
            }
        }
    }

    function checkWinner() {
        const cells = document.querySelectorAll('.cell');
        const winPatterns = getWinPatterns();

        return winPatterns.some(pattern => {
            const line = pattern.map(index => cells[index].textContent);
            const firstCell = line[0];

            return firstCell !== '' && line.every(cell => cell === firstCell);
        });
    }

    function checkTie() {
        const cells = document.querySelectorAll('.cell');
        return Array.from(cells).every(cell => cell.textContent !== '');
    }

    function getWinPatterns() {
        const patterns = [];
        for (let i = 0; i < boardSize; i++) {
            patterns.push(Array.from({ length: boardSize }, (_, j) => i * boardSize + j));
            patterns.push(Array.from({ length: boardSize }, (_, j) => i + j * boardSize));
        }

        patterns.push(Array.from({ length: boardSize }, (_, i) => i * (boardSize + 1)));
        patterns.push(Array.from({ length: boardSize }, (_, i) => (i + 1) * (boardSize - 1)).reverse());

        return patterns;
    }

    restartButton.addEventListener('click', function () {
        isGameActive = true;
        initializeGameBoard();
        document.getElementById('winnerMessage').innerText = '';
        currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
        turnInfo.innerText = `${currentPlayer} turn(${currentPlayer === player1Name ? 'X' : 'O'})`;
        restartButton.disabled = true;
    });

})();