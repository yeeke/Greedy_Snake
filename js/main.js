/**
 * 主函数
 */

var backgroundLayer;
var mapLayer;
var foodLayer;
var snakeLayer;
var snake;
var food;

$(document).ready(function () {
    gameLayerInit();
    objectInit();
});

function gameLayerInit() {
    backgroundLayer = $("#background")[0].getContext("2d");
    $("#background").attr({"width":WSCREEN, "height":HSCREEN});
    mapLayer = $("#map")[0].getContext("2d");
    $("#map").attr({"width":WSCREEN, "height":HSCREEN});
    foodLayer = $("#food")[0].getContext("2d");
    $("#food").attr({"width":WSCREEN, "height":HSCREEN});
    snakeLayer = $("#snake")[0].getContext("2d");
    $("#snake").attr({"width":WSCREEN, "height":HSCREEN});
}

function objectInit() {
    snake = new Snake(1, 2, snakeLayer);
    snake.init();
    food = new Food(foodLayer);
    food.init();
}

$(document).keydown(function (e) {
    if (snake.dir == UP || snake.dir == DOWN){
        switch (e.keyCode){
            case A :
                snake.dir = LEFT;
                break;
            case D :
                snake.dir = RIGHT;
                break;
        }
    } else if (snake.dir == LEFT || snake.dir == RIGHT){
        switch (e.keyCode){
            case W :
                snake.dir = UP;
                break;
            case S :
                snake.dir = DOWN;
                break;
        }
    }
});