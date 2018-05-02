// ---------- A tictactoe gaming library! ------------

/*
A game is an object with...
- state: a string describing the current state:
  - 'plr1': It is player 1's turn to play
  - 'plr2': It is player 2's turn to play
  - 'plr1won': Game over, the first player won
  - 'plr2won': Game over, the second player won
  - 'draw': Game over, nobody won
- board: An array of 9 numbers, each of which are either:
  - 0: An empty square
  - 1: Player 1 has a marker here
  - 2: Player 2 has a marker here
- line: an array of all positions involved in the win, otherwise empty array (STRETCH TASK)

The board array goes from top left to bottom right. For example, the array
[0,1,2,1,2,0,1,0,2] represents this board:

  .---.---.---.
  |   | 1 | 2 |
  |---+---+---|
  | 1 | 2 |   |
  |---+---+---|
  | 1 |   | 2 |
  '---'---'---'
*/

/*
The newGame function will return a valid new game object.
*/
export const newGame = () => ({
    gameState: 'plr1',
    gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    winLine: [],
    gameOver: false,
    stepNumber: 0
});

/*
The makeMove function should be called with...
- game: A valid game object
- pos: A number 0-8 corresponding to where we want to play

It will return a new game object. If the move was invalid
(because the position was already taken or the game is over),
an unchanged game will be returned.
*/

//This function checkWinner() based on the original source from https://reactjs.org/tutorial/tutorial.html
function checkWinner(board) {
    let objWinInfo = { line: [], playerId: 0 };
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { ...objWinInfo, line: lines[i], playerId: board[a] }
        }
    }
    return objWinInfo
}

export const makeMove = (objGame, position) => {
    // ...to be implemented!
    //It returns a new game object or nothing (null)
    /*Inputs:
        - an objGame
        - a position
      Output: an new updated objGame or nothing (null)
    */
    if (!objGame.gameOver && objGame.gameBoard[position] === 0){
        let playerClickedId = 0;
        let messageState = ''; //gets the game state for display message
        
        let gameOver = objGame.gameOver;
        let winLine = objGame.winLine;

        //Check whose turn to play
        if (objGame.stepNumber % 2){
            playerClickedId = 2; //the playerId who has clicked
            messageState = 'plr1'; //the next player to play
        } else {
            playerClickedId = 1;
            messageState = 'plr2';
        }

        //Update the game board whenever a player has clicked
        let newBoard = objGame.gameBoard.map((item,index)=> index === position && item === 0 ? item = playerClickedId : item);
        
        //Find the winner whenever the game board updated
        let winnerInfo = checkWinner(newBoard);
        switch(winnerInfo.playerId){
            case 1:
                messageState = 'plr1won';
                gameOver = true;
                winLine = winnerInfo.line;
                break;
            case 2:
                messageState = 'plr2won';
                gameOver = true;
                winLine = winnerInfo.line;
                break;
            default:
                break;
        }            

        //Check step number for game over            
        let currentStepNumber = objGame.stepNumber + 1;
        if (currentStepNumber === 9 && !gameOver){
            gameOver = true; //set the game state to game over
            messageState = 'draw'; //display message for game over
        }

        //Returns the new updated state
        return Object.assign({}, objGame,
                                { gameState: messageState,
                                gameBoard: newBoard,
                                winLine: winLine,
                                gameOver: gameOver,
                                stepNumber: currentStepNumber});
    }
    return null
};
