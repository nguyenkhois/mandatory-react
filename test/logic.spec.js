import { makeMove, newGame } from '../src/logic';

//Case 1
test('makeMove() - Case 1 - First move', () => {
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

//Case 2
test('makeMove() - Case 2 - Player 1 won', () => {
    const initial = {
        gameState: 'plr1',
        gameBoard: [1, 2, 1, 2, 1, 2, 1, 2, 0],
        winLine: [],
        gameOver: false,
        stepNumber: 8
    };
    const expected = {
        gameState: 'plr1won',
        gameBoard: [1, 2, 1, 2, 1, 2, 1, 2, 1],
        winLine: [0,4,8],
        gameOver: true,
        stepNumber: 9
    };
    const result = makeMove(initial, 8);
    expect(result).toEqual(expected); // testing we didn't mutate entry state
});

//Case 3
test('makeMove() - Case 3 - Game over. Nobody won', () => {
    const initial = {
        gameState: 'plr1',
        gameBoard: [2, 1, 1, 1, 2, 2, 1, 2, 0],
        winLine: [],
        gameOver: false,
        stepNumber: 8
    };
    const expected = {
        gameState: 'draw',
        gameBoard: [2, 1, 1, 1, 2, 2, 1, 2, 1],
        winLine: [],
        gameOver: true,
        stepNumber: 9
    };
    const result = makeMove(initial, 8);
    expect(result).toEqual(expected); // testing we didn't mutate entry state
});