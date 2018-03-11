import React from 'react';
import { connect } from 'react-redux';
import {
    updatePostCommentVoteScore,
} from '../actions/actions_comments';
import Voter from './voter';
import Toolbar from './toolbar';


const Comment = ({ comment, onEditComment, onDeleteComment, updatePostCommentVoteScore }) => {
    const onClickChangeVoteScore = (event) => {
        updatePostCommentVoteScore(comment.id, event.target.value);
    };

    if (!comment) {
        return <div>Loading comment...</div>;
    }

    return (
        <div>
            <Toolbar businessObject={comment} onEdit={onEditComment} onDelete={onDeleteComment} />
            <h4>{comment.author} says:</h4>
            <p>{comment.body}</p>
            <p>{comment.voteScore} votes</p>
            <Voter businessObject={comment} updateVoteScore={updatePostCommentVoteScore} />
        </div>
    );
};
export default connect(null, { updatePostCommentVoteScore })(Comment);
