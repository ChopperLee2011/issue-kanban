const React = require('react'),
    { PureRenderMixin } = require('react/addons'),
    { Link } = require('react-router'),
    ItemTypes = require('./ItemTypes'),
    {DragDropMixin} = require('react-dnd'),
    { PropTypes } = React;

const itemDragSource = {
    beginDrag(component) {
        console.info('Issue component',component)
        return {
            item: {
                issue: component.props.issue,
                index: component._reactInternalInstance._mountIndex -1
            }
        };
    }
};

let Issue = React.createClass({
    mixins: [DragDropMixin],
    getInitialState: function () {
        return {showResults: false};
    },
    propTypes: {
        issue: PropTypes.object.isRequired
    },
    statics: {
        configureDragDrop(register) {
            register(ItemTypes.ITEM, {
                dragSource: itemDragSource
            });
        }
    },
    onClick: function () {
        this.setState({showDetail: !this.state.showDetail});
    },

    render (){
        var {issue} = this.props;

        //console.info('issue com issue', issue);
        //console.info('issue component', this._reactInternalInstance._mountIndex);
        //return (
        //    <div className='Issue' onClick={this.onClick} {...this.dragSourceFor(ItemTypes.ITEM)}>
        //        <small>
        //            {issue.title}
        //        </small>
        //    </div>
        //);
        return (
            <div className='Issue' onClick={this.onClick} {...this.dragSourceFor(ItemTypes.ITEM)}>
                <small>
                    {issue.title}
                </small>
                <div>
                    {this.state.showDetail ? <Detail issue={issue}/> : null}
                </div>
            </div>
        );
    }
});

let Detail = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        issue: PropTypes.object.isRequired
    },
    render(){
        var {issue} = this.props;

        return (
            <div className='Detail'>
                <br />

                <label> User: </label>
                {issue.user.login}
                <br />
                <label>Description:</label>
                {issue.body}
                <br />
                <label>Assignee:</label>
                { !!issue.assignee ? issue.assignee.login : 'Unassigned'}
                <br />
                <label>Column </label>
                {!!issue.column ? issue.column : 'unlabel'}
                <br />

            </div>
        )
    }
});

module.exports = Issue;
