const React = require('react'),
    { Link } = require('react-router');

let notFoundPage = React.createClass({

	render: function() {
		return (
			<div id='notfound'>
				<img src='assets/images/caonima.gif' alt='404' />
  				<h2>Ooops, looks like the board you are looking for does not exist.</h2>
  				<p>Go back to <Link to='home'>select a board</Link>.</p>
			</div>
		);
	}

});

module.exports = notFoundPage;