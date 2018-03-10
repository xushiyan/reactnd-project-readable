import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPostComments, addPostComment, updatePostComment, deletePostComment
} from '../actions';
import { Link } from 'react-router-dom';
import Comment from './comment';
import Modal from 'react-modal';
import Base62 from 'base62';
import md5 from 'md5';


class PostCommentsList extends Component {
    state = {
        commentFormModalOpen: false,
        editingComment: null
    }

    openCommentFormModal(editingComment) {
        this.setState({
            commentFormModalOpen: true,
            editingComment
        });
    }

    closeCommentFormModal() {
        this.setState({
            commentFormModalOpen: false,
            editingComment: null
        });
    }

    onClickNewComment(event) {
        this.openCommentFormModal(null);
    }

    onClickSubmitCommentForm(event) {
        event.preventDefault();

        const { author, body } = event.target;
        const { editingComment } = this.state;
        const { postId, addPostComment, updatePostComment } = this.props;
        if (editingComment) {
            // update post comment
            updatePostComment(editingComment.id, Date.now(), body.value);
        } else {
            // add new post comment
            const ts = Date.now();
            addPostComment({
                id: md5(postId + Base62.encode(ts)),
                parentId: postId,
                timestamp: ts,
                author: author.value,
                body: body.value
            });
        }

        this.closeCommentFormModal();
    }

    componentDidMount() {
        const { postId } = this.props;
        this.props.getPostComments(postId);
    }

    showComments() {
        const { comments } = this.props;
        if (comments.length === 0)
            return <h3>No comment.</h3>
        else
            return (
                <ul className='list-group'>
                    {
                        _.map(comments, comment => {
                            return (
                                <li className='list-group-item' key={comment.id}>
                                    <Comment
                                        comment={comment}
                                        onEditComment={this.openCommentFormModal.bind(this)}
                                        onDeleteComment={this.props.deletePostComment} />
                                </li>
                            );
                        })
                    }
                </ul>
            )
    }

    render() {
        const { commentFormModalOpen, editingComment } = this.state;
        return (
            <div>
                <button className='btn btn-primary' onClick={this.onClickNewComment.bind(this)}>New Comment</button>
                <Modal
                    isOpen={commentFormModalOpen}
                    onRequestClose={this.closeCommentFormModal.bind(this)}
                    contentLabel='Add or Edit Comment'
                    ariaHideApp={false}>
                    <form onSubmit={this.onClickSubmitCommentForm.bind(this)}>
                        {editingComment && <h3>{editingComment.author}</h3>}
                        {!editingComment && <input placeholder='author' name='author' />}
                        <input placeholder={editingComment ? editingComment.body : 'enter comment here'} name='body' />
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        <button type='button' className='btn btn-secondary' onClick={this.closeCommentFormModal.bind(this)}>Cancel</button>
                    </form>
                </Modal>
                {this.showComments()}
            </div>
        );
    }
}

const mapStateToProps = ({ activePostComments }) => {
    return {
        comments: _.orderBy(activePostComments, ['timestamp'], ['desc'])
    };
};
export default connect(mapStateToProps, {
    getPostComments,
    addPostComment,
    updatePostComment,
    deletePostComment
})(PostCommentsList);
