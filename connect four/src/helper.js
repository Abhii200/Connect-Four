

export const isWinner = (gameBoard,currentPlayer,currentMove) => {
    let board = [...gameBoard];
    board[currentMove] = currentPlayer;
    const winlines = [
        [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], // Updated to contain four elements each
        [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], // Updated to contain four elements each
        [3, 7, 11, 15], [0, 5, 10, 15], [3, 6, 9, 12] // Updated to contain four elements each
    ];
    
    // Your logic for checking winning lines goes here
    for(let i = 0; i < winlines.length; i++) {
        const [a, b, c, d] = winlines[i];
        if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c] && gameBoard[a] === gameBoard[d]) {
            return gameBoard[a];
        }
    }
    return null;

}

export const isDraw = (gameBoard) => {
    return gameBoard.every(circle => circle !== 0);
}


export const getComputerMoves = (gameBoard, currentPlayer) => {
    const PLAYER_1 = 1;
    const PLAYER_2 = 2;
    
    // Check for winning moves
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === 0) {
            let tempBoard = [...gameBoard];
            tempBoard[i] = currentPlayer;
            if (isWinner(tempBoard, currentPlayer, i)) {
                return i; // Return the winning move
            }
        }
    }

    // Check for opponent's winning moves and block them
    const opponent = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === 0) {
            let tempBoard = [...gameBoard];
            tempBoard[i] = opponent;
            if (isWinner(tempBoard, opponent, i)) {
                return i; // Block the opponent's winning move
            }
        }
    }

    // If no winning or blocking moves are found, suggest a random move
    let emptyCells = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === 0) {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    } else {
        return -1; // If no empty cells are available, return -1 (indicating no move)
    }
};




