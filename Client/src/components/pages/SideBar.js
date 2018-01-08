import React from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
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
      recipes: []
    };
  }

  /**
   * 
   * dispatches actions that makes request to get user profile info
   * dispatches actions that makes request to get popular/most upvoted recipes
   * @method componentDidMount
   * @memberof SideBar
   * @returns {object} component
   */
  componentDidMount() {
    const userId = jwt.decode(localStorage.jwtToken).userId;
    this.props.getUserProfile(userId).then(
      () => {
        this.setState({ profile: this.props.profile });
      });
    this.props.popularRecipes().then(
      () => {
        this.setState({ recipes: this.props.viewRecipes });
      });
    this.props.getUserRecipes().then(
      () => this.setState({ totalRecipeCount: this.props.viewRecipes.length })
    );
    this.props.getFavorite(userId).then(
      () => this.setState({ totalFavoriteCount: this.props.favorites.favoriteRecipe.length })
    );
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
          <li className="list-group-item active text-center"><h5>{this.state.profile.fullname}</h5></li>
          <Link to={'/my-recipe'} className="list-group-item"><i className="fa fa-cutlery" aria-hidden="true" /> My Recipes <span className="badge badge-pill badge-info float-right">{this.state.totalRecipeCount}</span></Link>
          <Link to={'/my-favorite'} className="list-group-item"><i className="fa fa-star" aria-hidden="true" /> My Favourites <span className="badge badge-pill badge-info float-right">{this.state.totalFavoriteCount}</span></Link>
          <Link to={'/my-profile'} className="list-group-item"><i className="fa fa-user" aria-hidden="true" /> My Profile</Link>
        </div>

        {/* TOP RECIPE  */}
        <ul className="list-group mb-3">
          <li className="list-group-item active text-center"><h5>Popular Recipes</h5></li>
          {
            this.state.recipes.map(popular => {
              const newDate = new Date(popular.createdAt).toLocaleDateString();
              return (
                <div key={popular.recipeId} className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1"><Link to={`/recipe/${popular.recipeId}`} className="mb-1"><strong>{popular.title}</strong></Link></h5>
                    <small className="text-muted">{newDate}</small>
                  </div>
                  <p className="mb-1"> {
                    popular.description.split(" ")
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
  getUserRecipes: PropTypes.func.isRequired,
  getFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

SideBar.defaultProps = {
  viewRecipes: PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({
  profile: state.user,
  viewRecipes: state.recipe,
  favorites: state.favorite
});

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: (Id) => dispatch(userActions.getUserProfile(Id)),
  popularRecipes: () => dispatch(recipeActions.getPopularRecipes()),
  getUserRecipes: () => dispatch(recipeActions.getUserRecipes()),
  getFavorite: (Id) => dispatch(getUserFavorite(Id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
