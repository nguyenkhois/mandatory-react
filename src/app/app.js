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
        this.state = newGame();
    }

    handlePlayAgain(e){
        e.preventDefault();
        this.setState(newGame());
    }

    handleTileClick(tileId){
        this.setState(makeMove(this.state, tileId));
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
        )
    }
}