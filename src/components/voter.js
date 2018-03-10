import React, { Component } from 'react';


export default class Voter extends Component {

    onClickChangeVoteScore(event) {
        const { businessObject } = this.props;
        this.props.updateVoteScore(businessObject.id, event.target.value);
    }

    render() {
        return (
            <div>
                <button className='btn btn-secondary' onClick={this.onClickChangeVoteScore.bind(this)} value='upVote'>↑</button>
                <button className='btn btn-secondary' onClick={this.onClickChangeVoteScore.bind(this)} value='downVote'>↓</button>
            </div>
        );
    }
}
