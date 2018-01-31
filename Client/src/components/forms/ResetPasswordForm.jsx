import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import createBrowserHistory from 'history/createBrowserHistory';
import * as userActions from '../../actions/userActions';

const customHistory = createBrowserHistory({
  forceRefresh: true
});
/**
 *
 *
 * @class ResetPasswordForm
 * @extends {React.Component}
 */
class ResetPasswordForm extends React.Component {
  /**
   * Creates an instance of ResetPasswordForm.
   * @param {any} props
   * @param {any} context
   * @memberof ResetPasswordForm
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      token: this.props.token,
      Password: '',
      ConfirmPassword: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   *
   *
   * @param {any} e
   * @memberof ResetPasswordForm
   * @returns {void}
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @param {any} e
   * @memberof ResetPasswordForm
   * @returns {void}
   */
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      Token: this.state.token,
      Password: this.state.Password,
      ConfirmPassword: this.state.ConfirmPassword
    };
    if (this.state.Password !== this.state.ConfirmPassword) {
      toastr.error('Passwords do not match');
    } else {
      this.props.resetPassword(userData).then(
        () => customHistory.push('/')
      );
    }
  }

  /**
   *
   *
   * @memberof ResetPasswordForm
   * @returns {object} component
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
              name="Password"
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
              name="ConfirmPassword"
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
