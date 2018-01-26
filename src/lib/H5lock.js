function H5lock(obj){
    this.frame = obj.frame;
    this.height = obj.height;
    this.width = obj.width;
    this.chooseType = obj.chooseType || 3;
    this.callback = obj.callback;
};

function getDis(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

function stopDefault(e){
   e.preventDefault();
}

H5lock.prototype.pickPoints = function(fromPt, toPt) {
    var lineLength = getDis(fromPt, toPt);
    var dir = toPt.index > fromPt.index ? 1 : -1;

    var len = this.restPoint.length;
    var i = dir === 1 ? 0 : (len - 1);
    var limit = dir === 1 ? len : -1;

    while (i !== limit) {
        var pt = this.restPoint[i];

        if (getDis(pt, fromPt) + getDis(pt, toPt) === lineLength) {
            this.drawPoint(pt.x, pt.y);
            this.lastPoint.push(pt);
            this.restPoint.splice(i, 1);
            if (limit > 0) {
                i--;
                limit--;
            }
        }

        i+=dir;
    }
}

H5lock.prototype.drawCle = function(x, y) { // 初始化解锁密码面板
    this.ctx.strokeStyle = '#3492e9';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.stroke();
}
H5lock.prototype.drawPoint = function() { // 初始化圆心
    for (var i = 0 ; i < this.lastPoint.length ; i++) {
        this.ctx.fillStyle = '#3492e9';
        this.ctx.beginPath();
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }
}
H5lock.prototype.drawStatusPoint = function(type) { // 初始化状态线条

    for (var i = 0 ; i < this.lastPoint.length ; i++) {
        this.ctx.strokeStyle = type;
        this.ctx.beginPath();
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}
H5lock.prototype.drawLine = function(po, lastPoint) {// 解锁轨迹
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
    for (var i = 1 ; i < this.lastPoint.length ; i++) {
        this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
    }
    this.ctx.lineTo(po.x, po.y);
    this.ctx.stroke();
    this.ctx.closePath();

}
H5lock.prototype.createCircle = function() {// 创建解锁点的坐标，根据canvas的大小来平均分配半径

    var n = this.chooseType;
    var count = 0;
    this.r = this.ctx.canvas.width / (2 + 4 * n);// 公式计算
    this.lastPoint = [];
    this.arr = [];
    this.restPoint = [];
    var r = this.r;
    for (var i = 0 ; i < n ; i++) {
        for (var j = 0 ; j < n ; j++) {
            count++;
            var obj = {
                x: j * 4 * r + 3 * r,
                y: i * 4 * r + 1.5 * r,
                index: count
            };
            this.arr.push(obj);
            this.restPoint.push(obj);
        }
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (var i = 0 ; i < this.arr.length ; i++) {
        this.drawCle(this.arr[i].x, this.arr[i].y);
    }
    //return arr;
}
H5lock.prototype.getPosition = function(e) {// 获取touch点相对于canvas的坐标
    var rect = e.currentTarget.getBoundingClientRect();
    //H5 分辨率处理 触摸处理
    var po = {
          x: (e.touches[0].clientX - rect.left)*this.scaleRatio,
          y: (e.touches[0].clientY - rect.top)*this.scaleRatio
      };
    return po;
}
H5lock.prototype.update = function(po) {// 核心变换方法在touchmove时候调用
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    for (var i = 0 ; i < this.arr.length ; i++) { // 每帧先把面板画出来
        this.drawCle(this.arr[i].x, this.arr[i].y);
    }

    this.drawPoint(this.lastPoint);// 每帧花轨迹
    this.drawLine(po , this.lastPoint);// 每帧画圆心

    for (var i = 0 ; i < this.restPoint.length ; i++) {
        var pt = this.restPoint[i];

        if (Math.abs(po.x - pt.x) < this.r && Math.abs(po.y - pt.y) < this.r) {
            this.drawPoint(pt.x, pt.y);
            this.pickPoints(this.lastPoint[this.lastPoint.length - 1], pt);
            break;
        }
    }

}
H5lock.prototype.getValue = function(){
	var pArr = "",
		points = this.lastPoint;

	for (var i = 0 ; i < points.length ; i++) {
        pArr += ''+points[i].index;
    }
	return pArr;

}
H5lock.prototype.setChooseType = function(type){
    chooseType = type;
    init();
}
H5lock.prototype.initDom = function(){
    var str = '<canvas id="canvas" width='+this.width+' height='+this.height+'></canvas>';
    this.frame.innerHTML = str;
}
H5lock.prototype.init = function() {
    this.initDom();
    this.lastPoint = [];
    this.touchFlag = false;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    //H5 分辨率处理
    this.scaleRatio=1.0;
    if (window.devicePixelRatio) {
        this.scaleRatio = window.devicePixelRatio;
    }
    this.canvas.style.width =  this.width+"px";
    this.canvas.style.height = this.height+"px";
    this.canvas.width = this.width * this.scaleRatio;
    this.canvas.height = this.height * this.scaleRatio;

    this.createCircle();
    this.bindEvent();
}
H5lock.prototype.reset = function() {
    this.createCircle();
}
H5lock.prototype.bindEvent = function() {
    var self = this;
    this.canvas.addEventListener("touchstart", function (e) {
        e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
         var po = self.getPosition(e);
         for (var i = 0 ; i < self.arr.length ; i++) {
            if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {

                self.touchFlag = true;
                self.drawPoint(self.arr[i].x,self.arr[i].y);
                self.lastPoint.push(self.arr[i]);
                self.restPoint.splice(i,1);
                break;
            }
         }
     }, false);
     this.canvas.addEventListener("touchmove", function (e) {
        if (self.touchFlag) {
            self.update(self.getPosition(e));
        }
     }, false);
     this.canvas.addEventListener("touchend", function (e) {
         if (self.touchFlag) {
             self.touchFlag = false;
			 if(self.callback){
				 self.callback(self.getValue(),self);
			 }
             setTimeout(function(){
                self.reset();
            }, 300);
         }

     }, false);
     document.addEventListener('touchmove', stopDefault, false);
}

H5lock.prototype.destroy = function(){
    document.removeEventListener("touchmove", stopDefault, false);
}

module.exports = H5lock;
