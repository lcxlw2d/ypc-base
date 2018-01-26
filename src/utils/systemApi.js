var storage = window.localStorage;

function doNothing() {}

var systemApi = {
    //获取数据
    getValue: function(name) {
        return storage.getItem(name);
    },
    //设置数据
    setValue: function(name, value) {
        storage.setItem(name, value);
    },
    //删除数据
    removeValue: function(name) {
        storage.removeItem(name);
    },
    //深度比较
    isEqual: function(one, other) {
        if (one instanceof Array && other instanceof Array) {
            if (one.length != other.length) return false;

            for (var i = 0; i < one.length; i++) {
                if (!this.isEqual(one[i], other[i])) {
                    return false;
                }
            }
            return true;
        } else if (one instanceof Object && other instanceof Object) {
            for (var k in one) {
                if (one.hasOwnProperty(k) && !this.isEqual(one[k], other[k])) {
                    return false;
                }
            }
            return true;
        } else {
            return one == other;
        }
    },
    //部分比较
    isPartialEqual: function(one, other, list) {
        for (var i = 0; i < list.length; i++) {
            var k = list[i];
            if (!this.isEqual(one[k], other[k])) {
                return false;
            }
        }
        return true;
    },
    isProduction:function(){
        return (process.env["NODE_ENV"] || "") != "develop";
    },
    log: function(text) {
        if (!this.isProduction() && console && console.log) {
			//console.log(text);
        }
    },
    registerDoNothing: function() {
        if (this.isProduction()) {
             document.removeEventListener("backbutton", doNothing);
        }
    },
    unregisterDoNothing: function() {
        if (this.isProduction()) {
             document.addEventListener("backbutton", doNothing, false);
        }
    },
    isAndroid: (/android/gi).test(navigator.appVersion),
    isIPhone: (/iphone|ipad/gi).test(navigator.appVersion)
};

module.exports = systemApi;
