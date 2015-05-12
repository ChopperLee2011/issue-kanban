'use strict';

var React = require('react'),
    { PureRenderMixin } = require('react/addons'),
    { Link } = require('react-router'),
    { PropTypes } = React;

var RepoBar = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    repo: PropTypes.object.isRequired
  },

  goToRepo(){
    return;
  },

  render() {
      var { repo } = this.props;
    return (
      <div>
        <h3 Onclick={this.goToRepo}>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} width='30' height='30' />
          <strong>{repo.full_name}</strong> <small><i>{ repo.description }</i></small>
        </h3>
    	</div>
    	);
  }
});

module.exports = RepoBar;