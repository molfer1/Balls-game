var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { MapCreator } from "./map-creator";
import { randomBallColor } from "./colors";
import { boardConfig } from "./main";
import { GameTile } from "./game-tile";
import { GameBall } from "./game-ball";
import { findPath } from "./path-finder";
import { measure } from "./decorators";
export class Game {
    constructor() {
        Game.initGame();
    }
    static initGame() {
        boardConfig.board.innerHTML = '';
        MapCreator.createBoard();
        Game.spawnInitialBalls();
        Game.initNextBalls();
        console.log('Game start');
    }
    static resetGame() {
        window.location.reload();
    }
    static updateGameAfterMove() {
        const answerList = this.checkForBallLines();
        if (answerList.length != 0) {
            for (const el of answerList) {
                const tile = document.getElementById(`id_x${el.x}_y${el.y}`);
                console.log(tile);
                if (tile.classList.contains('filled')) {
                    this.score = this.score + 1;
                }
                ;
                tile.classList.remove('filled');
                tile.classList.add('empty');
                tile.innerHTML = '';
            }
        }
        else {
            this.spawnNextBalls();
            this.initNextBalls();
        }
        document.getElementById('score').innerText = `Twój wynik to: ${this.score}`;
        console.log(this.score);
    }
    static spawnInitialBalls() {
        for (let i = 0; i < boardConfig.initialBallsCount; i++) {
            const tile = Game.getEmptyTile();
            if ("classList" in tile) {
                const ball = document.createElement('div');
                ball.classList.add('ball', randomBallColor());
                tile.classList.remove('empty');
                tile.classList.add('filled');
                tile.appendChild(ball);
            }
        }
    }
    static initNextBalls() {
        Game.nextColors = [randomBallColor(), randomBallColor(), randomBallColor()];
        const preview = document.getElementById('ballsPreview');
        preview.innerHTML = '';
        for (let color of Game.nextColors) {
            let ballPreview = document.createElement('div');
            ballPreview.classList.add('ballPreview', color);
            preview.appendChild(ballPreview);
        }
    }
    static spawnNextBalls() {
        for (let i = 0; i < boardConfig.afterMoveSpawnBallsCount; i++) {
            const tile = Game.getEmptyTile();
            if (tile == undefined) {
                this.gameOver();
                break;
            }
            if ("classList" in tile) {
                const ball = document.createElement('div');
                ball.classList.add('ball', Game.nextColors[i]);
                tile.classList.remove('empty');
                tile.classList.add('filled');
                tile.appendChild(ball);
            }
        }
    }
    static getEmptyTile() {
        const emptyTiles = document.querySelectorAll('div.empty');
        return emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    }
    static checkForBallLines() {
        // before spawnNextBall map
        const currentMap = [];
        const answerList = [];
        for (const y in this.gameBoard) {
            currentMap.push([]);
            for (const x in this.gameBoard[y]) {
                currentMap[y].push(GameTile.getBallColor(this.gameBoard[y][x]));
            }
        }
        // check for x axis
        for (const y in currentMap) {
            let colorLine = [];
            for (const x in currentMap) {
                if (currentMap[y][x] != 'empty') {
                    colorLine.push(currentMap[y][x]);
                }
                else {
                    colorLine = [];
                }
                if (colorLine.length >= 2) {
                    if (colorLine[colorLine.length - 2] == colorLine[colorLine.length - 1]) {
                        if (colorLine.length >= 5) {
                            answerList.push({ x: +x, y: +y }, { x: Number(x) - 1, y: +y }, { x: Number(x) - 2, y: +y }, { x: Number(x) - 3, y: +y }, { x: Number(x) - 4, y: +y });
                        }
                    }
                    else {
                        colorLine = [];
                    }
                }
            }
        }
        //check for y axis
        for (const x in currentMap) {
            let colorLine = [];
            for (const y in currentMap) {
                if (currentMap[y][x] != 'empty') {
                    colorLine.push(currentMap[y][x]);
                }
                else {
                    colorLine = [];
                }
                if (colorLine.length >= 2) {
                    if (colorLine[colorLine.length - 2] == colorLine[colorLine.length - 1]) {
                        if (colorLine.length >= 5) {
                            answerList.push({ x: +x, y: +y }, { x: +x, y: Number(y) - 1 }, { x: +x, y: Number(y) - 2 }, { x: +x, y: Number(y) - 3 }, { x: +x, y: Number(y) - 4 });
                        }
                    }
                    else {
                        colorLine = [];
                    }
                }
            }
        }
        return answerList;
    }
    static getPath(tileStart, tileEnd) {
        const sx = GameTile.getPositionX(tileStart);
        const sy = GameTile.getPositionY(tileStart);
        const dx = GameTile.getPositionX(tileEnd);
        const dy = GameTile.getPositionY(tileEnd);
        return findPath({ x: sx, y: sy }, { x: dx, y: dy });
    }
    static clearPreviousPath() {
        const previousPath = document.querySelectorAll('div.path');
        for (const el of previousPath) {
            el.classList.remove('path');
        }
        ;
    }
    static handlePathPreview(tileEnd) {
        if (!Game.lookForPath) {
            return;
        }
        ;
        this.clearPreviousPath();
        const tileStart = document.querySelector('div.tileStart');
        const path = this.getPath(tileStart, tileEnd);
        for (const i in path) {
            const tile = document.getElementById(`id_x${path[i].x}_y${path[i].y}`);
            tile.classList.add('path');
        }
    }
    static handleTileClick(tile) {
        const previousTile = document.querySelector('div.tileStart'); // previous Tile if exists
        if (tile.classList.contains('filled')) { // contains ball
            if (previousTile == undefined) { // no tile selected before
                tile.classList.add('tileStart');
                Game.lookForPath = true;
            }
            else {
                if (tile.classList.contains('tileStart')) { // unselect tile
                    tile.classList.remove('tileStart');
                    Game.lookForPath = false;
                    if (tile.classList.contains('path')) {
                        tile.classList.remove('path');
                    }
                    ;
                }
                else {
                    previousTile.classList.remove('tileStart'); // remove tile selected before, add new
                    tile.classList.add('tileStart');
                }
            }
        }
        else if (tile.classList.contains('empty')) { // don't contain ball
            if (previousTile != undefined) { // ball was already selected
                const path = this.getPath(previousTile, tile);
                if ((path[0].x == GameTile.getPositionX(tile)) && (path[0].y == GameTile.getPositionY(tile))) {
                    GameBall.moveBall(previousTile, tile);
                    Game.updateGameAfterMove();
                }
                else {
                    return;
                }
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    }
    static gameOver() {
        document.getElementById('game').classList.add('blur');
        const container = document.createElement('div');
        const title = document.createElement('h1');
        const finalScore = document.createElement('h2');
        const resetGameBt = document.createElement('button');
        container.id = 'gameOverScreen';
        title.classList.add('title');
        title.innerText = 'GAME OVER';
        finalScore.classList.add('finalScore');
        finalScore.innerText = `Twój wynik to: ${this.score}`;
        resetGameBt.classList.add('resetGameBt');
        resetGameBt.innerText = 'RESTART';
        resetGameBt.addEventListener('click', function () { Game.resetGame(); });
        container.appendChild(title);
        container.appendChild(finalScore);
        container.appendChild(resetGameBt);
        document.body.appendChild(container);
        console.log('GAME OVER');
    }
}
Game.gameBoard = [];
Game.nextColors = [];
Game.lookForPath = false;
Game.score = 0;
__decorate([
    measure
], Game, "initGame", null);
