import React from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
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
      favorite: []
    };
  }

  /**
   * dispatch actions that make requests to get all favorite recipe of a user
   * @method componentWillMount
   * @memberof MyRecipe
   * @returns {void}
   */
  componentWillMount() {
    const userId = jwt.decode(localStorage.jwtToken).userId;
    this.props.getFavorite(userId).then(
      () => {
        this.setState({ favorite: this.props.favoriteData.favoriteRecipe });
        console.log(this.state.favorite);
      });
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
                <input className="form-control" type="text" placeholder="Filter Recipes..."/>
                <br/>
                <table className="table table-hover">
                  <tbody>
                    <tr>
                      <th>Title</th>
                      <th>Created</th>
                      <th />
                    </tr>
                    {
                      this.state.favorite.map(data => {
                        const newDate = new Date(data.createdAt).toDateString();
                        return (
                          <tr key={data.recipeId}>
                            <td><Link to={`/recipe/${data.recipeId}`}>{data.Recipe.title}</Link></td>
                            <td>{newDate}</td>
                            <td><Link to="#" data-toggle="modal" title="Edit" data-target="#editRecipe"><i className="fa fa-pencil" aria-hidden="true" />&nbsp;</Link> <Link to="#" title="Delete" data-toggle="modal" data-target="#delete"><i className="fa fa-trash text-danger" aria-hidden="true" /></Link></td>
                          </tr>
                        );
                      })
                    }

                  </tbody>
                </table>
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
  favoriteData: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  favoriteData: state.favorite
});

const mapDispatchToProps = (dispatch) => ({
  getFavorite: (Id) => dispatch(favoriteActions.getUserFavorite(Id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFavoriteRecipe);
