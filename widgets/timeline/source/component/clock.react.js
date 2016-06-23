var React = require('react');


var Clock = React.createClass({
    render:function(){
        return (
            <div className="timeline-clock">
                <span>{this.props.data.content}</span>
            </div>
        );
    }
});

module.exports = Clock;
