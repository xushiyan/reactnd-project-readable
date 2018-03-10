import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    updatePostCommentVoteScore,
} from '../actions';
import Voter from './voter';


class Comment extends Component {

    onClickChangeVoteScore(event) {
        const { comment } = this.props;
        this.props.updatePostCommentVoteScore(comment.id, event.target.value);
    }

    onClickEdit(event) {
        const { comment, onEditComment } = this.props;
        onEditComment(comment);
    }

    onClickDelete(event) {
        const { comment, onDeleteComment } = this.props;
        onDeleteComment(comment.id);
    }

    showComment(comment) {
        return (
            <div>
                <button className='btn btn-secondary' onClick={this.onClickEdit.bind(this)}>Edit</button>
                <button className='btn btn-secondary' onClick={this.onClickDelete.bind(this)}>Delete</button>
                <h4>{comment.author}</h4>
                <p>{comment.body}</p>
                <Voter businessObject={comment} updateVoteScore={this.props.updatePostCommentVoteScore} />
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
export default connect(null, { updatePostCommentVoteScore })(Comment);
