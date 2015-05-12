const React = require('react'),
    Router = require('react-router'),
    BoardService = require('../utils/BoardService'),
    BoardActionCreators = require('../actions/BoardActionCreators'),
    DBActionCreators = require('../actions/DBActionCreators'),
    BoardByNameStore = require('../stores/BoardByNameStore'),
    IssueStore = require('../stores/IssueStore'),
    Issue = require('../components/Issue'),
    ColumnSet = require('../components/ColumnSet'),
    createStoreMixin = require('../mixins/createStoreMixin'),
    { PropTypes } = React;

let BoardByNamePage = React.createClass({
    mixins: [createStoreMixin(BoardByNameStore), Router.State],
    statics: {
        willTransitionTo(transition, params) {
            //DBActionCreators.syncDB(transition.path);
        },
        willTransitionFrom() {
            //TO-DO: cancel the sync 
        }
    },
    propTypes: {
        user: PropTypes.object.isRequired
    },

    getBoardName() {
        return this.getParams().username.toLowerCase() + '/' + this.getParams().boardId;
    },
    getStateFromStores(props) {

        let board = BoardByNameStore.get(),
            fullName = this.getBoardName(),
            issues = IssueStore.get();

        return {
            board: board,
            issues: issues
        };
    },
    getRepos(boardName){
        let repo = BoardService.getRepos(boardName);
        return repo;

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
        BoardActionCreators.requestBoard(this.getBoardName());
        console.info('BoardByNamePage props', props);
        let repoName;
        this.getRepos(props.params.username + '/' + props.params.boardId).then((res) => {
            repoName = res;
            console.info('BoardByNamePage repoName', repoName);
            console.log(typeof repoName);
            BoardActionCreators.requestBoardIssues([{
                name: repoName,
                url: 'https://api.github.com/repos/' + props.params.username + '/' + repoName
            }]);
        });
        //BoardActionCreators.loadBoard(this.getBoardName());
    },

    render() {
        var { user }  = this.props;
        var { board,issues } = this.state;
        if (_.isEmpty(issues)) {
            return (
                <div>
                    <h1> Loading </h1>
                </div>
            );
        } else {
            console.info('board', board);
            console.info('issues', issues);
            return (
                <div>
                    {this.renderIssues()}
                </div>
            );
        }
    },
    renderBoard() {
        var { board } = this.state;

        if (board) {
            console.info('Page this.state.board', board);
            return (
                <div>
                    {this.state.board}
                </div>
            )
        }
    },
    renderIssues() {
        var issues = (this.state.issues)[0];
        console.info('Page issues', issues);
        if (!_.isEmpty(issues)) {
            return (
                <div>
                    <label>Unlabel </label>
                    {issues.map(issue =>
                            <Issue key={issue.title} issue={issue}/>
                    )}
                    <ColumnSet />
                </div>
            )
        }
    }
});

module.exports = BoardByNamePage;
