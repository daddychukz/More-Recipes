import React from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import Pagination from '../services/UltimatePagination';
import * as recipesActions from '../../actions/recipeActions';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import DeleteRecipeModal from '../modals/DeleteRecipeModal';

/**
 * 
 * 
 * @class MyRecipe
 * @extends {React.Component}
 */
class MyRecipe extends React.Component {
  /**
   * Creates an instance of MyRecipe.
   * @param {any} props 
   * @memberof MyRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipeDetail: {},
      Title: '',
      Description: '',
      imageUrl: '',
      publicId: '',
      Category: 'Soup',
      currentPage: 1,
      pagination: {
        totalPages: 1,
        boundaryPagesRange: 1,
        siblingPagesRange: 2,
        limit: 5,
        offset: 0,
      },
      isLoading: true
    };
    this.uploadWidget = this.uploadWidget.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  /**
   * dispatches actions that makes request get recipes created by a user
   * @returns {void}
   * @method componentWillMount
   * @memberof MyRecipe
   */
  componentDidMount() {
    const limit = this.state.pagination.limit;
    const offset = this.state.pagination.offset;
    this.props.getUserRecipes(limit, offset)
      .then(
        () => {
          this.setState({
            recipes: this.props.recipes,
            isLoading: false,
            pagination: {
              ...this.state.pagination,
              totalPages: this.props.recipes.pagination.pageCount,
            }
          });
        })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * @param {any} number
   * @memberof RecipeBox
   * @returns {object} recipes
   */
  onPageChange(number) {
    this.setState({
      currentPage: number,
      pagination: {
        totalCount: this.props.recipes.pagination.totalCount,
        totalPages: this.props.recipes.pagination.pageCount,
        limit: 5,
        offset: this.state.pagination.limit * (number - 1)
      }
    }, () => {
      const limit = this.state.pagination.limit;
      const offset = this.state.pagination.offset;

      this.props.getUserRecipes(limit, offset).then(() => {
        this.setState({ isLoading: false });
      })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  /**
   * @returns {void}
   * @method onChange
   * @param {any} e 
   * @memberof MyRecipe
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * 
   * @method editRecipes
   * @param {any} recipe 
   * @returns {object} recipes
   * @memberof MyRecipe
   */
  editRecipe(recipe) {
    return () => this.setState({
      recipeDetail: recipe,
      Title: recipe.title,
      Description: recipe.description,
      recipeId: recipe.recipeId
    });
  }

  /**
   * 
   * @returns {object} image
   * @memberof MyRecipe
   */
  uploadWidget() {
    window.cloudinary.openUploadWidget({
      cloud_name: process.env.CloudName,
      upload_preset: process.env.UploadPreset,
      tags: ['daddy'] },
    (error, result) => {
      console.log(result[0]);
      this.setState({ imageUrl: result[0].secure_url, publicId: result[0].public_id });
    });
  }

  /**
   * 
   * @returns {object} recipe
   * @param {any} e 
   * @memberof MyRecipe
   */
  onSubmit(e) {
    e.preventDefault();
    const recipeID = this.state.recipeId;
    const data = {
      imageUrl: this.state.imageUrl,
      publicId: this.state.publicId,
      Title: this.state.Title,
      Description: this.state.Description,
    };
    this.props.updateRecipe(recipeID, data).then(
      () => {
        toastr.success('Recipe Updated Successfully');
      });
  }

  /**
   * 
   * 
   * @param {any} recipe 
   * @returns {void}
   * @memberof MyRecipe
   */
  deleteRecipe(recipe) {
    const recipeId = recipe.recipeId;
    return () => {
      this.props.deleteUserRecipe(recipeId).then(
        () => {
          toastr.success(`Recipe (${recipe.title}) deleted successfully`);
          this.setState({ pagination: {
            ...this.state.pagination,
            totalPages: this.props.recipes.pagination.pageCount,
          }
          });
        });
    };
  }

  /**
   * 
   * @method render
   * @returns {object} component
   * @memberof MyRecipe
   */
  render() {
    return (
      <div>
        <Header />

        <header id="header" />

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
                {
                  this.state.isLoading ?
                    <div className="loader" /> :
                    <table className="table table-hover">
                      <tbody>
                        <tr>
                          <th>Title</th>
                          <th>Created</th>
                          <th />
                        </tr>
                        {
                          this.props.recipes.recipes.map(data => {
                            const newDate = new Date(data.createdAt).toDateString();
                            return (
                              <tr key={data.recipeId}>
                                <td><Link to={`/recipe/${data.recipeId}`}>{data.title}</Link></td>
                                <td>{newDate}</td>
                                <td><Link onClick={this.editRecipe(data)} to="#" data-toggle="modal" title="Edit" data-target="#editRecipe"><i className="fa fa-pencil" aria-hidden="true" />&nbsp;</Link> <Link to="#" onClick={this.deleteRecipe(data)} title="Delete"><i className="fa fa-trash text-danger" aria-hidden="true" /></Link></td>
                              </tr>
                            );
                          })
                        }

                      </tbody>
                    </table>
                }
                <br />
                {
                  this.state.isSearching ?
                    <Pagination
                      pagination={{ ...this.state.pagination }}
                      currentPage={this.state.currentPage}
                      onChange={this.onSearchPageChange}
                    /> :
                    <Pagination
                      pagination={{ ...this.state.pagination }}
                      currentPage={this.state.currentPage}
                      onChange={this.onPageChange}
                    />
                }
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
                <h5 className="modal-title" style={{ color: 'rgb(255, 255, 255)' }} id="contactModalTitle">
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
                      required />
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
                    <button type="submit" onClick={this.onSubmit} className="btn btn-info" data-dismiss="modal">Update</button>
                    <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <DeleteRecipeModal />
      </div>
    );
  }
}

MyRecipe.propTypes = {
  recipes: PropTypes.object.isRequired,
  getUserRecipes: PropTypes.func.isRequired,
  deleteUserRecipe: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  recipes: state.getRecipe,
});

const mapDispatchToProps = (dispatch) => ({
  getUserRecipes: (limit, offset) => dispatch(recipesActions.getUserRecipes(limit, offset)),
  updateRecipe: (recipeID, data) => dispatch(recipesActions.updateUserRecipe(recipeID, data)),
  deleteUserRecipe: (recipeId) => dispatch(recipesActions.deleteUserRecipe(recipeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipe);
