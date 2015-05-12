const React = require('react'),
    {Route,Redirect,DefaultRoute,NotFoundRoute} = require('react-router'),
    App = require('./App'),
    LoginPage = require('./pages/LoginPage'),
    BoardPage = require('./pages/BoardPage'),
    BoardsListPage = require('./pages/BoardsListPage'),
    BoardByNamePage = require('./pages/BoardByNamePage'),
    NotFoundPage = require('./pages/NotFoundPage');

module.exports = (
    <Route path="/" handler={App}>
        <Route name='home' path='/board' handler={BoardsListPage}/>
        <Route name='signin' path='/signin' handler={LoginPage}/>
        <Route name='board' path='/:username/:boardId' handler={BoardByNamePage}/>
        <Route name='notfound' path='/404' handler={NotFoundPage}/>
    </Route>
);