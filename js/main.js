/**
 * 主函数
 */

var backgroundLayer;        //背景层
var mapLayer;               //地图层
var foodLayer;              //食物层
var snakeLayer;             //蛇层
var snake;                  //蛇的全局变量
var food;                   //食物的全局变量

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

    //当蛇的方向朝上或者朝下时，只有左右键有效
    if (snake.dir == UP || snake.dir == DOWN){
        switch (e.keyCode){
            case A :
                snake.dir = LEFT;
                break;
            case D :
                snake.dir = RIGHT;
                break;
        }
    }
    //当蛇的方向朝左或者朝右时，只有上下键有效
    else if (snake.dir == LEFT || snake.dir == RIGHT){
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