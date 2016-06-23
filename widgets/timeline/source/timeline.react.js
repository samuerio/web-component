var React = require('react');
var Clock = require('./component/clock.react');
var Record = require('./component/record.react');

+require('./timeline.styl');

var Timeline = React.createClass({
    getInitialState:function(){
        return {
            data:this.props.data
        }
    },
    componentWillMount:function(){
        //TODO 请求数据
    },
    render:function(){
        var timePointList = this.state.data;
        var $timePointList = null;
        return(
            <div className="timeline">
                {
                    $timePointList = timePointList.map(function(timePoint,index){
                        if('clock' === timePoint.type){
                            return (<Clock key={index} data={timePoint}></Clock>);
                        }else if('record' === timePoint.type){
                            return (<Record key={index} data={timePoint}></Record>);
                        }
                    })
                }
            </div>
        );
    }
});

module.exports = Timeline;
