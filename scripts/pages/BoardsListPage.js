const React = require('react'),
    User = require('../components/User'),
    BoardBar = require('../components/BoardBar'),
    RepoBar = require('../components/RepoBar'),
    BoardAddForm = require('../components/BoardAddForm'),
    RepoActionCreators = require('../actions/RepoActionCreators'),
    BoardActionCreators = require('../actions/BoardActionCreators'),
    AuthActionCreators = require('../actions/AuthActionCreators'),
    ListStore = require('../stores/ListStore'),
    RepoStore = require('../stores/RepoStore'),
    AuthStore = require('../stores/AuthStore'),
    createStoreMixin = require('../mixins/createStoreMixin'),
    _ = require('lodash'),
    { PropTypes } = React;


let BoardsListPage = React.createClass({
    mixins: [createStoreMixin(ListStore, RepoStore)],

    propTypes: {
        user: PropTypes.object.isRequired
    },
    //getInitialState: function(){
    //    return { searchString: '' };
    //},

    getStateFromStores(props) {
        var
            repos = ListStore.get().repos,
            boards = ListStore.get().boards,
            user = AuthStore.get();
        return {
            boards: boards,
            repos: repos,
            user: user,
            searchString: "",
            showAdd: false
        };
    },

    componentDidMount() {
        this.getList(this.props);

    },

    componentWillReceiveProps(nextProps) {
        // console.log('nextProps is : ' + nextProps);
        // this.setState(this.getStateFromStores(nextProps));
        // this.getList(nextProps);
    },

    getList() {
        BoardActionCreators.requestBoardList(this.props.user.username);
    },
    handleChange(e){
        this.setState({searchString: e.target.value});
    },
    _showAdd(){
        this.setState({showAdd: !this.state.showAdd});
    },

    render() {
        var { repos,boards,user,searchString} = this.state;
        if (searchString.length > 0) {
            boards = boards.filter(function (b) {
                return b.name.toLowerCase().match(searchString);
            });
            repos = repos.filter(function (r) {
                return r.name.toLowerCase().match(searchString);
            });
        }
        if (_.isEmpty(boards)) {
            return (
                <div>
                    <div id='header'>
                        <h2> Selete a board or a repo </h2>
                    </div>
                    <div id='control'>
                        <input placeholder='Find by name' value={this.state.searchString} onChange={this.handleChange}/>
                        <button onClick={this._showAdd}> ADD A BOARD</button>
                        {this.state.showAdd ? <BoardAddForm repos={repos}/> : null}

                    </div>
                    <div> loading</div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div id='header'>
                        <h2> Selete a board or a repo </h2>
                    </div>
                    <div id='control'>
                        <input placeholder='Find by name' value={this.state.searchString} onChange={this.handleChange}/>
                        <button onClick={this._showAdd}> ADD A BOARD</button>
                        {this.state.showAdd ? <BoardAddForm repos={repos}/> : null}

                    </div>
                    <div id='boards'>
                        <h2>Boards </h2>
                        {boards.map(function (board) {
                            return <BoardBar key={board._id} board={board} user={user}/>
                        })}
                        <p> View all boards </p>
                    </div>
                    <div id='repos'>
                        <h2>Respositories </h2>
                        {repos.map(function (repo) {
                            return <RepoBar key={repo.id} repo={repo}/>
                        })}
                        <p> View all repositories</p>
                    </div>
                </div>
            );
        }
    }
});

module.exports = BoardsListPage;
