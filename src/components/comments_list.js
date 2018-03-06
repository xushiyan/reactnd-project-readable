import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPostComments, updatePostCommentVoteScore,
} from '../actions';
import { Link } from 'react-router-dom';

class _Comment extends Component {

    onClickChangeVoteScore(event) {
        const { comment } = this.props;
        this.props.updatePostCommentVoteScore(comment.id, event.target.value);
    }

    showComment(comment) {
        return (
            <div>
                <button>Edit</button>
                <button>Delete</button>
                <h4>{comment.author}</h4>
                <p>{comment.body}</p>
                <button onClick={this.onClickChangeVoteScore.bind(this)} value='upVote'>↑</button>
                <button onClick={this.onClickChangeVoteScore.bind(this)} value='downVote'>↓</button>
                <p>{comment.voteScore}</p>
            </div>
        );
    }

    render() {
        const { comment } = this.props;
        if (!comment)
            return <div>Loading comment...</div>

        return this.showComment(comment);
    }

}
export const Comment = connect(null, { updatePostCommentVoteScore })(_Comment);

class PostCommentsList extends Component {
    componentDidMount() {
        const { postId } = this.props;
        this.props.getPostComments(postId);
    }

    render() {
        const { comments } = this.props;
        return (
            <div>
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
            </div>
        );
    }
}

const mapStateToProps = ({ activePostComments }) => {
    return {
        comments: _.values(activePostComments)
    };
};
export default connect(mapStateToProps, {
    getPostComments,
    updatePostCommentVoteScore
})(PostCommentsList);
