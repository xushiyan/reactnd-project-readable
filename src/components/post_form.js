import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, updatePost } from '../actions';
import Base62 from 'base62';
import md5 from 'md5';


class PostForm extends Component {

    onClickSubmitForm(event) {
        event.preventDefault();
        const { title, author, body, category } = event.target;
        const { addPost, updatePost, post, doneSubmit } = this.props;
        if (post) {
            updatePost(post.id, title.value, body.value);
        } else {
            const ts = Date.now();
            addPost({
                id: md5(author.value + Base62.encode(ts)),
                timestamp: ts,
                title: title.value || 'untitled',
                author: author.value,
                body: body.value,
                category: category.value
            });
        }
        doneSubmit();
    }

    render() {
        const { post, categories, doneSubmit } = this.props;
        return (
            <form onSubmit={this.onClickSubmitForm.bind(this)}>
                <div className="input-group input-group-lg">
                    {post
                        ? <h3>Author {post.author}</h3>
                        : <input placeholder='author' name='author' />}
                    <input placeholder='title' name='title' defaultValue={post && post.title} />
                    <textarea placeholder='body' name='body' defaultValue={post && post.body} />
                    {
                        post
                            ? null
                            : <label>Category
                            <select name='category' defaultValue={post && post.category}>
                                    {
                                        categories.map(category => {
                                            return <option key={category} value={category}>{category}</option>;
                                        })
                                    }
                                </select>
                            </label>
                    }
                    <div className="input-group-btn">
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        <button type='button' className='btn btn-secondary' onClick={doneSubmit}>Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = ({ categories }, ownProps) => {
    const { post } = ownProps
    return { post, categories: _.map(categories, 'name') };
};
export default connect(mapStateToProps, { addPost, updatePost })(PostForm);
