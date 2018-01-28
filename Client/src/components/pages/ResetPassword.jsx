import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResetPassswordForm from '../forms/ResetPasswordForm';
import { validateToken } from '../../actions/authActions';

/**
 * 
 * 
 * @class ResetPassword
 * @extends {Component}
 */
class ResetPassword extends React.Component {
  /**
   * Creates an instance of ResetPassword.
   * @param {any} props 
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
   * 
   * 
   * @memberof ResetPassword
   * @returns {String} Token
   */
  componentDidMount() {
    this.props.validateToken(this.props.match.params.token.replace(/\-io/g, '.'))
      .then(() => this.setState({ loading: false, success: true }),
        () => this.setState({ loading: false, success: false }));
  }

  /**
   * 
   * 
   * @returns {object} component
   * @memberof ResetPassword
   */
  render() {
    const { loading, success } = this.state;
    const token = this.props.match.params.token.replace(/\-io/g, '.');
    return (
      <div>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
          <div className="container">
            <Link to={'/'} className="navbar-brand">
              <h1 id="logo">More-Recipes</h1>
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

        <header id="header" />

        <section>
          <br />
          <div className="container">
            <div className="row">
              <div className="col-md-6 obj-color">

                { loading && <div className="loader" /> }
                { !loading && success &&
                  <div>
                    <h4 className="text-center"> Reset Your Password </h4>
                    <br />
                    <ResetPassswordForm token={token} />
                  </div>
                }
                { !loading && !success &&
                <h5>You currently do not have Permission to this Page</h5> }
              </div>
            </div>
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
