import { makeMove, newGame } from '../src/logic';

//Case 1
test('Testing for makeMove() function - Case 1', () => {
    const initial = newGame();
    const expected = {
        gameState: 'plr2',
        gameBoard: [1, 0, 0, 0, 0, 0, 0, 0, 0],
        winLine: [],
        gameOver: false,
        stepNumber: 1
    };
    const result = makeMove(initial, 0);
    expect(result).toEqual(expected);
    expect(initial).toEqual(newGame()); // testing we didn't mutate entry state
});

// ...more tests to follow here! 
