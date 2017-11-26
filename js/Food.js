/**
 * 食物基类
 * @param layer 所在游戏层
 * @constructor
 */

var Food = function (layer) {
    var self = this;
    self.x = 0;             //食物的坐标x
    self.y = 0;             //食物的坐标y
    self.size = SIZE;       //食物的大小
    self.layer = layer;     //所在游戏层
    self.effect = 1;        //对蛇产生的效果
    self.bodyGap = 2;       //间隔
    self.color = "#00f";    //颜色

    /**
     * 初始化
     */
    self.init = function () {

        var pos = null;
        do {
            pos = self.createRandomXY();
        }while (self.checkIsOnSnake(pos) || self.checkIsOnMap(pos));
        console.log(pos);
        if (pos != null){
            self.x = pos.x;
            self.y = pos.y;
            self.draw();
        }
    };

    /**
     * 随机生成食物的坐标
     * @return {{x: Number, y: Number}}
     */
    self.createRandomXY = function () {
        var x = parseInt(Math.random() * (WSCREEN / self.size - 1) + 1);
        var y = parseInt(Math.random() * (HSCREEN / self.size - 1) + 1);
        return {
            x : x,
            y : y
        };
    };

    /**
     * 检测食物是否在蛇身上
     * @param pos 随机生成的食物坐标
     * @return {boolean}
     */
    self.checkIsOnSnake = function (pos) {
        for (var i = 0; i < snake.body.length; i++){
            if (pos.x == snake.body[i].x && pos.y == snake.body[i].y){
                console.log("snake", pos);
                return true;
            }
        }
        return false;
    };

    self.checkIsOnMap = function (pos) {
        // for (var i = 0; i < map.mapLevel.length; i++){
        //     for (var j = 0; j < map.mapLevel[i].length; j++){
        //         if (map.mapLevel[i][j] == WALL && j == pos.x - 1 && i == pos.y - 1){
        //             console.log("Wall", pos);
        //             return true;
        //         }
        //     }
        // }
        if (map.mapLevel[pos.y - 1][pos.x - 1] == WALL){
            console.log("Wall", pos);
            return true;
        }
        return false;
    };

    /**
     * 绘制食物
     */
    self.draw = function () {
        self.layer.fillStyle = self.color;
        self.layer.fillRect((self.x - 1) * self.size + 1,
            (self.y - 1) * self.size + 1,
            self.size - self.bodyGap,
            self.size - self.bodyGap);
    };
};