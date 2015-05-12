///*
//'use strict';
//
//var React = require('react'),
//    { PureRenderMixin } = require('react/addons'),
//    { Link } = require('react-router'),
//    { PropTypes } = React;
//
//var hyperSortableBoard = React.createClass({
//        mixins: [PureRenderMixin],
//        propTypes: {
//            board: PropTypes.object.isRequired
//        },
//        componentWillReceiveProps(nextProps) {
//            console.log('nextProps is : ' + nextProps);
//            this.setState(this.getStateFromStores(nextProps));
//            this.repoDidChange(nextProps);
//        },
//        render (){
//            var { board } = this.props;
//            return (
//                {board.issues.map(function (issue) {
//                    <div>
//                        <h3>
//                            {{issue.title }}
//                            <small>#{{issue.reponame }}/{{issue.number }}</small>
//                        </h3>
//                    </div>
//                    )
//                })
//        });
//}
//
//module.exports = hyperSortableBoard;*/
