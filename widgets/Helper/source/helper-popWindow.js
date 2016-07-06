
var $ = require('jquery');

var popWindow = {
    _default:{
        url:'',
        title:'',
        width:650,
        height:380,
        ondestroy:null,
        onload:null,
        getWindowObj:function(){
            return popWindow.settings._popWindowObj;
        },
        _popWindowObj: null,
        _CloseOwnerWindow:function(action){
            popWindow.settings.ondestroy(action);//执行销毁页面前的监听
            popWindow.settings._popWindowObj.close();
        }
    },
    open:function(option) {
        this.settings = $.extend(true, {}, this._default, option);

        var windowWidth = this.settings.width;
        var windowHeight = this.settings.height;
        var left = (window.screen.availWidth - 10 - windowWidth) / 2;
        var top = (window.screen.availHeight - 20 - windowHeight) / 2;
        var strWindowFeatures = "menubar=no,location=no,resizable=no,scrollbars=no,status=no";
        this.settings._popWindowObj = window.open(this.settings.url, this.settings.title
            , 'top='+top+',left='+left+',width=' + windowWidth + ',height=' + windowHeight+','+strWindowFeatures);
        this.settings._popWindowObj.CloseOwnerWindow = this.settings._CloseOwnerWindow;
        this.settings._popWindowObj.onload = this.settings.onload;
    }

}


var helper = {
    openWindow: function(opiton){
        popWindow.open(opiton);
    }
};

module.exports = helper;

