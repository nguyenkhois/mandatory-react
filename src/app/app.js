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
export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {            
            stepNumber: 0, //maximum 9 teps
            gameOver: false, //game over or must be locked
            gameState: {
                state: 'plr1',
                board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                line: []
            }      
        };
    }

    checkWinner(board){
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
              return board[a];
            }
          }
          return null;
    }

    handleTileClick(tileId){        
        if (!this.state.gameOver && this.state.gameState.board.filter(item=>item === 0).length > 0){
            let playerClickedId = 0; //gets the current userId who has clicked
            let message = ''; //gets the game state even the next player who play now in a string for display message
            let flagGameOver = false;

            if (this.state.stepNumber % 2){
                playerClickedId = 2; 
                message = 'plr1';
            } else {
                playerClickedId = 1;
                message = 'plr2';
            }

            //Update the board
            let newBoard = this.state.gameState.board.map((item,index)=> index === tileId && item === 0 ? item = playerClickedId : item);
            
            //Check winner
            switch(this.checkWinner(newBoard)){
                case 1:
                    message = 'plr1won';
                    flagGameOver = true;
                    break;
                case 2:
                    message = 'plr2won';
                    flagGameOver = true;
                    break;
                default:
                    break;
            }

            //Create the new game state
            let newGameState = { state: message, board: newBoard, line: [] };

            //Update the apllication state
            let newState = Object.assign({}, this.state, 
                                        {stepNumber: this.state.stepNumber + 1, 
                                        gameOver: flagGameOver, 
                                        gameState: newGameState});
            this.setState(newState); //Update the state with new data by using non-mutating methods
        } else if (!this.state.gameOver){
            let newGameState = {...this.state.gameState, state: 'draw'};
            this.setState({gameState: newGameState}); //Update the state's child with new data by using non-mutating methods
        }        
    }

    render() {     
        return (
            <div>
                <Message messageString={this.state.gameState.state}/>
                <Board fnHandleTileClick={(tileId)=>this.handleTileClick(tileId)} 
                    currentBoard={this.state.gameState.board}
                />                
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