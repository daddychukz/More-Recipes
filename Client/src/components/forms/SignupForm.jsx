import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
 * @class SignupForm
 * @extends {React.Component}
 */
class SignupForm extends React.Component {
  /**
   * Creates an instance of SignupForm.
   * @param {any} props 
   * @param {any} context 
   * @memberof SignupForm
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      Email: '',
      UserName: '',
      FullName: '',
      Password: '',
      ConfirmPassword: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * 
   * @returns {void}
   * @param {any} e 
   * @memberof SignupForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * 
   * @returns {void}
   * @param {any} e 
   * @memberof SignupForm
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.state.Password !== this.state.ConfirmPassword) {
      toastr.error('Passwords do not match');
    } else {
      this.props.actions.signUp(this.state).then(
        () => {
          toastr.success('Registration Successful');
          customHistory.push('/');
        },
        (error) => {
          this.setState({ isLoading: false });
          toastr.error(error.response.data.error.message);
        }
      );
    }
  }


  /**
   * 
   * 
   * @returns {object} component
   * @memberof SignupForm
   */
  render() {
    return (
      <div>
        {/* SIGNUP CARD  */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              value={this.state.FullName}
              onChange={this.onChange}
              type="text"
              name="FullName"
              className="form-control form-control-lg"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={this.state.UserName}
              onChange={this.onChange}
              type="text"
              name="UserName"
              className="form-control form-control-lg"
              placeholder="Username"
              required
            />
          </div>
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
          <div className="form-group">
            <input
              value={this.state.ConfirmPassword}
              onChange={this.onChange}
              type="password"
              name="ConfirmPassword"
              className="form-control form-control-lg"
              placeholder="Confirm Password"
              required
            />
          </div>
          <input
            type="submit"
            value="Register"
            className="btn btn-info btn-block"
          />
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  actions: PropTypes.shape({
    signUp: PropTypes.func.isRequired
  }).isRequired,
};

const mapStateToProps = state => ({
  users: state.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
