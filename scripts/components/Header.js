'use strict';

var React = require('react'),
    LinkedStateMixin = require('react/lib/LinkedStateMixin'),
    { Navigation } = require('react-router');

var Header = React.createClass({
  mixins: [LinkedStateMixin, Navigation],

  //getInitialState() {
  //  return {
  //    loginOrRepo :''
  //    // loginOrRepo: this.props.board.login + '/' + this.props.board.boardname
  //  };
  //},

  render() {
    // return (
    //   <div>
    //   <div className='controls'>
    //     <a className='Intercom support' href='2a4fc2deafc506ebb0cb8cf3b2e47ee973dcf02e@incoming.intercom.io' ng-class='{disabled: intercom.isInit}' id='board_help'><span>Support</span></a>
    //     <a className='user'><img className='avatar' src='{loginOrRepo}' alt='Gravatar'/></a>
    //   </div>
    //   <input valueLink={this.linkState('loginOrRepo')}
    //            onKeyUp={this.handleKeyUp} />
    //   <a className='logo'><span>SweepBoard</span></a>

    //   <a className='board' valueLink={this.linkState('loginOrRepo')} onKeyUp={this.handleKeyUp}></a>

    //   <span className='settings dropdown' outside-click='dropdown.close("settings")' id='board_settings'>
    //   <a><span>Settings</span></a>
    //   <div className='options'></div>
    //   </span>

    //   <span className='activity dropdown' outside-click='dropdown.close("activity")' id='board_activity'>
    //   <a><span>Activity</span></a>
    //   <div className='options'></div>
    //   </span>
    //   <button onClick={this.handleGoListClick}>Board List</button>
    //   <button onClick={this.handleGoDemoClick}>Board Demo</button>
    //   <button onClick={this.handleGoBackClick}>Back</button>
    //   <button onClick={this.handleGoSigninClick}>Sign in</button>
    //   </div>
    // );
  return (
      <div>
      <button onClick={this.handleGoListClick}>Board List</button>
      <button onClick={this.handleGoBackClick}>Back</button>
      <button onClick={this.handleGoSigninClick}>Sign in</button>
      </div>
    );
  },

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleGoClick();
    }
  },

  handleGoClick() {
    this.transitionTo('/');
  },
  handleGoListClick(){
    this.transitionTo('/board');
  },
  handleGoBackClick(){
    this.transitionTo('/');
  },
  handleGoSigninClick(){
     this.transitionTo('/signin');   
  }
});

module.exports = Header;