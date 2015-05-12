'use strict';

var React = require('react'),
    { PureRenderMixin } = require('react/addons'),
    { Link } = require('react-router'),
    { PropTypes } = React;

var Repo = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    repo: PropTypes.object.isRequired,
    owner: PropTypes.object.isRequired
  },
  clickEvent(){
    console.log('redirect to issue page.');
		console.log(this.state);
  },

  render() {
    var { repo, owner } = this.props;
    // console.info('repo',repo);
    // console.info('owner',owner);

    return (
      <div className='Repo'>
        <h3>
          <Link to='repo' params={{login: owner.login, name: repo.name}} onClick={this.clickEvent} >
            {repo.name}
          </Link>
				</h3>
      </div>
    );
  }
});

module.exports = Repo;
