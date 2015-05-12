const React = require('react');

let AddTask = React.createClass({
    getInitialState: function() {
        return { text: "" };
    },

    handleChange: function(event) {
        this.setState({text: event.target.value});
    },

    render: function() {
        return (
            <div className="add-task">
                <input type="text"
                       value={this.state.text}
                       onChange={this.handleChange} />
                <button type="button" onClick={this.props.addTask.bind(null, this.state.text)}>
                    Add
                </button>
            </div>
        );
    }
});