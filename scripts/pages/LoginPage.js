const React = require('react');

const LoginPage = React.createClass({
    loginGithub() {
        window.open('/auth/github', 'auth', [
            'menubar=0',
            'location=0',
            'resizable=0',
            'scrollbars=1',
            'status=0',
            'dialog=1',
            'width=950',
            'height=850'
        ].join(','));
    },

    loginGitlab() {
        window.open('/auth/gitlab?scope=repo', 'auth', [
            'menubar=0',
            'location=0',
            'resizable=0',
            'scrollbars=1',
            'status=0',
            'dialog=1',
            'width=950',
            'height=850'
        ].join(','));
    },

    loginBitbucket() {
        window.open('/auth/bitbucket', 'auth', [
            'menubar=0',
            'location=0',
            'resizable=0',
            'scrollbars=1',
            'status=0',
            'dialog=1',
            'width=950',
            'height=850'
        ].join(','));
    },

    render: function () {
        return (
            <div>
                <div id='modal' className='login'>
                    <header className='header'>
                        <h2>Sign in</h2>
                    </header>
                    <div className='notification warning'>We recommend you log in with access to your private
                        repositories, however you can also
                        <a href='#'>use SweepBoard for public repos
                            only.</a>
                    </div>
                    <section className='body'>
                        <div class="jumbotron text-center">
                            <p>Login or Register with:</p>
                            <a onClick={this.loginGithub} class="btn btn-primary"><span class="fa fa-github"></span>
                                Github </a>
                            <a onClick={this.loginBitbucket} class="btn btn-info"><span class="fa fa-bitbucket"></span>
                                Bitbucket </a>
                            <a onClick={this.loginGitlab} class="btn btn-info"><span class="fa fa-gitlab"></span>
                                Gitlab </a>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

});

module.exports = LoginPage;
