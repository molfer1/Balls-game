export const gameColors = ['blue', 'red', 'orange', 'green', 'yellow', 'purple', 'white'];
export const randomBallColor = function(){
    return gameColors[Math.floor(Math.random() * gameColors.length)];
};
