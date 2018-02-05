import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
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
    if (this.state.Password !== this.state.ConfirmPassword) {
      toastr.error('Passwords do not match');
    } else {
      this.props.actions.signUp(this.state);
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
