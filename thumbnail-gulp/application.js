var options = {
  thumbnailData: [{
    title: 'Show Courses',
    number: 12,
    header: 'Learn React',
    description: 'React is a fantastic new front end library for rendering web pages. React is a fantastic new front end library for rendering web pages.',
    imageUrl: 'https://raw.githubusercontent.com/wiki/facebook/react/react-logo-1000-transparent.png'
  }, {
    title: 'Show Courses',
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp will speed up your development workflow.  Gulp will speed up your development workflow.  Gulp will speed up your development workflow.',
    imageUrl: 'http://brunch.io/images/others/gulp.png'
  }]
};

var element = React.createElement(ThumbnailList, options);
React.render(element, document.querySelector('.container'));
var Badge = React.createClass({displayName: "Badge",
  render: function () {
    return dom(
      "button",
      { className: "btn btn-primary", type: "button" },
      this.props.title,
      " ",
      dom(
        "span",
        { className: "badge" },
        this.props.number
      )
    );
  }
});
var Thumbnail = require('thumbnail');

var ThumbnailList = React.createClass({displayName: "ThumbnailList",
  render: function () {
    var list = this.props.thumbnailData.map(function (thumbnailProps) {
      return dom(Thumbnail, thumbnailProps);
    });

    return dom(
      'div',
      null,
      list
    );
  }
});
var Thumbnail = React.createClass({displayName: "Thumbnail",
  render: function () {
    return dom(
      "div",
      { className: "col-sm-6 col-md-4" },
      dom(
        "div",
        { className: "thumbnail" },
        dom("img", { src: this.props.imageUrl, alt: "..." }),
        dom(
          "div",
          { className: "caption" },
          dom(
            "h3",
            null,
            this.props.header
          ),
          dom(
            "p",
            null,
            this.props.description
          ),
          dom(
            "p",
            null,
            dom(Badge, { title: this.props.title, number: this.props.number })
          )
        )
      )
    );
  }
});