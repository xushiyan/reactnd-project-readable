import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, updatePostVoteScore, deletePost, updatePost } from '../actions';
import CommentsList from './comments_list';
import PostPreview from './post_preview';
import Voter from './voter';
import Toolbar from './toolbar';
import Modal from 'react-modal';
import PostForm from './post_form';


class PostDetail extends PostPreview {
    state = {
        postFormModalOpen: false,
        editingPost: null
    }

    openPostFormModal(editingPost) {
        this.setState({
            postFormModalOpen: true,
            editingPost
        });
    }

    closePostFormModal() {
        this.setState({
            postFormModalOpen: false,
            editingPost: null
        });
    }

    componentDidMount() {
        const { post_id } = this.props.match.params;
        this.props.getPost(post_id);
    }

    onDeletePost(postId) {
        this.props.deletePost(postId, () => {
            this.props.history.push('/');
        });
    }

    showPost(post, numComments) {
        const { postFormModalOpen, editingPost } = this.state;
        return (
            <div>
                <Modal
                    isOpen={postFormModalOpen}
                    onRequestClose={this.closePostFormModal.bind(this)}
                    contentLabel='Edit post'
                    ariaHideApp={false}>
                    <PostForm post={editingPost} doneSubmit={this.closePostFormModal.bind(this)} />
                </Modal>
                <Toolbar
                    businessObject={post}
                    onEdit={this.openPostFormModal.bind(this)}
                    onDelete={this.onDeletePost.bind(this)} />
                <h2>{post.title}</h2>
                <h4>Posted by {post.author}</h4>
                <p>{post.body}</p>
                <Voter businessObject={post} updateVoteScore={this.props.updatePostVoteScore} />
                <p>{post.voteScore} votes</p>
                <p>{numComments} comments</p>
            </div>
        );
    }

    render() {
        const { post, numComments } = this.props;
        if (!post)
            return <div>404 Page not Found</div>

        return (
            <div>
                <Link to='/'>Back to All Posts</Link>
                <br />
                <Link to={`/${post.category}`}>Back to Posts in {post.category}</Link>
                {this.showPost(post, numComments)}
                <CommentsList postId={post.id} />
            </div>
        );
    }
}

const mapStateToProps = ({ posts, activePostComments }, ownProps) => {
    const post = posts[ownProps.match.params.post_id];
    const numComments = _.size(activePostComments);
    return { post, numComments };
};
export default connect(mapStateToProps, { getPost, updatePostVoteScore, deletePost, updatePost })(PostDetail);
