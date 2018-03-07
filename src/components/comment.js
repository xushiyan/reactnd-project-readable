
import _ from 'lodash';
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

    showComment(comment) {
        return (
            <div>
                <button>Edit</button>
                <button>Delete</button>
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
