import React from 'react';

import {makeMove, newGame} from '../logic';

import Message from './message';
import Tile from './tile';

/*
The main game App! It should have a TicTacToe game state in its component state,
and use the Tile and Message components to render the game.

Then the `makeMove` function from the logic layer should be used to update the
game state as the tiles are being clicked.

The user should also be able to reset the game.

The App component should render an outer element with a `container` CSS class,
and all tiles within an element with a `board` CSS class.
*/

/* 
export const newGame = () => ({
    gameState: 'plr1',
    gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    winLine: [],
    gameOver: false,
    stepNumber: 0
});
*/
export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = newGame();
    }

    //Original source of this method from https://reactjs.org/tutorial/tutorial.html
    checkWinner(board){
        let objWinInfo = {line: [], playerId: 0};
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
                return {...objWinInfo, line: lines[i], playerId: board[a]}
            }
          }
          return objWinInfo
    }

    handlePlayAgain(e){
        this.setState(newGame());
    }

    handleTileClick(tileId){        
        if (!this.state.gameOver && this.state.gameBoard.filter(item=>item === 0).length > 0){
            let playerClickedId = 0;
            let messageState = ''; //gets the game state for display message
            
            let gameOver = this.state.gameOver;
            let winLine = this.state.winLine;

            //Check whose turn to play
            if (this.state.stepNumber % 2){
                playerClickedId = 2; //the playerId who has clicked
                messageState = 'plr1'; //the next player will play
            } else {
                playerClickedId = 1;
                messageState = 'plr2';
            }

            //Update the game board after one player has clicked
            let newBoard = this.state.gameBoard.map((item,index)=> index === tileId && item === 0 ? item = playerClickedId : item);
            
            //Find the winner after the game board updated
            let winnerInfo = this.checkWinner(newBoard);
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
            let currentStepNumber = this.state.stepNumber + 1;
            if (currentStepNumber === 9 && !gameOver){
                gameOver = true; //set game state to game over
                messageState = 'draw'; //display message for game over
            }

            //Update the apllication state
            let newState = Object.assign({}, this.state, 
                                        { gameState: messageState,
                                          gameBoard: newBoard,
                                          winLine: winLine,
                                          gameOver: gameOver,  
                                          stepNumber: currentStepNumber});
            this.setState(newState); //Update the state with new data by using non-mutating methods
        }      
    }

    render() {
        return (
            <div>
                <Message messageString={this.state.gameState}/>
                <Board fnHandleTileClick={(tileId)=>this.handleTileClick(tileId)} 
                    currentBoard={this.state.gameBoard}
                    line={this.state.winLine}
                />
                <button type="button" onClick={e=>this.handlePlayAgain(e)}>Play again!</button>                
                {console.log(this.state) /*For Testing purpose*/}
            </div>
        )
    }
}

class Board extends React.Component {
    renderTile(id) {
        return (
            <Tile tileId={id} 
                fnOnClick={(id)=>this.props.fnHandleTileClick(id)}
                board={this.props.currentBoard}
                line={this.props.line}
            />
        )
    }

    render() {
        return (
            <div className="board">
                <div>
                    {this.renderTile(0)}
                    {this.renderTile(3)}
                    {this.renderTile(6)}
                </div>
                <div>
                    {this.renderTile(1)}
                    {this.renderTile(4)}
                    {this.renderTile(7)}
                </div>
                <div>
                    {this.renderTile(2)}
                    {this.renderTile(5)}
                    {this.renderTile(8)}
                </div>
            </div>
        );
    }
};