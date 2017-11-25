/**
 * 食物类
 */

var Food = function (layer) {
    var self = this;
    self.x = 0;
    self.y = 0;
    self.size = 10;
    self.layer = layer;
    self.effect = 1;
    self.bodyGap = 2;
    self.color = "#00f";

    self.init = function () {
        var pos = null;
        do {
            pos = self.createRandomXY();
        }while (self.checkIsOnSnake(pos));
        if (pos != null){
            self.x = pos.x;
            self.y = pos.y;
            self.draw();
        }
    };

    self.createRandomXY = function () {
        var x = parseInt(Math.random() * (WSCREEN / self.size - 1) + 1);
        var y = parseInt(Math.random() * (HSCREEN / self.size - 1) + 1);
        return {
            x : x,
            y : y
        };
    };

    self.checkIsOnSnake = function (pos) {
        for (var i = 0; i < snake.body.length; i++){
            if (pos.x == snake.body[i].x && pos.y == snake.body[i].y){
                return true;
            }
        }
        return false;
    };

    self.draw = function () {
        self.layer.fillStyle = self.color;
        self.layer.fillRect((self.x - 1) * self.size + 1,
            (self.y - 1) * self.size + 1,
            self.size - self.bodyGap,
            self.size - self.bodyGap);
    };
};