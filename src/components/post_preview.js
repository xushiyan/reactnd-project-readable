import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, updatePostVoteScore } from '../actions/actions_posts';
import Voter from './voter';
import Toolbar from './toolbar';


class PostPreview extends Component {

    showPost(post) {
        const { onEditPost, onDeletePost, updatePostVoteScore } = this.props;
        return (
            <div>
                <Toolbar businessObject={post} onEdit={onEditPost} onDelete={onDeletePost} />
                <Link to={`/${post.category}/${post.id}`} className='btn btn-link'>{post.title}</Link>
                <h4>Posted by {post.author}</h4>
                <Voter businessObject={post} updateVoteScore={updatePostVoteScore} />
                <p>{post.voteScore} votes</p>
                <p>{post.commentCount} comments</p>
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
