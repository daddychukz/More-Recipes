import React from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../../actions/userActions';
import * as recipeActions from '../../actions/recipeActions';

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
          <Link to={'/my-recipe'} className="list-group-item"><i className="fa fa-cutlery" aria-hidden="true" /> My Recipes <span className="badge badge-pill badge-info float-right">12</span></Link>
          <Link to={'/my-favorite'} className="list-group-item"><i className="fa fa-star" aria-hidden="true" /> My Favourites <span className="badge badge-pill badge-info float-right">20</span></Link>
          <Link to={'/my-profile'} className="list-group-item"><i className="fa fa-user" aria-hidden="true" /> My Profile</Link>
        </div>

        {/* TOP RECIPE  */}
        <ul className="list-group mb-3">
          <li className="list-group-item active text-center"><h5>Top 3 Favorite Recipes</h5></li>
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
  profile: PropTypes.object.isRequired,
  viewRecipes: PropTypes.array.isRequired
};

SideBar.defaultProps = {
};

const mapStateToProps = (state, ownProps) => ({
  profile: state.user,
  viewRecipes: state.recipe
});

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: (Id) => dispatch(userActions.getUserProfile(Id)),
  popularRecipes: () => dispatch(recipeActions.getPopularRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
