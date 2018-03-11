import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../actions/actions_categories';
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
                            const { name, path } = category;
                            const selected = selectedCategory && name === selectedCategory
                            return (
                                <li className='list-group-item' key={path}>
                                    <Link to={`/${path}`}>
                                        {`${name} ${selected ? '(current)' : ''}`}
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
