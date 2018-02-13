import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import customHistory from '../common/commonFunctions';
import * as userActions from '../../actions/userActions';

/**
 * @class LoginForm
 *
 * @extends {React.Component}
 */
class LoginForm extends React.Component {
  /**
   * @description Creates an instance of HomePage.
   *
   * @param {any} props
   *
   * @memberof LoginForm
   */
  constructor(props) {
    super(props);

    this.state = {
      Email: '',
      Password: '',
      errors: {},
      isLoading: false,
      resetEmail: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.sendResetLink = this.sendResetLink.bind(this);
  }

  /**
   * @description handles signin
   *
   * @param {any} event
   *
   * @memberof LoginForm
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.signIn(this.state)
      .then(
        () => customHistory.push('/recipe-box'),
        (error) => {
          this.setState({ errors: error.response.data, isLoading: false });
          toastr.error(error.response.data.message);
        }
      );
  }

  /**
   * @description update component state when form value changes
   *
   * @param {any} event
   *
   * @memberof LoginForm
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description google signin request
   *
   * @param {any} response
   *
   * @memberof LoginForm
   *
   * @returns {object} user details
   */
  responseGoogle(response) {
    const { email, name, googleId, imageUrl } = response.profileObj;
    this.props.signUp({
      FullName: name,
      UserName: email,
      Email: email,
      Password: googleId,
      ConfirmPassword: googleId,
      ImageUrl: imageUrl });
  }

  /**
   * @description verify user email and sends reset passsword link
   *
   * @method sendResetLink
   *
   * @param {any} event
   *
   * @memberof LoginForm
   *
   * @returns {void}
   */
  sendResetLink(event) {
    event.preventDefault();
    const userEmail = {
      Email: this.state.resetEmail
    };
    this.props.resetPasswordRequest(userEmail)
      .then(
        () => toastr.success('Email has been sent'),
        error => toastr.error(error.response.data.message));
    $('#sendEmailModal').modal('toggle');
  }

  /**
   * @description renders component to the DOM
   *
   * @memberof LoginForm
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <div>
        {/* SIGNIN CARD  */}
        <form onSubmit={this.onSubmit}>

          <div className="form-group">
            <input
              value={this.state.Email}
              onChange={this.onChange}
              type="email"
              name="Email"
              className="form-control form-control-lg"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={this.state.Password}
              onChange={this.onChange}
              type="password"
              name="Password"
              className="form-control form-control-lg"
              placeholder="Password"
              required
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-info btn-block"
          />
          <br />
          <Link to="#" data-toggle="modal" data-target="#sendEmailModal">
            <strong>forgot your password?</strong>
          </Link>
          <hr className="bg-white" />
            or register with your Google account
          <ul className="list-inline text-center">
            <li className="list-inline-item">
              <Link className="btn btn-lg" to="#" title="Google">
                <GoogleLogin
                  id="GoogleLogin"
                  style={{ width: '',
                    backgroundColor: '#49A0B5',
                    borderColor: 'transparent',
                    cursor: 'pointer' }}
                  clientId={process.env.ClientId}
                  buttonText={<i className="fa fa-2x fa-google-plus" />}
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  disabledStyle
                />
              </Link>&nbsp; </li>
          </ul>
        </form>

        <div className="modal fade text-dark" id="sendEmailModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-info">
                <h5
                  className="modal-title"
                  style={{ color: 'white' }}
                  id="contactModalTitle"
                >
                  Forgot Password
                </h5>
              </div>
              <div className="modal-body">
                <form onSubmit={this.sendResetLink}>
                  <div className="form-group">
                    <input
                      value={this.state.resetEmail}
                      onChange={this.onChange}
                      type="email"
                      name="resetEmail"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <input
                    type="submit"
                    value="Send Reset Link"
                    className="btn btn-info btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  resetPasswordRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.user
});

const mapDispatchToProps = dispatch => ({
  signUp: user => dispatch(userActions.signUp(user)),
  signIn: user => dispatch(userActions.signIn(user)),
  resetPasswordRequest: email => dispatch(userActions.resetPasswordRequest(email))
});

export { LoginForm as PureLogin };
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
