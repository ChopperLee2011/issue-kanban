const React = require('react'),
    ItemTypes = require('./ItemTypes'),
    Issue = require('./Issue'),
    BoardActionCreators = require('../actions/BoardActionCreators'),
    {DragDropMixin} = require('react-dnd');

let itemDropTarget = {
    acceptDrop(component, ticket) {
        BoardActionCreators.updateIssue(ticket.index, 'new Column');
    }

};

let Column = React.createClass({
    mixins: [DragDropMixin],

    statics: {
        configureDragDrop(register) {
            register(ItemTypes.ITEM, {
                dropTarget: itemDropTarget
            });
        }
    },

    render() {
        const dropState = this.getDropState(ItemTypes.ITEM);
        let {ticket} = this.props;
        let backgroundColor = '#222';
        if (dropState.isHovering) {
            backgroundColor = 'darkgreen';
        } else if (dropState.isDragging) {
            backgroundColor = 'darkkhaki';
        }
        ticket = ticket || {};

        return (
            <div {...this.dropTargetFor(ItemTypes.ITEM)}>
                <h3> new Column </h3>
                {dropState.isHovering ?
                    'Release to drop' :
                    'Drag item here'
                }
                <Issue key={ticket.title} issue={ticket}/>
            </div>
        );
    }
});

module.exports = Column;