import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    updatePostCommentVoteScore,
} from '../actions';
import Voter from './voter';
import Toolbar from './toolbar';


class Comment extends Component {

    onClickChangeVoteScore(event) {
        const { comment } = this.props;
        this.props.updatePostCommentVoteScore(comment.id, event.target.value);
    }

    showComment(comment) {
        const { onEditComment, onDeleteComment, updatePostCommentVoteScore } = this.props;
        return (
            <div>
                <Toolbar businessObject={comment} onEdit={onEditComment} onDelete={onDeleteComment} />
                <h4>{comment.author} says:</h4>
                <p>{comment.body}</p>
                <p>{comment.voteScore} votes</p>
                <Voter businessObject={comment} updateVoteScore={updatePostCommentVoteScore} />
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
export default connect(null, { updatePostCommentVoteScore })(Comment);
