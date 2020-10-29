import { Game } from "./game";
export const boardConfig = {
    board: document.getElementById('board'),
    score: document.getElementById('score'),
    height: 9,
    width: 9,
    initialBallsCount: 5,
    afterMoveSpawnBallsCount: 3
};
const game = new Game();
