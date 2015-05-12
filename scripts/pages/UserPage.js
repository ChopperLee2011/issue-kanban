const React = require('react'),
		User = require('../components/User'),
		Repo = require('../components/Repo'),
		RepoActionCreators = require('../actions/RepoActionCreators'),
		UserActionCreators = require('../actions/UserActionCreators'),
		StarredReposByUserStore = require('../stores/StarredReposByUserStore'),
		RepoStore = require('../stores/RepoStore'),
		UserStore = require('../stores/UserStore'),
		createStoreMixin = require('../mixins/createStoreMixin'),
		DocumentTitle = require('react-document-title'),
		{ PropTypes } = React;

let UserPage = React.createClass({
	mixins: [createStoreMixin(UserStore, StarredReposByUserStore, RepoStore)],

	propTypes: {
		params: PropTypes.shape({
			login: PropTypes.string.isRequired
		}).isRequired
	},

	parseLogin(props) {
		props = props || this.props;
		return props.params.login;
	},

	getStateFromStores(props) {
		var userLogin = this.parseLogin(props),
				user = UserStore.get(userLogin),
				starred = StarredReposByUserStore.getRepos(userLogin),
				listRepo = StarredReposByUserStore.getRepos(userLogin),
				starredOwners = starred.map(repo => UserStore.get(repo.owner));

		return {
				user: user,
			starred: starred,
				listRepo: listRepo,
			starredOwners: starredOwners
		};
	},

	componentDidMount() {
		this.userDidChange();
	},

	componentWillReceiveProps(nextProps) {
		if (this.parseLogin(nextProps) !== this.parseLogin(this.props)) {
			this.setState(this.getStateFromStores(nextProps));
			this.userDidChange(nextProps);
		}
	},

	userDidChange(props) {
		var userLogin = this.parseLogin(props);

		UserActionCreators.requestUser(userLogin, ['name', 'avatarUrl']);
		RepoActionCreators.requestReposPage(userLogin, true);
	},

	render() {
		var { user, starredRepos } = this.state;

		return (
			<DocumentTitle title={ this.parseLogin() + '\'s repo'}>
				<div>
					<h1>repos list</h1>
					{this.renderRepos()}
				</div>
			</DocumentTitle>
		);
	},
renderRepos() {
		var userLogin = this.parseLogin(),
				isEmpty = this.state.starred.length === 0,
				isFetching = StarredReposByUserStore.isExpectingPage(userLogin),
				isLastPage = StarredReposByUserStore.isLastPage(userLogin);

		return (
			<div>
				{this.state.listRepo.map((repo, index) =>
					<Repo key={repo.fullName}
								repo={repo}
								owner={this.state.starredOwners[index]} />
				)}

				{isEmpty && !isFetching &&
					<span>None :-(</span>
				}

				{isEmpty && isFetching &&
					<span>Loading...</span>
				}

				{!isEmpty && (isFetching || !isLastPage) &&
					<button onClick={this.handleLoadMoreClick} disabled={isFetching}>
						{isFetching ? 'Loading...' : 'Load more'}
					</button>
				}
			</div>
		);
	},


//  renderStarredRepos() {
//    var userLogin = this.parseLogin(),
//        isEmpty = this.state.starred.length === 0,
//        isFetching = StarredReposByUserStore.isExpectingPage(userLogin),
//        isLastPage = StarredReposByUserStore.isLastPage(userLogin);
//
//    return (
//      <div>
//        {this.state.starred.map((repo, index) =>
//          <Repo key={repo.fullName}
//                repo={repo}
//                owner={this.state.starredOwners[index]} />
//        )}
//
//        {isEmpty && !isFetching &&
//          <span>None :-(</span>
//        }
//
//        {isEmpty && isFetching &&
//          <span>Loading...</span>
//        }
//
//        {!isEmpty && (isFetching || !isLastPage) &&
//          <button onClick={this.handleLoadMoreClick} disabled={isFetching}>
//            {isFetching ? 'Loading...' : 'Load more'}
//          </button>
//        }
//      </div>
//    );
//  },

	handleLoadMoreClick() {
		RepoActionCreators.requestStarredReposPage(this.parseLogin());
	}
});

module.exports = UserPage;
