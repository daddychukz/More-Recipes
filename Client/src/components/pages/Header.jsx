import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import customHistory from '../common/commonFunctions';
import { logout } from '../../actions/userActions';

/**
 * @class Header
 *
 * @extends {React.Component}
 */
class Header extends React.Component {
  /**
   * @param {any} props
   *
   * @memberof Header
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
   * @description logs out a signed in user
   *
   * @memberof Header
   *
   * @returns {void}
   */
  logout() {
    this.props.logout();
    customHistory.push('/');
  }

  /**
   * @description renders component to the DOM
   *
   * @memberof Header
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
              <h3 id="logo">More-Recipes</h3>
            </Link>
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
                    className={`nav-link ${pathname === '/recipe-box' &&
                    'active'}`}
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
                  <Link to={'/my-favorite'} className={className('/my-favorite')}>
                  Favorites
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="btn-group open">
                    <i
                      className="fa fa-user-circle fa-2x pull-right"
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
                          className="dropdown-item"
                          to={'/'}
                          onClick={this.logout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="modal fade text-dark" id="contactModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h5
                  className="modal-title"
                  style={{ color: 'white' }}
                  id="contactModalTitle"
                >
                  Contact Us
                </h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="messager">Message</label>
                    <textarea className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary btn-block">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Header.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Header);
