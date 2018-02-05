import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResetPassswordForm from '../forms/ResetPasswordForm';
import { validateToken } from '../../actions/authActions';

/**
 * @class ResetPassword
 *
 * @extends {Component}
 */
class ResetPassword extends React.Component {
  /**
   * @param {any} props
   *
   * @memberof ResetPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      success: false
    };
  }

  /**
   * @description life cycle method called before component mounts the DOM
   *
   * @memberof ResetPassword
   *
   * @returns {String} Token
   */
  componentDidMount() {
    this.props.validateToken(this.props.match.params.token.replace(/\-io/g, '.'))
      .then(
        () => this.setState({ loading: false, success: true }),
        () => this.setState({ loading: false, success: false }));
  }

  /**
   * @description renders component to the DOM
   *
   * @memberof ResetPassword
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { loading, success } = this.state;
    const token = this.props.match.params.token.replace(/\-io/g, '.');
    return (
      <div>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
          <div className="container">
            <Link to={'/'} className="navbar-brand">
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
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header style={{
          background: '#333333',
          paddingTop: '67px'
        }}
        />

        <section
          className="d-flex flex-row align-items-center
          justify-content-center obj-color"
          style={{ width: '100vw', height: '48vw' }}
        >
          <br />
          <div>
            {
              loading && <div className="loader" />
            }
            {
              !loading && success &&
              <div style={{ marginTop: '-300px' }}>
                <h4 className="text-center"> Reset Your Password </h4>
                <br />
                <ResetPassswordForm token={token} />
              </div>
            }
            {
              !loading && !success &&
              <h5>You currently do not have Permission to this Page</h5>
            }
          </div>
        </section>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  validateToken: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};


export default connect(null, { validateToken })(ResetPassword);
