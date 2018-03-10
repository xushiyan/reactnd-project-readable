import React, { Component } from 'react';


export default class Toolbar extends Component {

    onClickEdit(event) {
        const { businessObject, onEdit } = this.props;
        onEdit(businessObject);
    }

    onClickDelete(event) {
        const { businessObject, onDelete } = this.props;
        onDelete(businessObject.id);
    }

    render() {
        return (
            <div>
                <button className='btn btn-secondary' onClick={this.onClickEdit.bind(this)}>Edit</button>
                <button className='btn btn-secondary' onClick={this.onClickDelete.bind(this)}>Delete</button>
            </div>
        );
    }
}
