'use strict';

const React = require('react'),
    Router = require('react-router'),
    Issue = require('../components/Issue'),
    Label = require('../components/Label'),
    RepoActionCreators = require('../actions/RepoActionCreators'),
    DBActionCreators = require('../actions/DBActionCreators'),
    IssueStore = require('../stores/IssueStore'),
    BoardStore = require('../stores/BoardStore'),
    createStoreMixin = require('../mixins/createStoreMixin'),
    _ = require('lodash'),
    { PropTypes } = React;

//defautl style for component
let labelStyle = {
    width: 'auto'
};

var BoardPage = React.createClass({
    mixins: [createStoreMixin( IssueStore, BoardStore),Router.State],
    statics: {
        willTransitionTo: function (transition, params) {
            DBActionCreators.syncDB(transition.path);
        },
        willTransitionFrom: function () {
            //TO-DO: cancel the sync 
        }
    },
    propTypes: {
        user: PropTypes.object.isRequired
    },
 
    getBoardName() {
        return (this.getParams().username + '/' + this.getParams().boardname).toLowerCase();
    },

    //filter issues for every label
    filterIssue(issues, labels) {
        if (issues && labels) {
            var items = [];
            // if (typeof labels === 'object') {
            //     labels = _.values(labels);
            // }

            labels.forEach(function (label) {
                var item = {};
                item.label = label;
                item.issues = issues.filter(function (issue) {
                    return issue.label == label;
                });
                items.push(item);
            });
        }
        return items;
    },
    getStateFromStores(props) {
        var fullName = this.getBoardName(),
            issues = IssueStore.get(fullName),
            labels = '' ,
            items = '' ;
            // labels = '' || BoardStore.get(fullName),
            // items = '' || this.filterIssue(issues, labels);
        return {
            issues: issues,
            labels: labels,
            items: items
        };
    },

    componentDidMount() {
        this.repoDidChange(this.props);
    },

    componentWillReceiveProps(nextProps) {
        console.log('nextProps is : ' + nextProps);
        this.setState(this.getStateFromStores(nextProps));
        this.repoDidChange(nextProps);
    },

    repoDidChange(props) {
        var fullName = this.getBoardName();
        // RepoActionCreators.requestIssue(fullName);
        // RepoActionCreators.requestLabel(fullName);
    },

    render() {
        var {user}  = this.props;
        var { issues,labels } = this.state;
        if (_.isEmpty(user)) {
            return (
                <div>
                    <h1> Loading </h1>
                </div>
            );
            // return (
            //     <div>
            //     <h2>Issues</h2>
            //         <div>
            //  {this.renderIssues()}
            //         </div>
            //         <h2>Labels</h2>
            //         <div style={labelStyle}>
            //  {this.renderLabels()}
            //         </div>
            //     </div>
            //     )
        } else {
            return (
                <div>
                    <h2>Issues</h2>
                    <div>
                        {this.renderIssues()}
                    </div>
                </div>
            );
            // return (
            //     <div>
            //         <h2>Labels</h2>
            //         <div style={labelStyle}>
            //  {this.renderBoard()}
            //         </div>
            //     </div>
            // );
        }
    },
    renderBoard() {
        var { issues,labels,items} = this.state;

        if (labels && issues && items) {
            console.info('Page this.state.labels', labels);
            console.info('Page this.state.issues', issues);
            console.info('Page this.state.items', items);
            return (
                <div>
         {this.state.items.map(function (item) {
                 return <Label key={item.label} label={item.label} issues={item.issues}/>
             }
         )}
                </div>
            )
            // return (
            //   <div>
            //      {this.state.labels.map( function(label){
            //       return <Label key={label} label={label} issue=''/>
            //      }
            //      )}
            //   </div>
            //   )
        }
    },
    // renderLabels(){
    //   if(this.state.labels){
    //     console.log(this.state.labels)
    //   return (
    //     <div>
    //        {this.state.labels.map(label =>
    //            <Label key={label} label={label} issues='' />
    //         )}
    //     </div>
    //     )
    //   }
    // },
    renderIssues() {
        console.info('Page this.state', this.state);
        if (this.state.issues) {
            console.info('Page this.state.issues', this.state.issues);

            return (
                <div>
           {this.state.issues.map(issue =>
                   <Issue key={issue.title} issue={issue}>
                   </Issue>
           )}
                </div>
            )
        }
    },

    // renderStargazers() {
    //   var fullName = this.parseFullName(),
    //       isEmpty = this.state.stargazers.length === 0,
    //       isFetching = StargazersByRepoStore.isExpectingPage(fullName),
    //       isLastPage = StargazersByRepoStore.isLastPage(fullName);

    //   return (
    //     <div>
    //       {this.state.stargazers.map(user =>
    //         <User key={user.login} user={user} />
    //       )}

    //       {isEmpty && !isFetching &&
    //         <span>None :-(</span>
    //       }

    //       {isEmpty && isFetching &&
    //         <span>Loading...</span>
    //       }

    //       {!isEmpty && (isFetching || !isLastPage) &&
    //         <button onClick={this.handleLoadMoreClick} disabled={isFetching}>
    //           {isFetching ? 'Loading...' : 'Load more'}
    //         </button>
    //       }
    //     </div>
    //   );
    // },

    handleLoadMoreClick() {
        repoDidChange(this.getBoardName());
    }
});

module.exports = BoardPage;
