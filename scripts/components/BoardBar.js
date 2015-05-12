'use strict';

var React = require('react'),
    LinkedStateMixin = require('react/lib/LinkedStateMixin'),

    { PureRenderMixin } = require('react/addons'),
    { Link } = require('react-router'),
    { PropTypes } = React;

var BoardBar = React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        board: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    },
    getBoardAvatar(owner, user){
        var avatar_url = '';
        if (user.username.toLowerCase() === owner.toLowerCase()) {
            avatar_url = user.avatar_url
        }
        else {
            user.orgs.forEach(function (org) {
                if (owner.toLowerCase() === org.login.toLowerCase()) {
                    avatar_url = org.avatar_url
                }
            });
        }
        return avatar_url;
    },
    render() {
        var { board,user } = this.props;
        return (
            <div>
                <Link to='board' params={{username:board.owner,boardname:board.name,boardId:board.name}}>
                    <h3>
                        <img className='avatar' src={this.getBoardAvatar(board.owner,user)} alt={board.owner} width='30'
                             height='30'/>
                        <strong>{board.name}</strong>
                        <small><i>{board.description }</i></small>
                    </h3>
                </Link>
            </div>
        );
    }
});

module.exports = BoardBar;
