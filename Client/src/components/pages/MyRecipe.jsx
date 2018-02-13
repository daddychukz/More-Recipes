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
import DeleteRecipeModal from '../modals/DeleteRecipeModal';
import EditRecipeModal from '../modals/EditRecipeModal';

/**
 * @class MyRecipe
 *
 * @extends {React.Component}
 */
class MyRecipe extends React.Component {
  /**
   * @param {any} props
   *
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
   * @description life cycle method called after component mounts the DOM
   *
   * @memberof MyRecipe
   *
   * @returns { array } fetches recipes created by a user
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
              boundaryPagesRange: 1,
              siblingPagesRange: 2,
              limit: 5,
              offset: 0,
              totalPages: this.props.recipes.pagination.pageCount,
            }
          });
        });
  }

  /**
   * @description updates a recipe
   * @param {any} event
   *
   * @memberof MyRecipe
   *
   * @returns {object} recipes
   */
  onSubmit(event) {
    event.preventDefault();
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
   * @description handles page change
   *
   * @param {any} number
   *
   * @memberof MyRecipe
   *
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
   * @description update component state when form value changes
   *
   * @param {any} event
   *
   * @memberof MyRecipe
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} recipe
   *
   * @memberof MyRecipe
   *
   * @returns {object} recipes
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
   * @description cloudinary image widget
   *
   * @memberof MyRecipe
   *
   * @returns {void}
   */
  uploadWidget() {
    window.cloudinary.openUploadWidget({
      cloud_name: process.env.CloudName,
      upload_preset: process.env.UploadPreset,
      tags: ['daddy'] },
    (error, result) => {
      this.setState({
        imageUrl: result[0].secure_url,
        publicId: result[0].public_id });
    });
  }

  /**
   * @description deletes a recipe
   *
   * @param {any} recipe
   *
   * @returns {void}
   */
  deleteRecipe(recipe) {
    const recipeId = recipe.recipeId;
    return () => {
      this.props.deleteUserRecipe(recipeId).then(
        () => {
          toastr.success(`Recipe (${recipe.title}) deleted successfully`);
          this.setState({ pagination: {
            boundaryPagesRange: 1,
            siblingPagesRange: 2,
            limit: 5,
            offset: 0,
            totalPages: this.props.recipes.pagination.pageCount,
          }
          });
        });
    };
  }

  /**
   * @description renders component to the DOM
   *
   * @memberof MyRecipe
   *
   * @returns {JSX} JSX representation of component
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
              <div className="col-md-12 col-lg-8" id="display">
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
                          <th>Action</th>
                        </tr>
                        {
                          !isEmpty(this.props.recipes.recipes) ?
                            this.props.recipes.recipes.map((recipe) => {
                              const newDate = new Date(recipe.createdAt)
                                .toDateString();
                              return (
                                <tr key={recipe.recipeId}>
                                  <td style={{
                                    wordWrap: 'break-word',
                                    minWidth: '160px',
                                    maxWidth: '160px',
                                    whiteSpace: 'normal' }}
                                  >
                                    <Link
                                      id="title"
                                      to={`/recipe/${recipe.recipeId}`}
                                    >
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
                                    <DeleteRecipeModal
                                      onClick={this.deleteRecipe(recipe)}
                                    />
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
                      pagination={this.state.pagination}
                      currentPage={this.state.currentPage}
                      onChange={this.onPageChange}
                    /> :
                    <div />
                }
              </div>

            </div>
          </div>
        </section>
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
  recipes: state.recipeOperations,
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

export { MyRecipe as PureUserRecipe };
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipe);
