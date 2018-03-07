import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, updatePostVoteScore } from '../actions';
import Voter from './voter';


class PostPreview extends Component {
    onClickEdit() {

    }

    onClickDelete() {

    }

    showPost(post) {
        return (
            <div>
                <button>Edit</button>
                <button>Delete</button>
                <Link to={`/${post.category}/${post.id}`} className='btn btn-link'>{post.title}</Link>
                <h4>{post.author}</h4>
                <Voter businessObject={post} updateVoteScore={this.props.updatePostVoteScore} />
                <p>{post.voteScore}</p>
                <p>{post.commentCount}</p>
            </div>
        );
    }

    render() {
        const { post } = this.props;
        if (!post)
            return <div>Loading post...</div>

        return this.showPost(post);
    }
}

export default connect(null, { updatePostVoteScore })(PostPreview);
