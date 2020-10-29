import {Game} from "./game";

export interface GameConfig {
    board: HTMLElement
    score: HTMLElement
    height: number
    width: number
    initialBallsCount: number
    afterMoveSpawnBallsCount: number
}

export const boardConfig: GameConfig = {
    board: document.getElementById('board'),
    score: document.getElementById('score'),
    height: 9,
    width: 9,
    initialBallsCount: 5,
    afterMoveSpawnBallsCount: 3
};
const game = new Game();