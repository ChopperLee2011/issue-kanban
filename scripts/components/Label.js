'use strict';

var React = require('react'),
    { PureRenderMixin } = require('react/addons'),
    { Link } = require('react-router'),
    { PropTypes } = React;

var divStyle = {
  'borderBottomWidth': '2px',
  'borderBottomStyle': 'solid',
  'display':'inline-block',
  width: '100px'
};

var Label = React.createClass({
  mixins: [PureRenderMixin],


render (){

  var { label,issues} = this.props;
return (
    <div style={divStyle}>
      <section id={'col-' + label}>
          <header className='header'>
            <span className='title'>{label}</span>
          </header>
           {issues.map(issue =>
              <Issue key={issue.title} issue={issue}>
              </Issue>
            )}
      </section>
    </div>
   );
}
});


var Issue = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    issue : PropTypes.object.isRequired
  },
  getInitialState: function() {
      return { showResults: false };
  },
  onClick: function(){
    this.setState({showDetail : !this.state.showDetail});
  },
  render(){
      var {issue} = this.props;
    return (
      <div className='issue' onClick={this.onClick}>
        {issue.title}
      </div>
      )
    // return (
    //   <div className='issue' onClick={this.onClick}>
    //     {issue.title}
    //     <div>
    //       {this.state.showDetail ? <Detail issue={issue}/> : null}
    //     </div>
    //   </div>
    //   )
  }
});


var Detail = React.createClass({
    mixins: [PureRenderMixin],
  propTypes: {
    issue : PropTypes.object.isRequired
  },
  render(){
      var {issue} = this.props;

    return (
      <div className='Detail'>

        <br />

        <label> User: </label>
        {issue.user.login}
        <br />
        <label>Description:</label>
        {issue.body}
        <br />
        <label>Assignee:</label>
        { !!issue.assignee ? issue.assignee.login : 'Unassigned'}
        <br />
      </div>
      )
  }
});


module.exports = Label;
