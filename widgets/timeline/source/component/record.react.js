var React = require('react');

var Record = React.createClass({
    render:function(){
        var data = this.props.data;
        var content = data.content;
        var link = data.link;

        return(
            <div className="timeline-record">
                <a  href={link} title={content}>
                    <p>{content}</p>
                </a>
            </div>
        );
    }
});

module.exports = Record;