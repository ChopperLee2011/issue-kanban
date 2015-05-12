'use strict';

const React = require('react'),
    Column = require('./Column');

const ColumnSet = React.createClass({
    render(){
        return (
            <div>
                <div style={{ marginTop: '2rem' }}>
                </div>
                <Column />
            </div>
        );
    }
});

module.exports = ColumnSet;