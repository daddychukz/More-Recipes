import React from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as favoriteActions from '../../actions/favoriteActions';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

/**
 * 
 * 
 * @class MyRecipe
 * @extends {React.Component}
 */
class MyFavoriteRecipe extends React.Component {
  /**
   * Creates an instance of MyRecipe.
   * @param {any} props 
   * @memberof MyRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      Category: 'Soup',
      isLoading: true,
      isSearching: false,
      searchString: ''
    };
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onKeyPressEnter = this.onKeyPressEnter.bind(this);
  }

  /**
   * dispatch actions that make requests to get all favorite recipe of a user
   * @method componentWillMount
   * @memberof MyRecipe
   * @returns {void}
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
   * 
   * 
   * @param {any} event 
   * @memberof RecipeBox
   * @returns {object} recipes
   */
  onInputChange(event) {
    this.setState({
      isSearching: true,
      searchString: event.target.value
    });
  }

  /**
   * 
   * 
   * @param {any} event 
   * @memberof MyFavoriteRecipe
   * 
   * @returns {object} recipes
   */
  onKeyPressEnter(event) {
    if (event.key === 'Enter') {
      const limit = 5;
      const offset = 0;
      this.props.searchFavorites(limit, offset, this.state.searchString).then(() => {
        this.setState({
          isLoading: false });
      },
      (err) => {
        toastr.error(err.response.data.message);
      });
    }
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
    const category = {
      Category: this.state.Category
    };
    return () => {
      this.props.deleteFavorite(recipeId, category).then(
        () => {
          toastr.success(`Recipe successfully removed from Favorites`);
        },
        (error) => toastr.error(error.response.data.message
        ));
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
              <div className="col-md-8" id="display">
                <input
                  value={this.state.searchString}
                  onInput={this.onInputChange}
                  onKeyPress={this.onKeyPressEnter}
                  className="form-control"
                  type="text"
                  placeholder="Filter By Category..."/>
                <br/>
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
                            this.props.favoriteData.map(data => {
                              const newDate = new Date(data.createdAt).toDateString();
                              return (
                                <tr key={data.recipeId}>
                                  <td><Link to={`/recipe/${data.recipeId}`}>
                                    {data.Recipe.title}
                                  </Link></td>
                                  <td>{data.category}</td>
                                  <td>{newDate}</td>
                                  <td><Link onClick={this.deleteRecipe(data)}
                                    to="#" title="Delete" data-toggle="modal"
                                    data-target="#delete">
                                    <i className="fa fa-trash text-danger"
                                      aria-hidden="true" /></Link></td>
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

        <Footer />
      </div>
    );
  }
}

MyFavoriteRecipe.propTypes = {
  getFavorite: PropTypes.func.isRequired,
  favoriteData: PropTypes.array.isRequired,
  searchFavorites: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteFavorite: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  favoriteData: state.favorite,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getFavorite: (Id) => dispatch(favoriteActions.getUserFavorite(Id)),
  deleteFavorite: (recipeId, category) => dispatch(favoriteActions.addToFavorites(recipeId, category)),
  searchFavorites: (limit, offset, searchString) => dispatch(favoriteActions.searchUserFavorite(limit, offset, searchString))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFavoriteRecipe);
