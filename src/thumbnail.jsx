var React = require('react');     // Require modules installed via NPM
                                  // NPM modules have unique names so just specifying name works
var Badge = require('./badge');   // Require modules which you built, however, requires path to the file
                                  // specifying the module
module.exports = React.createClass({
  render: function() {
    return <div className="col-sm-6 col-md-4">
      <div className="thumbnail">
        <img src={this.props.imageUrl} alt="..."></img>
        <div className="caption">
          <h3>{this.props.header}</h3>
          <p>{this.props.description}</p>
          <p>
            <Badge title={this.props.title} number={this.props.number} />
          </p>
        </div>
      </div>
    </div>
  }
});