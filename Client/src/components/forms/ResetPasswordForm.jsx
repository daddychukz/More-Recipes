import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import customHistory from '../common/commonFunctions';
import * as userActions from '../../actions/userActions';

/**
 * @class ResetPasswordForm
 *
 * @extends {React.Component}
 */
class ResetPasswordForm extends React.Component {
  /**
   * @description Creates an instance of ResetPassword.
   *
   * @param {any} props
   *
   * @memberof ResetPasswordForm
   */
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      password: '',
      confirmPassword: '',
      error: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description update component state when form value changes
   *
   * @param {any} event
   *
   * @memberof ResetPasswordForm
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handles reset password
   *
   * @param {any} event
   *
   * @memberof ResetPasswordForm
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const userData = {
      token: this.state.token,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        error: true
      });
      toastr.error('Passwords do not match');
    } else {
      this.props.resetPassword(userData).then(
        () => customHistory.push('/')
      );
    }
  }

  /**
   * @description renders component to the DOM
   *
   * @memberof ResetPasswordForm
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="text-dark" htmlFor="password">
              New Password
            </label>
            <input
              value={this.state.Password}
              onChange={this.onChange}
              type="password"
              name="password"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label className="text-dark" htmlFor="confirm-password">
              Confirm New Password
            </label>
            <input
              value={this.state.ConfirmPassword}
              onChange={this.onChange}
              type="password"
              name="confirmPassword"
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-info">
            Reset Password
          </button>
        </form>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
  resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  resetPassword: userData => dispatch(userActions.resetPassword(userData))
});

export { ResetPasswordForm as ResetPassword };
export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
