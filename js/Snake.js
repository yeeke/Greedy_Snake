/**
 * 蛇基类
 * @param x 开始坐标x
 * @param y 开始坐标y
 * @param layer 所在的游戏层
 * @constructor
 */

var Snake = function (x, y, layer) {
    var self = this;
    self.x = x;                 //开始的坐标x
    self.y = y;                 //开始的坐标y
    self.dir = RIGHT;           //方向
    self.body = [];             //蛇身数组
    self.size = SIZE;           //大小
    self.timer = null;          //句柄，用于控制蛇的循环
    self.speed = 10;            //速度
    self.bodyGap = 2;           //每节身体间的间隔
    self.layer = layer;         //游戏层
    self.snakeLength = 3;       //蛇的长度

    /**
     * 初始化
     * */
    self.init = function () {

        for (var i = 0; i < self.snakeLength; i++){
            // var t = parseInt(Math.random() * color.length);
            // var tColor = color[t];
            var node = {
                x : self.x + (self.snakeLength - 1 - i),
                y : self.y,
                // color : tColor,
            };
            self.body.push(node);
        }
        //console.log(self.body);
        self._move();
    };

    /**
     * 蛇的移动，主要的功能
     */
    self.move = function () {
        var head = self.body[0];
        // var t = parseInt(Math.random() * 3);
        // var tColor = color[t];
        var newHead = null;
        if (self.dir == UP){
            newHead = {
                x : head.x,
                y : head.y - 1
            };
        } else if (self.dir == DOWN){
            newHead = {
                x : head.x,
                y : head.y + 1
            };
        } else if (self.dir == LEFT){
            newHead = {
                x : head.x - 1,
                y : head.y
            };
        } else if (self.dir == RIGHT){
            newHead = {
                x : head.x + 1,
                y : head.y
            };
        }
        // console.log(head.x, head.y, food.x, food.y);
        if (newHead != null){
            self.body.unshift(newHead); //添加新头

            //当吃到食物时，只添加新头，不删除尾部，相当于添加一节身体
            if (head.x == food.x && head.y == food.y){
                self.snakeLength = self.body.length;
                //当蛇的长度达达到10时，速度提升50%
                if (self.snakeLength == 10){
                    self.speed = self.speed  + parseInt(self.speed * 0.5);
                    self._move();
                }
                //当蛇的长度达达到25时，速度再次提升50%
                else if (self.snakeLength == 25) {
                    self.speed = self.speed  + parseInt(self.speed * 0.5);
                    self._move();
                }
                //当蛇的长度达达到55时，速度再次提升50%
                else if (self.snakeLength == 55) {
                    self.speed = self.speed  + parseInt(self.speed * 0.5);
                    self._move();
                }
                //当蛇的长度达达到100时，速度再次提升50%
                else if (self.snakeLength == 100) {
                    self.speed = self.speed  + parseInt(self.speed * 0.5);
                    self._move();
                } else if (self.snakeLength == 4){
                    map.mapLevel[0][1] = 0;
                    map.drawTile();
                }
                //清除食物层
                food.layer.clearRect(0, 0, WSCREEN, HSCREEN);
                //重新生成一个食物
                food.init();
            } else {//当没吃到食物时，既添加新头，又删除尾部，相当于向前移动一节身体
                self.body.pop(); //删除尾部
            }

            if (self.isHit()){
                clearInterval(self.timer);
            }
        }
    };

    /**
     * 检测蛇的碰撞
     * 1.临界检测
     * 2.蛇头与蛇身的检测
     * @return {boolean} 当碰撞了，返回true,否则返回false
     */
    self.isHit = function () {
        //临界检测
        var head = self.body[0];
        if (head.x < 1 || head.x > WSCREEN / self.size || head.y < 1 || head.y > HSCREEN / self.size){
            return true;
        }
        //当咬到身体时
        for (var i = 1; i < self.body.length; i++){
            if (head.x == self.body[i].x && head.y == self.body[i].y){
                return true;
            }
        }

        if (map.mapLevel[head.y - 1][head.x - 1] == WALL){
            console.log("Wall", head);
            return true;
        }
        return false;
    };
    
    self._move = function () {
        if (self.timer != null){
            clearInterval(self.timer);
        }
        //console.log(self.speed);
        self.timer = setInterval(self.loop, 3000 / self.speed);
    };

    /**
     * 绘制蛇
     * */
    self.draw = function () {
        //console.log(self.body.length);
        //画蛇身
        for (var i = self.body.length - 1; i > 0; i--){
            self.layer.fillStyle = "red";
            var tx = (self.body[i].x - 1) * self.size;
            var ty = (self.body[i].y - 1) * self.size;
            self.layer.fillRect(tx + 1, ty + 1, self.size - self.bodyGap, self.size - self.bodyGap);
        }

        //画蛇头
        var head = self.body[0];
        self.layer.fillStyle = "gray";
        self.layer.fillRect((head.x - 1) * self.size + 1,
            (head.y - 1) * self.size + 1,
            self.size - self.bodyGap,
            self.size - self.bodyGap);
    };

    /**
     * 循环
     */
    self.loop = function () {
        self.layer.clearRect(0, 0, WSCREEN, HSCREEN);
        self.draw();
        self.move();
    };
};