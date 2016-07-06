var helper = require('./source/helper-popWindow');

helper.openWindow({
    url:'./popWindow.html',
    title:'选择列表',
    width:650,
    height:380,
    ondestroy:function(action){
        if(action == 'ok'){
            var popWindow = this.getWindowObj();
            alert('select ok');
            console.log(popWindow.getWindowValue());
        }
    },
    onload: function(){
        alert("i'm popWindow!" );
    }
})
/*
 var windowObjectReference; // global variable

 windowObjectReference = window.open(
 "./table.html",
 "DescriptiveWindowName",
 "width=420,height=230,resizable,scrollbars=yes,status=1"
 );

 windowObjectReference.parentWindow = window;//为了实现弹出窗口获取父窗口对象
 */