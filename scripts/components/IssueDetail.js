//not use for now

'use strict';

var React = require('react'),
    { PureRenderMixin } = require('react/addons'),
    { Link } = require('react-router'),
    { PropTypes } = React;

var IssueDetail = React.createClass({
  mixins: [PureRenderMixin],

  // propTypes: {
  //   issue : PropTypes.object.isRequired
  // }

render (){

  var { issue} = this.props;
  return (
		<div className='Detail'>
       		<p> hello </p>
    	</div>
   );
}
});

module.exports = IssueDetail;
