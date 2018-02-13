import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import customHistory from '../common/commonFunctions';
import * as userActions from '../../actions/userActions';

/**
 * @class SignupForm
 *
 * @extends {React.Component}
 */
class SignupForm extends React.Component {
  /**
   * @description Creates an instance of Home Page.
   *
   * @param {any} props
   *
   * @memberof SignupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      error: false,
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description update component state when form value changes
   *
   * @param {any} event
   *
   * @memberof SignupForm
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handles user registration
   *
   * @param {any} event
   *
   * @memberof SignupForm
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        error: true
      });
      toastr.error('Passwords do not match');
    } else {
      this.props.actions.signUp(this.state).then(
        () => customHistory.push('/recipe-box'),
        error => toastr.error(error.response.data.error.message)
      );
    }
  }


  /**
   * @description renders component to the DOM
   *
   * @memberof SignupForm
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <div>
        {/* SIGNUP CARD  */}
        <form onSubmit={this.onSubmit} id="signup-form">
          <div className="form-group">
            <input
              value={this.state.fullName}
              onChange={this.onChange}
              type="text"
              name="fullName"
              className="form-control form-control-lg"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={this.state.userName}
              onChange={this.onChange}
              type="text"
              name="userName"
              className="form-control form-control-lg"
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              id="email"
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              id="password"
              value={this.state.Password}
              onChange={this.onChange}
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={this.state.confirmPassword}
              onChange={this.onChange}
              type="password"
              name="confirmPassword"
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

export { SignupForm as PureSignup };
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
