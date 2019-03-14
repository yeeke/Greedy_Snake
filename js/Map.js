
var Map = function () {
    var self = this;
    self.size = SIZE;
    self.bodyGap = 2;               //间隔
    self.width = WSCREEN;           //游戏区的宽度
    self.height = HSCREEN;          //游戏区的高度
    self.layer = null;              //需要绘制的游戏层
    self.wTileNum = 0;              //游戏区宽度的瓦片个数
    self.hTileNum = 0;              //游戏区高度的瓦片个数
    self.level = 1;                 //关卡级别
    self.mapLevel = [];

    self.init = function (layer) {
        self.wTileNum = self.width / self.size;
        self.hTileNum = self.height / self.size;
        self.layer = layer;
    };

    self.setLevel = function (level) {
        self.level = level;
        /**
         * 在js中，数组是引用类型
         * 当修改self.mapLevel时，Level.levelX 也会随之改变
         * 造成的结果：当切换地图时，self.map再次使用Level.levelX的值，故当再次切换回之前的地图时，
         * 就会出现之前被打掉的瓦片仍然是空缺，并没有及时更新
         * 如果使用中间变量,tempLevel则会避免这种情况
         * */
        // self.mapLevel = eval("Level." + "level" + self.level);
        var tempLevel = eval("Level." + "level" + self.level);
        console.log(tempLevel);
        self.mapLevel = new Array();
        for (var i = 0; i < tempLevel.length; i++){
            self.mapLevel[i] = new Array();
            for (var j = 0; j < tempLevel[i].length; j++){
                self.mapLevel[i][j] = tempLevel[i][j];
            }
        }
    };

    self.drawTile = function () {
        self.layer.clearRect(0, 0, WSCREEN, HSCREEN);
        if (self.mapLevel != null && self.mapLevel.length > 0){
            for (var i = 0; i < self.hTileNum; i++){
                for (var j = 0; j < self.wTileNum; j++){
                    var t = parseInt(self.mapLevel[i][j]);
                    if (WALL == t){
                        self.layer.fillStyle = "#0f0";
                        self.layer.fillRect(j * self.size + 1,
                            i * self.size + 1,
                            self.size - self.bodyGap,
                            self.size - self.bodyGap);
                    }
                }

            }
        }
    };
};
