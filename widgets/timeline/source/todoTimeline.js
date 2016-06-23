//时间轴组件

/*
<div class="todos-collapse">
    <div class="clock">
        <span>9:00</span>
    </div>
    <div class="todo">
        <a class="todo-title-link" href="odoc/jsp/zuixingonggao/zuixingonggao_edit.jsp"
           title="到办公室开会都惊呆了的激烈的局领导点击的激烈的局领导点击的激烈的局领导点击">
            <p>到办公室开会都惊呆了的激烈的局领导点击的激烈的局领导点击的激烈的局领导点击</p>
        </a>
    </div>
    <div class="clock">
        <span>9:00</span>
    </div>
</div>*/


+require('!style!css!./todoTimeline.css');

var $ = require('jquery');

var TodoTimeline = function(option){
    this.settings = $.extend({},TodoTimeline.default,option);
    this.init();
}

$.extend(TodoTimeline,{
    default:{
        template:{
            clock:'<div class="clock"><p>9:00</p></div>',
            record:'<div class="todo"><a class="todo-title-link"><p></p></a> <div/>'
        }
    },
    prototype:{
        init:function(){
            var _self = this;

            $todoTimeline =  $('<div class="todos-collapse" />');
            var timePointList = _self.settings.data;
            if(timePointList && 0 !== timePointList.length){
                $.each(timePointList,function(index,timePoint){
                    if('clock' === timePoint.type){
                        _self._renderService()._get$clock(timePoint)
                            .appendTo($todoTimeline);
                    }
                    if('record' === timePoint.type){
                        _self._renderService()._get$record(timePoint)
                            .appendTo($todoTimeline);
                    }
                })
            };
            this.$todoTimeline = $todoTimeline;
        },
        get$todoTimeline:function(){
            return this.$todoTimeline;
        },
        _renderService:function(){
            var _self = this;
            return {
                _get$clock:function(timePoint){
                    var template = _self.settings.template.clock;
                    var $clock = $(template);
                    $clock.find('p')
                        .text(timePoint.content);
                    return $clock;
                },
                _get$record:function(timePoint){
                    var template = _self.settings.template.record;
                    var $record = $(template);
                    $record.find('a')
                        .attr('href',timePoint.link)
                        .attr('title',timePoint.content);
                    $record.find('p')
                        .text(timePoint.content);
                    return $record;
                }
            }
        }
    }
});

/*
 var todoTimeLime = new TodoTimeline({
    data:[
        {
            type:'clock',
            content:'9:00'
        },
        {
            type:'record',
            locateTime:'10:00',
            content:'到办公室开会',
            link:''
        },
        {
            type:'record',
            locateTime:'11:00',
            content:'打高尔夫',
            link:''
        },
        {
            type:'clock',
            content:'12:00'
        }

     ]
 });
    */

module.exports = TodoTimeline;