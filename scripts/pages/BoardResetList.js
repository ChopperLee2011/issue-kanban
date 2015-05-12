/**
 * Created by chopper on 3/13/15.
 */
'use strict';

var React = require('react'),
    Router = require('react-router'),
    BoardActionCreators = require('../actions/BoardActionCreators'),
    DBActionCreators = require('../actions/DBActionCreators'),
    BoardByNameStore = require('../stores/BoardByNameStore'),
    createStoreMixin = require('../mixins/createStoreMixin'),
    { PropTypes } = React;

var BoardByNamePage = React.createClass({
    mixins: [createStoreMixin(BoardByNameStore),Router.State],
    statics: {
        willTransitionTo(transition, params) {
            DBActionCreators.syncDB(transition.path);
        },
        willTransitionFrom() {
            //TO-DO: cancel the sync
        }
    },
    propTypes: {
        user: PropTypes.object.isRequired
    },

    getBoardName() {
        return this.getPath().toLowerCase();
    },
    getStateFromStores(props) {
        var board = BoardByNameStore.get();
        return {
            board: board
        };
    },

    componentDidMount() {
        this.boardDidChange(this.props);
    },

    componentWillReceiveProps(nextProps) {
        console.log('nextProps is : ' + nextProps);
        this.setState(this.getStateFromStores(nextProps));
        this.boardDidChange(nextProps);
    },

    boardDidChange(props) {
        // BoardActionCreators.requestBoard(this.getBoardName());
        BoardActionCreators.loadBoard(this.getBoardName());
    },

    render() {
        var { user }  = this.props;
        var { board } = this.state;
        console.info('user',user);
        console.info('board',board);
        if (_.isEmpty(board)) {
            return (
                <div>
                    <h1> Loading </h1>
                </div>
            );
        } else {
            return (
                <div>
                    {this.renderBoard()}
                </div>
            );
        }
    },
    renderBoard() {
        var { board } = this.state;

        if ( board ) {
            console.info('Page this.state.board', board);
            return (
                <div>
                    {this.state.board}
                </div>
            )
        }
    }
});

module.exports = BoardByNamePage;
