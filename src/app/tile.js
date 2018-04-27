/*
The Tile component expects to be passed
- piece: a valid board value:
  - 0: an empty square
  - 1: plr1 has a piece here
  - 2: plr2 has a piece here
- callback: a function that it'll call when clicked
- line: a boolean, true if tile was part of winning line (STRETCH TASK)

The tile should render with the classes...
- tile: always
- plr1: if has a plr1 piece
- plr2: if has a plr2 piece
- line: if it was part of a winning line (STRETCH TASK)
*/

import React from 'react';

export default function Tile(props) {
    /*callback: tileId -> props.fnOnClick(props.tileId)
      props: int - props.tileId, 
             array - props.board,
             array - line
    */
    let objTile = { styleMain:'tile', styleSub: '', styleWin: '',text: '' };

    switch(props.board[props.tileId]){
        case 1:
            objTile.styleSub = 'plr1';
            objTile.text = 'X';            
            break;
        case 2:
            objTile.styleSub = 'plr2';
            objTile.text = 'O';
            break;
        default:
            break;
    }
    props.line.filter(item=>item===props.tileId).length > 0 ? objTile.styleWin = 'line' : null;

    return (
        <div className={objTile.styleMain + ' ' + objTile.styleSub + ' ' + objTile.styleWin} onClick={()=>props.fnOnClick(props.tileId)}>
            {objTile.text}
        </div>
    );
}
