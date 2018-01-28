import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../../actions/userActions';
import * as recipeActions from '../../actions/recipeActions';
import { getUserFavorite } from '../../actions/favoriteActions';

/**
 * 
 * 
 * @class SideBar
 * @extends {React.Component}
 */
class SideBar extends React.Component {
  /**
   * Creates an instance of SideBar.
   * @param {any} props 
   * @memberof SideBar
   */
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      recipes: {}
    };
  }

  /**
   * 
   * dispatches actions that makes request to get user profile info
   * dispatches actions that makes request to get popular/most upvoted recipes
   * 
   * @method componentDidMount
   * 
   * @memberof SideBar
   * 
   * @returns {object} component
   */
  componentDidMount() {
    const userId = this.props.profile.userId;
    this.props.getUserProfile(userId);
    this.props.popularRecipes();
    this.props.getFavorite(userId);
    this.props.getUserRecipes(5, 0)
      .then(
        () => {
          this.setState({
            recipes: this.props.myRecipes.pagination
          });
        });
  }

  /**
   * 
   * @method render
   * @memberof SideBar
   * @returns {object} component
   */
  render() {
    return (
      <div className="col-md-4">
        <div className="list-group mb-3">
          <li className="list-group-item active text-center"><h5>
            {this.props.profile.fullname}</h5>
          </li>
          <Link to={'/my-recipe'} className="list-group-item">
            <i className="fa fa-cutlery" aria-hidden="true" />&nbsp;
              My Recipes
            <span className="badge badge-pill badge-info float-right">
              {this.props.myRecipes.pagination.totalCount}</span></Link>

          <Link to={'/my-favorite'} className="list-group-item">
            <i className="fa fa-star" aria-hidden="true" />&nbsp;
              My Favourites
            <span className="badge badge-pill badge-info float-right">
              {this.props.favorites.length}</span>
          </Link>

          <Link to={'/my-profile'} className="list-group-item">
            <i className="fa fa-user" aria-hidden="true" />&nbsp;
              My Profile
          </Link>
        </div>

        {/* TOP RECIPE  */}
        <ul className="list-group mb-3">
          <li className="list-group-item active text-center">
            <h5>Popular Recipes</h5></li>
          {
            this.props.viewRecipes.map((popular) => {
              const newDate = new Date(popular.createdAt).toLocaleDateString();
              return (
                <div
                  key={popular.recipeId}
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1"><Link
                      to={`/recipe/${popular.recipeId}`}
                      className="mb-1"
                    ><strong>{popular.title}</strong></Link></h5>
                    <small className="text-muted">{newDate}</small>
                  </div>
                  <p className="mb-1"> {
                    popular.description.split(' ')
                      .splice(0, 15)
                      .join(' ')
                      .concat(' ...')
                  }
                  </p>
                </div>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

SideBar.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  popularRecipes: PropTypes.func.isRequired,
  getFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  profile: PropTypes.shape({
    fullname: PropTypes.string,
    userId: PropTypes.string,
    publicUrl: PropTypes.string,
  }).isRequired,
  viewRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUserRecipes: PropTypes.func.isRequired,
  myRecipes: PropTypes.shape({
    pagination: PropTypes.shape({
      totalCount: PropTypes.number,
    }),
    recipes: PropTypes.array
  }).isRequired,
};


const mapStateToProps = state => ({
  profile: state.user,
  viewRecipes: state.popularRecipes,
  myRecipes: state.getRecipe,
  favorites: state.favorite
});

const mapDispatchToProps = dispatch => ({
  getUserProfile: Id => dispatch(userActions.getUserProfile(Id)),
  popularRecipes: () => dispatch(recipeActions.getPopularRecipes()),
  getUserRecipes: (limit, offset) => dispatch(
    recipeActions.getUserRecipes(limit, offset)
  ),
  getFavorite: Id => dispatch(getUserFavorite(Id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
