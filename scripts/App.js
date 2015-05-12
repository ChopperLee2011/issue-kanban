const React = require('react'),
    Header = require('./components/Header'),
    { RouteHandler } = require('react-router'),
    UserActionCreators = require('./actions/UserActionCreators'),
    UserStore = require('./stores/UserStore');

let App = React.createClass({
    componentDidMount() {

        //AuthActionCreators.signin();
    },

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromStores(nextProps));
    },

    getStateFromStores(props) {
        var user = UserStore.get();
        return {
            user: user
        };
    },
    render() {
        var user = this.state.user;
        //if (user) {
        //if (Object.keys(user).length > 0) {
        return (
            <div className='App'>
                <Header />
                <hr />
                <RouteHandler {...this.state} />
            </div>
        );
        //}
        //return <div />
    }
});

module.exports = App;