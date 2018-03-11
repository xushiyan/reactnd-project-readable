import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPostComments, addPostComment, updatePostComment, deletePostComment
} from '../actions/actions_comments';
import { Link } from 'react-router-dom';
import Comment from './comment';
import Modal from 'react-modal';
import { uuidv4 } from '../utils';


class PostCommentsList extends Component {
    state = {
        commentFormModalOpen: false,
        editingComment: null
    }

    constructor() {
        super();
        this.openCommentFormModal = this.openCommentFormModal.bind(this);
        this.closeCommentFormModal = this.closeCommentFormModal.bind(this);
        this.onClickNewComment = this.onClickNewComment.bind(this);
        this.onClickSubmitCommentForm = this.onClickSubmitCommentForm.bind(this);
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
            addPostComment({
                id: uuidv4(),
                parentId: postId,
                timestamp: Date.now(),
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
        return (
            <ul className='list-group'>
                {
                    _.map(comments, comment => {
                        return (
                            <li className='list-group-item' key={comment.id}>
                                <Comment
                                    comment={comment}
                                    onEditComment={this.openCommentFormModal}
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
                <button className='btn btn-primary' onClick={this.onClickNewComment}>New Comment</button>
                <Modal
                    isOpen={commentFormModalOpen}
                    onRequestClose={this.closeCommentFormModal}
                    contentLabel='Add or Edit Comment'
                    ariaHideApp={false}>
                    <form onSubmit={this.onClickSubmitCommentForm}>
                        {editingComment
                            ? <h3>{editingComment.author}</h3>
                            : <input placeholder='author' name='author' />}
                        <input placeholder='enter comment here' name='body' defaultValue={editingComment && editingComment.body} />
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        <button type='button' className='btn btn-secondary' onClick={this.closeCommentFormModal}>Cancel</button>
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
