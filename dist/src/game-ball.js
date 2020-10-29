import { GameTile } from "./game-tile";
import { Game } from "./game";
export class GameBall {
    static moveBall(startTile, endTile) {
        Game.lookForPath = false;
        const ballColor = GameTile.getBallColor(startTile);
        startTile.innerHTML = '';
        startTile.classList.remove('filled', 'tileStart');
        Game.clearPreviousPath();
        startTile.classList.add('empty');
        const ball = document.createElement('ball');
        ball.classList.add('ball', ballColor);
        endTile.classList.remove('empty');
        endTile.classList.add('filled');
        endTile.appendChild(ball);
    }
}
