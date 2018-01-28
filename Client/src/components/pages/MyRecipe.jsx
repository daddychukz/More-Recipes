import React from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from '../services/UltimatePagination';
import * as recipesActions from '../../actions/recipeActions';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import DeleteRecipeModal from '../modals/DeleteRecipeModal';
import EditRecipeModal from '../modals/EditRecipeModal';

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
            isLoading: false,
            pagination: {
              ...this.state.pagination,
              totalPages: this.props.recipes.pagination.pageCount,
            }
          });
        })
      .catch(() => {});
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
    const recipe = {
      imageUrl: this.state.imageUrl,
      publicId: this.state.publicId,
      Title: this.state.Title,
      Description: this.state.Description,
    };
    this.props.updateRecipe(recipeID, recipe).then(
      () => {
        toastr.success('Recipe Updated Successfully');
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
        .catch(() => {});
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
      publicId: recipe.publicId,
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
      this.setState({ imageUrl: result[0].secure_url, publicId: result[0].public_id });
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
                <input
                  className="form-control"
                  type="text"
                  placeholder="Filter Recipes..."
                />
                <br />
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
                          !isEmpty(this.props.recipes.recipes) ?
                            this.props.recipes.recipes.map((recipe) => {
                              const newDate = new Date(recipe.createdAt)
                                .toDateString();
                              return (
                                <tr key={recipe.recipeId}>
                                  <td>
                                    <Link to={`/recipe/${recipe.recipeId}`}>
                                      {recipe.title}
                                    </Link>
                                  </td>
                                  <td>{newDate}</td>
                                  <td>
                                    <Link
                                      onClick={this.editRecipe(recipe)}
                                      to="#"
                                      data-toggle="modal"
                                      title="Edit"
                                      data-target="#editRecipe"
                                    >
                                      <i
                                        className="fa fa-pencil"
                                        aria-hidden="true"
                                      />&nbsp;
                                    </Link>
                                    <Link
                                      to="#"
                                      title="Delete"
                                      data-toggle="modal"
                                      data-target="#delete-recipe"
                                    >
                                      <i
                                        className="fa fa-trash text-danger"
                                        aria-hidden="true"
                                      />
                                    </Link>
                                    <EditRecipeModal
                                      Title={this.state.Title}
                                      onChange={this.onChange}
                                      Description={this.state.Description}
                                      publicId={this.state.publicId}
                                      uploadWidget={this.uploadWidget}
                                      onSubmit={this.onSubmit}
                                    />
                                    <DeleteRecipeModal onClick={this.deleteRecipe(recipe)} />
                                  </td>
                                </tr>
                              );
                            }) :
                            <tr>
                              <td>None</td>
                              <td>None</td>
                            </tr>
                        }

                      </tbody>
                    </table>
                }
                <br />
                {
                  this.props.recipes.pagination.totalCount > 5 ?
                    <Pagination
                      pagination={{ ...this.state.pagination }}
                      currentPage={this.state.currentPage}
                      onChange={this.onPageChange}
                    /> :
                    <div />
                }
              </div>

            </div>
          </div>
        </section>

        <Footer />

      </div>
    );
  }
}

MyRecipe.propTypes = {
  recipes: PropTypes.shape({
    pagination: PropTypes.shape({
      totalCount: PropTypes.number,
      pageCount: PropTypes.number
    }),
    recipes: PropTypes.array
  }).isRequired,
  getUserRecipes: PropTypes.func.isRequired,
  deleteUserRecipe: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recipes: state.getRecipe,
});

const mapDispatchToProps = dispatch => ({
  getUserRecipes: (limit, offset) => dispatch(
    recipesActions.getUserRecipes(limit, offset)
  ),
  updateRecipe: (recipeID, recipe) => dispatch(
    recipesActions.updateUserRecipe(recipeID, recipe)
  ),
  deleteUserRecipe: recipeId => dispatch(
    recipesActions.deleteUserRecipe(recipeId)
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipe);
