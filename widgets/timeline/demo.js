
//var TodoTimeline = require('./source/todoTimeline.js');
var React = require('react');
var ReactDom = require('react-dom');

var Timeline = React.createFactory(require('./source/timeline.react'));

window.onload = function(){
    ReactDom.render(Timeline({
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
    }),document.getElementById('timelineContainer'));
}
