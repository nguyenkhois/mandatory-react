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
            gameState: {
                state: 'plr1',
                board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                line: []
            }      
        };
    }

    handleTileClick(tileId){
        if (this.state.gameState.board.filter(item=>item === 0).length > 0){
            let playerClickedId = 0; //gets the current userId who has clicked
            let messageString = ''; //gets the game state even the next player who play now in a string for display message
            if (this.state.stepNumber % 2){
                playerClickedId = 2; 
                messageString = 'plr1';
            } else {
                playerClickedId = 1;
                messageString = 'plr2';
            }

            //Update the board
            let newBoard = this.state.gameState.board.map((item,index)=> index === tileId && item === 0 ? item = playerClickedId : item);
            
            //Update the game state even the next player who play now
            let newGameState = { state: messageString, board: newBoard, line: [] };

            //Update the apllication state
            let newState = Object.assign({}, this.state, {stepNumber: this.state.stepNumber + 1, gameState: newGameState});
            this.setState(newState);
        } else {
            //let newGameState = Object.assign({},this.state.gameState, {state: 'draw'}); //Clone a copy of state's child
            let newGameState = {...this.state.gameState, state: 'draw'};// Clone by an other way but get same result
            this.setState({gameState: newGameState}); //Update the state's child with new data
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