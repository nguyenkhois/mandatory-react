/*
The Message component expects to be passed...
- state: a game state string (plr1,plr2,plr1won,plr2won,draw)

The component will then render an appropriate message.
*/

import React from 'react';

export default function Message(props) {
    let message = '';
    switch(props.messageString){
        case 'plr1':
            message = 'Player 1 play now';
            break;
        case 'plr2':
            message = 'Player 2 play now';
            break;
        case 'plr1won':
            message = 'Player 1 win';
            break;
        case 'plr2won':
            message = 'Player 2 win';
            break;
        case 'draw':
            message = 'Game over, nobody win';
            break;
        default:
            break;
    }

    return (
        <span>{message}</span>
    );
}
