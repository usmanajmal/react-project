var React = require('react');
var Reflux = require('reflux');
var ImageStore =  require('../stores/image-store');
var CommentStore = require('../stores/comment-store');
var Actions = require('../actions');
var CommentBox = require('./comment-box');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore, 'onChange'),
        Reflux.listenTo(CommentStore, 'onChange')
    ],
    getInitialState: function () {
        return {
            image: null,
            comment: null
        };
    },
    componentWillMount: function () {
        Actions.getImage(this.props.params.id);
    },
    render: function () {
        // console.log("Rendering image-detail");
        // console.log("ImageDetail Image State: %o", this.state);
        return <div className="image-detail">
            {this.state.image?  this.renderContent() : null}
        </div>
    },
    renderContent: function () {
        return <div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4>{this.state.image.title}</h4>
                </div>
                <div className="panel-body">
                    {this.renderImage()}
                </div>
                <div className="panel-footer">
                    <h5>{this.state.image.description}</h5>
                </div>
            </div>
            <h3>Comments</h3>
            {this.renderCommentBox()}
        </div>
    },
    renderCommentBox: function () {
        if (!this.state.comments) {
            console.log("No comments");
            return null;
        }
        console.log("Rendering Comment box");
        return <CommentBox comments={this.state.comments} />
    },
    renderImage: function() {
        if (this.state.image.animated) {
            return <video preload="auto" autoPlay="autoplay" loop="loop" webkit-playsinline>
                <source src={this.state.image.mp4} type="video/mp4"></source>
            </video>
        }
        else {
            return <img src={this.state.image.link} />
        }
    },
    onChange: function () {
        console.log(CommentStore.comment);
        this.setState({
            image: ImageStore.find(this.props.params.id),
            comments: CommentStore.comment
        });
    }
});