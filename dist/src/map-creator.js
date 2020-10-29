import { boardConfig } from './main';
import { Game } from "./game";
export class MapCreator {
    constructor() { }
    static createBoard() {
        for (let i = 0; i < boardConfig.height; i++) {
            Game.gameBoard.push([]);
            for (let j = 0; j < boardConfig.width; j++) {
                let tile = MapCreator.initTile(j, i);
                Game.gameBoard[i].push(tile);
                boardConfig.board.appendChild(tile);
            }
        }
    }
    static initTile(x, y) {
        let tile = document.createElement('div');
        tile.classList.add('tile', 'empty');
        tile.style.left = x * 80 + 'px';
        tile.style.top = y * 80 + 'px';
        tile.id = `id_x${x}_y${y}`;
        tile.addEventListener('click', function () { Game.handleTileClick(tile); });
        tile.addEventListener('mouseover', function () { Game.handlePathPreview(tile); });
        return tile;
    }
}
