import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPostComments
} from '../actions';
import { Link } from 'react-router-dom';
import Comment from './comment';


class PostCommentsList extends Component {
    componentDidMount() {
        const { postId } = this.props;
        this.props.getPostComments(postId);
    }

    showComments() {
        const { comments } = this.props;
        return (
            <ul className='list-group'>
                {
                    _.map(comments, comment => {
                        return (
                            <li className='list-group-item' key={comment.id}>
                                <Comment comment={comment} />
                            </li>
                        );
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <div>
                {this.showComments()}
            </div>
        );
    }
}

const mapStateToProps = ({ activePostComments }) => {
    return {
        comments: _.values(activePostComments)
    };
};
export default connect(mapStateToProps, { getPostComments })(PostCommentsList);
