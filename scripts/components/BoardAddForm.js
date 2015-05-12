'use strict';

var React = require('react'),
    //ReactTagsInput = require('react-tagsinput'),
    BoardActionCreators = require('../actions/BoardActionCreators'),
    { PureRenderMixin } = require('react/addons'),
    { PropTypes } = React;

var Input = require('react-bootstrap').Input;
var BoardAddForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    propTypes: {
        repos: PropTypes.array.isRequired,
        name: PropTypes.string,
        description: PropTypes.string,
        owner: PropTypes.string,
        selectedRepos: PropTypes.string
    },
    _createBoard: function (e) {
        e.preventDefault();
        console.info('this.state', this.state);
        BoardActionCreators.createBoard(this.state);
    },
    updateBoardInfo: function (field, e) {
        var nextState = {};
        //TODO: add validation method here
        nextState[field] = e.target.value;
        this.setState(nextState)
    },
    handleSelectRepo(){
        this.setState({
            selectedRepos: this.refs.selectedRepos.getValue()
        });
    },
    getInitialState: function () {
        return {
            name: null,
            description: null,
            owner: null,
            selectedRepos: []
        }
    },
    //TODO: crate tag components with auto complete
    //getInitialState: function () {
    //    return {
    //        tags: []
    //        , completions: []
    //        , selectedRepos: []
    //    }
    //},

    //complete: function (value) {
    //    value = value.toLowerCase();
    //    if (value === "") {
    //        return this.setState({
    //            completions: []
    //        });
    //    }
    //    this.setState({
    //        completions: presidents.filter(function (comp) {
    //            var norm = comp.toLowerCase();
    //            return norm.substr(0, value.length) == value && this.state.tags.indexOf(comp) == -1;
    //        }.bind(this))
    //    });
    //},
    //transform: function (tag) {
    //    if (this.state.completions.length === 1) {
    //        return this.state.completions[0];
    //    }
    //},
    //validate: function (tag) {
    //    return this.state.completions.indexOf(tag) > -1;
    //},
    //change: function (tags) {
    //    this.setState({
    //        tags: tags
    //        , completions: []
    //    });
    //},
    render() {
        var { repos } = this.props;
        //var { name , description , selectedRepos } = this.state;
        //var completionNodes = this.state.completions.map(function (comp) {
        //    var add = function (e) {
        //        this.refs.tags.addTag(comp);
        //    }.bind(this);
        //    return React.createElement("span", {}, React.createElement("a", {
        //        className: "president",
        //        onClick: add
        //    }, comp), " ");
        //}.bind(this));
        //var tagsInputProps = {
        //    ref: "tags",
        //    value: this.state.tags,
        //    onChange: this.change,
        //    onChangeInput: this.complete,
        //    transform: this.transform,
        //    validate: this.validate,
        //    addOnBlur: false,
        //    placeholder: "President"
        //};
        //return (
        //    React.createElement("div", null,
        //        React.createElement(ReactTagsInput, tagsInputProps),
        //        React.createElement("div", { style: { marginTop: "10px" } }, completionNodes)
        //    )
        //);

        //var { repos } = this.props;
        return (
            <div id='addBoardForm'>
                <form onSubmit={this._createBoard}>
                    <Input
                        type="text"
                        placeholder="Board Owner"
                        label="Board Owner "
                        ref="boardOwner"
                        onChange={this.updateBoardInfo.bind(this, 'owner')}/>
                    <Input
                        type="text"
                        placeholder="Board Name"
                        label="Board Name "
                        ref="boardName"
                        onChange={this.updateBoardInfo.bind(this, 'name')}/>
                    <Input
                        type="textarea"
                        placeholder="Board Description"
                        label="Board Description "
                        ref="boardDescription"
                        onChange={this.updateBoardInfo.bind(this, 'description')}/>
                    <Input
                        type='select'
                        label='Repos '
                        ref='selectedRepos'
                        onChange={this.handleSelectRepo}>
                        {repos.map(function (repo) {
                            return <option value={repo.name}>{repo.name}</option>
                        })}
                    </Input>
                    <button type="submit">Add</button>
                    <button>Cancel</button>
                </form>
            </div>
        );
    }
});

module.exports = BoardAddForm;
