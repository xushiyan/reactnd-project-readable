import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, updatePostVoteScore } from '../actions';


class PostPreview extends Component {
    onClickEdit() {

    }

    onClickDelete() {

    }

    onClickChangeVoteScore(event) {
        const { post } = this.props;
        this.props.updatePostVoteScore(post.id, event.target.value);
    }

    showPost(post) {
        return (
            <div>
                <button>Edit</button>
                <button>Delete</button>
                <Link to={`/${post.category}/${post.id}`} className='btn btn-link'>{post.title}</Link>
                <h4>{post.author}</h4>
                <button onClick={this.onClickChangeVoteScore.bind(this)} value='upVote'>↑</button>
                <button onClick={this.onClickChangeVoteScore.bind(this)} value='downVote'>↓</button>
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
