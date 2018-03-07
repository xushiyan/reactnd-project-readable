
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    updatePostCommentVoteScore,
} from '../actions';


class Comment extends Component {

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
export default connect(null, { updatePostCommentVoteScore })(Comment);
