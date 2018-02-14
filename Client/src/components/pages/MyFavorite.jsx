import React from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addToFavorites,
  searchUserFavorite,
  getUserFavorite } from '../../actions/favoriteActions';
import Header from './Header';
import SideBar from './SideBar';

/**
 * @class MyFavoriteRecipe
 *
 * @extends {React.Component}
 */
class MyFavoriteRecipe extends React.Component {
  /**
   * @param {any} props
   *
   * @memberof MyFavoriteRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      category: 'Soup',
      isLoading: true,
      isSearching: false,
      searchString: ''
    };
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onKeyPressEnter = this.onKeyPressEnter.bind(this);
  }

  /**
   * @description life cycle method called before component mounts the DOM
   *
   * @method componentWillMount
   *
   * @memberof MyFavopriteRecipe
   *
   * @returns { object } fetches users favorite recipes
   */
  componentWillMount() {
    const userId = this.props.user.userId;
    this.props.getFavorite(userId).then(
      () => {
        this.setState({
          isLoading: false
        });
      });
  }

  /**
   * @description update component state when user searches
   *
   * @param {any} event
   *
   * @memberof MyFavoriteRecipe
   *
   * @returns {void}
   */
  onInputChange(event) {
    this.setState({
      isSearching: true,
      searchString: event.target.value
    });
  }

  /**
   * @description update component state when user press Enter key to search
   *
   * @param {any} event
   *
   * @memberof MyFavoriteRecipe
   *
   * @returns {array} recipes
   */
  onKeyPressEnter(event) {
    if (event.key === 'Enter') {
      const limit = 5;
      const offset = 0;
      this.props.searchFavorites(
        limit, offset, this.state.searchString).then(() => {
        this.setState({
          isLoading: false });
      },
      (err) => {
        toastr.error(err.response.data.message);
      });
    }
  }

  /**
   * @description remove recipe among user favorite list
   *
   * @param {any} recipe
   *
   * @memberof MyFavoriteRecipe
   *
   * @returns {void}
   */
  deleteRecipe(recipe) {
    const recipeId = recipe.recipeId;
    const category = {
      category: this.state.category
    };
    return () => {
      this.props.deleteFavorite(recipeId, category).then(
        () => {},
        error => toastr.error(error.response.data.message)
      );
    };
  }

  /**
   * @description renders component to the DOM
   *
   * @memberof MyFavoriteRecipe
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
            <Link className="breadcrumb-item" to={'/recipe-box'} >Home</Link>
            <span className="breadcrumb-item active">My Favorite Recipes </span>
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
                  value={this.state.searchString}
                  onInput={this.onInputChange}
                  onKeyPress={this.onKeyPressEnter}
                  className="form-control"
                  type="text"
                  placeholder="Filter By Category..."
                />
                <br />
                {
                  this.state.isLoading ?
                    <div className="loader" /> :
                    <table className="table table-hover">
                      <tbody>
                        <tr>
                          <th>Title</th>
                          <th> Category</th>
                          <th>Created</th>
                          <th />
                        </tr>
                        {
                          !isEmpty(this.props.favoriteData) ?
                            this.props.favoriteData.map((favorites) => {
                              const newDate = new Date(favorites.createdAt)
                                .toDateString();
                              return (
                                <tr key={favorites.recipeId}>
                                  <td style={{
                                    wordWrap: 'break-word',
                                    minWidth: '160px',
                                    maxWidth: '160px',
                                    whiteSpace: 'normal' }}
                                  >
                                    <Link to={`/recipe/${favorites.recipeId}`}>
                                      {favorites.Recipe.title}
                                    </Link></td>
                                  <td>{favorites.category}</td>
                                  <td>{newDate}</td>
                                  <td><Link
                                    id="deleteFav"
                                    onClick={this.deleteRecipe(favorites)}
                                    to="#"
                                    title="Delete"
                                    data-toggle="modal"
                                    data-target="#delete"
                                  >
                                    <i
                                      className="fa fa-trash text-danger"
                                      aria-hidden="true"
                                    /></Link></td>
                                </tr>
                              );
                            }) :
                            <tr>
                              <td>None</td>
                              <td>None</td>
                              <td>None</td>
                            </tr>
                        }

                      </tbody>
                    </table>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

MyFavoriteRecipe.propTypes = {
  getFavorite: PropTypes.func.isRequired,
  favoriteData: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchFavorites: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string,
  }).isRequired,
  deleteFavorite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favoriteData: state.favorite,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getFavorite: Id => dispatch(getUserFavorite(Id)),
  deleteFavorite: (recipeId, category) => dispatch(
    addToFavorites(recipeId, category)),
  searchFavorites: (limit, offset, searchString) => dispatch(
    searchUserFavorite(limit, offset, searchString))
});

export { MyFavoriteRecipe as PureFavorite };
export default connect(mapStateToProps, mapDispatchToProps)(MyFavoriteRecipe);
