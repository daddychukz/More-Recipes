import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import sha1 from 'sha1';
import axios from 'axios';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import createBrowserHistory from 'history/createBrowserHistory';
import * as recipeActions from '../../actions/recipeActions';
import InlineError from '../messages/InlineError';

const customHistory = createBrowserHistory({
    forceRefresh: true
});

class RecipeForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            Title: '',
            Description: '',
            imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
            publicId: 'home_gipmmy.jpg',
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadWidget = this.uploadWidget.bind(this);
    }

    uploadWidget() {
        window.cloudinary.openUploadWidget({ 
            cloud_name: process.env.CloudName,
            upload_preset: process.env.UploadPreset,
            tags:['daddy']},
            (error, result) => {
                console.log(result[0]),
                this.setState({ imageUrl: result[0].secure_url, publicId: result[0].public_id })
            });
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){ 
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        this.props.addRecipe(this.state)
        .then(
            () => customHistory.push('/add-recipe'),
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
                            value={this.state.Title}
                            onChange={this.onChange}
                            type="text" 
                            name="Title"
                            className="form-control" 
                            required />
                    </div>
                    <div className="form-group">
                        <label className="text-dark">Recipe Description</label>
                        <textarea 
                            value={this.state.Description}
                            onChange={this.onChange}
                            name="Description"
                            rows='6'
                            className="form-control" 
                            required ></textarea>
                    </div>
                    <div className="form-group">
                        {/* <input type="file" onChange={this.uploadFile.bind(this)} className="form-control-file" style={{ color: 'black'}} id="imgFile" aria-describedby="fileHelp" /> */}
                        <CloudinaryContext cloudName="chuks-andela32">
                            <Image publicId={this.state.publicId}>
                                <Transformation
                                    crop="scale"
                                    width="200"
                                    height="150"
                                    dpr="auto"
                                    responsive_placeholder="blank"
                                />
                            </Image>
                        </CloudinaryContext>
                        <input className="form-control-file" onClick={this.uploadWidget} type="button" value="Add Image" />
                        <small id="fileHelp" className="form-text text-muted">Please upload an example image of recipe for better reviews.</small>
                        {/* {errors.message && <InlineError text={errors.message}/>} */}
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