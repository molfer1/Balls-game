export class GameTile {
    static getBallColor(tile) {
        if (tile.classList.contains('filled')) {
            const ball = tile.children[0];
            if (ball.classList.contains('blue')) {
                return 'blue';
            }
            else if (ball.classList.contains('red')) {
                return 'red';
            }
            else if (ball.classList.contains('orange')) {
                return 'orange';
            }
            else if (ball.classList.contains('green')) {
                return 'green';
            }
            else if (ball.classList.contains('yellow')) {
                return 'yellow';
            }
            else if (ball.classList.contains('purple')) {
                return 'purple';
            }
            else if (ball.classList.contains('white')) {
                return 'white';
            }
        }
        else {
            return 'empty';
        }
    }
    static getPositionX(tile) {
        return Number(tile.id.substring(tile.id.lastIndexOf('x') + 1, tile.id.lastIndexOf('_')));
    }
    static getPositionY(tile) {
        return Number(tile.id.substring(tile.id.lastIndexOf('y') + 1, tile.id.length));
    }
}
