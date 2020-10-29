export class GameTile{

    public static getBallColor(tile: HTMLElement){
        if(tile.classList.contains('filled')){
            const ball = tile.children[0];
            if(ball.classList.contains('blue')){ return 'blue'}
            else if(ball.classList.contains('red')){ return 'red'}
            else if(ball.classList.contains('orange')){ return 'orange'}
            else if(ball.classList.contains('green')){ return 'green'}
            else if(ball.classList.contains('yellow')){ return 'yellow'}
            else if(ball.classList.contains('purple')){ return 'purple'}
            else if(ball.classList.contains('white')){ return 'white'}
        }
        else{
            return 'empty';
        }

    }
    public static getPositionX(tile: Element){
        return  Number(tile.id.substring(tile.id.lastIndexOf('x') +1, tile.id.lastIndexOf('_')));
    }
    public static getPositionY(tile: HTMLDivElement){
        return  Number(tile.id.substring(tile.id.lastIndexOf('y') +1, tile.id.length));
    }
}