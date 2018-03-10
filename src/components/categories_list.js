import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../actions';
import { Link } from 'react-router-dom';


class CategoriesList extends Component {
    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const categories = [{ name: 'All Categories', path: '' }, ...this.props.categories];
        const { selectedCategory } = this.props;
        return (
            <div>
                <ul className='list-group'>
                    {
                        _.map(categories, category => {
                            const selected = selectedCategory && category.name === selectedCategory
                            return (
                                <li className='list-group-item' key={category.path}>
                                    <Link to={`/${category.path}`}>
                                        {`${category.name} ${selected ? '(current)' : ''}`}
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({ categories, selectedCategory }) => {
    return {
        categories: _.values(categories),
        selectedCategory
    };
};
export default connect(mapStateToProps, { getCategories })(CategoriesList);
