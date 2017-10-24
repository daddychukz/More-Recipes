import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as recipeActions from '../../actions/recipeActions';
import InlineError from '../messages/InlineError';

class RecipeForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            title: '',
            description: '',
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        this.props.addRecipe(this.state)
        .then(
            () => {},
            (err) => this.setState({ errors: err.response.data, isLoading: false })
    );
    }
    
    render() {
        const { errors } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="text-dark">Recipe Title</label>
                        <input 
                            value={this.state.title}
                            onChange={this.onChange}
                            type="text" 
                            name="title"
                            className="form-control" 
                            required />
                    </div>
                    <div className="form-group">
                        <label className="text-dark">Recipe Description</label>
                        <textarea 
                            value={this.state.description}
                            onChange={this.onChange}
                            name="description"
                            rows='6'
                            className="form-control" 
                            required ></textarea>
                    </div>
                    <div className="form-group">
                        <label className="text-dark">Upload Image</label>
                        <input type="file" className="form-control-file" id="imgFile" aria-describedby="fileHelp" />
                        <small id="fileHelp" className="form-text text-muted">Please upload an example image of recipe for better reviews.</small>
                        {errors.message && <InlineError text={errors.message}/>}
                    </div>
                    <button type="submit" className="btn btn-info">Post Recipe</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        Recipes: state.recipe
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // actions: bindActionCreators(userActions, dispatch)
        addRecipe: recipe => dispatch(recipeActions.addRecipe(recipe))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm);