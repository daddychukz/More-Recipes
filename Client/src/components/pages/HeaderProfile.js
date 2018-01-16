import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import { logout } from '../../actions/userActions';

const customHistory = createBrowserHistory({
  forceRefresh: true
});

/**
 * 
 * 
 * @class HeaderProfile
 * @extends {React.Component}
 */
class HeaderProfile extends React.Component {
  /**
   * 
   * @returns {void}
   * @param {any} e 
   * @memberof HeaderProfile
   */
  logout(e) {
    this.props.logout();
    customHistory.push('/');
  }
  /**
   * 
   * 
   * @returns {object} component
   * @memberof HeaderProfile
   */
  render() {
    const { pathname } = window.location;

    const className = (link) => classNames({
      'active': pathname === link,
      'nav-link': true
    });

    return (
      <div>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
          <div className="container">
            <Link to={'/recipe-box'} className="navbar-brand"><h1 id="logo">More-Recipes</h1></Link>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={'/recipe-box'} className={`nav-link ${pathname === '/recipe-box' && 'active'}`}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/add-recipe'} className={className('/add-recipe')}>Add Recipe</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/my-recipe'} className={className('/my-recipe')}>My Recipes</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/my-favorite'} className={className('/my-favorite')}>Favorites</Link>
                </li>
                <li className="nav-item">
                  <div className="btn-group open">
                    <i className="fa fa-user-circle fa-2x pull-right" data-toggle="dropdown" aria-hidden="true" />
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to={'/my-profile'}>Profile</Link></li>
                      <li className="divider" />
                      <li><Link className="dropdown-item" to="#" data-toggle="modal" data-target="#profileModal">Edit Profile</Link></li>
                      <li><Link className="dropdown-item" to={'/'} onClick={this.logout.bind(this)}>Logout</Link></li>
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

export default connect(null, { logout })(HeaderProfile);
