import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import customHistory from '../common/commonFunctions';
import { logout } from '../../actions/userActions';

/**
 * @class HeaderProfile
 *
 * @extends {React.Component}
 */
class HeaderProfile extends React.Component {
  /**
   * @description Creates an instance of MyProfile.
   *
   * @param {any} props
   *
   * @memberof HeaderProfile
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
   * @description logs out a signed in user
   *
   * @memberof HeaderProfile
   *
   * @returns {void}
   */
  logout() {
    this.props.logout().then(
      () => customHistory.push('/')
    );
  }

  /**
   * @description renders component to the DOM
   *
   * @memberof HeaderProfile
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { pathname } = window.location;

    const className = link => classNames({
      active: pathname === link,
      'nav-link': true
    });

    return (
      <div>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
          <div className="container">
            <Link to={'/recipe-box'} className="navbar-brand">
              <h3 id="logo">More-Recipes</h3></Link>
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link
                    to={'/recipe-box'}
                    className={`nav-link
                  ${pathname === '/recipe-box' && 'active'}`}
                  >Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/add-recipe'} className={className('/add-recipe')}>
                    Add Recipe
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/my-recipe'} className={className('/my-recipe')}>
                    My Recipes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={'/my-favorite'}
                    className={className('/my-favorite')}
                  >
                    Favorites
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="btn-group open">
                    <i
                      className="fa fa-user-circle fa-2x pull-right drop"
                      data-toggle="dropdown"
                      aria-hidden="true"
                    />
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to={'/my-profile'}>
                          Profile
                        </Link>
                      </li>
                      <li className="divider" />
                      <li>
                        <Link
                          id="profile-edit"
                          className="dropdown-item"
                          to="#"
                          data-toggle="modal"
                          data-target="#profileModal"
                        >
                          Edit Profile
                        </Link></li>
                      <li>
                        <Link
                          className="dropdown-item logOut"
                          to={'/'}
                          onClick={this.logout}
                        >
                          Logout
                        </Link></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}


HeaderProfile.propTypes = {
  logout: PropTypes.func.isRequired
};

export { HeaderProfile as PureHeader };
export default connect(null, { logout })(HeaderProfile);
