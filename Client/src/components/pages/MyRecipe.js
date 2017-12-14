import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import * as recipesActions from '../../actions/recipeActions';
import * as reviewActions from '../../actions/reviewActions';
import * as favoriteActions from '../../actions/favoriteActions';
import Header from './Header';
import SideBar from './SideBar';
import { Footer } from './Footer';


class MyRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            recipeDetail: {},
            Title: '',
            Description: '',
            imageUrl: '',
            publicId: '',
            Category: 'Soup'
        }
        this.uploadWidget = this.uploadWidget.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
    }

    componentWillMount() {
        this.props.getUserRecipes()
        .then(
            () => {
                this.setState({ recipes: this.props.recipes })
            })
            .catch((error) => {
                console.log(error);
            })
          }

    onChange(e){
       this.setState({ [e.target.name]: e.target.value })
    }

    editRecipe(recipe) {
        return () => this.setState({
            recipeDetail: recipe,
            Title: recipe.title,
            Description: recipe.description,
            recipeId: recipe.recipeId
        })
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

    onSubmit(e) {
        e.preventDefault();
        const recipeID = this.state.recipeId
        const data = {
            imageUrl: this.state.imageUrl,
            publicId: this.state.publicId,
            Title: this.state.Title,
            Description: this.state.Description,
        }
        this.props.updateRecipe(recipeID, data).then(
            () => {
                toastr.success('Recipe Updated Successfully');
            })
        }

    deleteRecipe(recipe) {
        const recipeId = recipe.recipeId
        return () => {
            this.props.deleteUserRecipe(recipeId).then(
               () => {
                toastr.success(`Recipe (${recipe.title}) deleted successfully`)
               })
        }
    }

    render() {
        return (
            <div>
                <Header />
                
                <header id="header">
                
                </header>
                
                 {/* BREADCRUMB  */}
                <div className="container">
                    <nav className="breadcrumb">            
                        <Link className="breadcrumb-item" to={'/recipe-box'}>Home</Link>
                        <span className="breadcrumb-item active">My Recipes</span>            
                    </nav>  
                </div>
        
                 {/* MAIN SECTION  */}
                <section>
                    <div className="container">
                        <div className="row">
                            <SideBar />
        
                            {/* RECIPE CATALOG  */}
                            <div className="col-md-8" id="display">
                                <input className="form-control" type="text" placeholder="Filter Recipes..."/>
                                <br/>
                                <table className="table table-hover">
                                    <tbody>
                                        <tr>
                                            <th>Title</th>                                    
                                            <th>Created</th>
                                            <th></th>
                                        </tr>
                                        {
                                            this.state.recipes.map(data => {
                                                const newDate = new Date(data.createdAt).toDateString();
                                                console.log(data);
                                                return (
                                                    <tr key={data.recipeId}>
                                                        <td><Link to={`/recipe/${data.recipeId}`}>{data.title}</Link></td>
                                                        <td>{newDate}</td>
                                                        <td><Link onClick={this.editRecipe(data)} to="#" data-toggle="modal" title="Edit" data-target="#editRecipe"><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;</Link> <Link to="#" onClick={this.deleteRecipe(data)} title="Delete"><i className="fa fa-trash text-danger" aria-hidden="true"></i></Link></td>  
                                                    </tr>
                                                )
                                            })
                                        }
                                            
                                    </tbody>                           
                                </table>                       
                            </div>
                            
                        </div>
                    </div>
                </section>

                <Footer />

                {/* Modals */}
                <div className="modal fade text-dark" id="editRecipe">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info">
                                <h5 className="modal-title" style={{color:'rgb(255, 255, 255)'}} id="contactModalTitle">
                                    Edit Recipe
                                </h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="Title">Recipe Title</label>
                                        <input 
                                            value={this.state.Title}
                                            onChange={this.onChange}
                                            type="text" 
                                            name="Title"
                                            className="form-control"
                                            required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Description">Recipe Description</label>
                                            <textarea 
                                                value={this.state.Description}
                                                onChange={this.onChange}
                                                type="address" 
                                                name="Description"
                                                className="form-control"
                                                rows="5"
                                                required>
                                            </textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imgFile">Upload Image</label>
                                        <CloudinaryContext cloudName={`${process.env.CloudName}`}>
                                            <Image publicId={this.state.recipeDetail.publicId}>
                                                <Transformation
                                                    crop="scale"
                                                    width="100"
                                                    height="100"
                                                    dpr="auto"
                                                    responsive_placeholder="blank"
                                                />
                                            </Image>
                                        </CloudinaryContext>
                                        <input className="form-control-file" onClick={this.uploadWidget} type="button" value="Upload Image" />
                                        <small id="fileHelp" className="form-text text-muted">Please upload an example image of recipe for better reviews.</small>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit"  onClick={this.onSubmit} className="btn btn-info" data-dismiss="modal">Update</button>
                                        <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade text-dark" id="delete-recipe" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Message</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Recipe Successfully Deleted
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MyRecipe.propTypes = {
    getUserRecipes: PropTypes.func.isRequired,
    deleteUserRecipe: PropTypes.func.isRequired
  }

  function mapStateToProps(state, ownProps) {
      return {
          recipes: state.recipe,
          
      }
  }

  function mapDispatchToProps(dispatch) {
      return {
        getUserRecipes: () => dispatch(recipesActions.getUserRecipes()),
        updateRecipe: (recipeID, data) => dispatch(recipesActions.updateUserRecipe(recipeID, data)),
        deleteUserRecipe: (recipeId) => dispatch(recipesActions.deleteUserRecipe(recipeId))
      }
  }
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipe);
