import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import createBrowserHistory from 'history/createBrowserHistory';
import * as userActions from '../../actions/userActions';
import InlineError from '../messages/InlineError';

// const responseGoogle = (response) => {
//   console.log(response.profileObj);
//   const { email, name, givenName } = response.profileObj;
//   this.props.signIn({ Email: email, Password: name });
// };

const customHistory = createBrowserHistory({
  forceRefresh: true
});

/**
 * @class LoginForm
 * @extends {React.Component}
 */
class LoginForm extends React.Component {
  /**
   * Creates an instance of LoginForm.
   * @param {any} props 
   * @param {any} context 
   * @memberof LoginForm
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      Email: '',
      Password: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  /**
   * @param {any} e 
   * @memberof LoginForm
   * @returns {void}
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  /**
   * 
   * 
   * @param {any} response 
   * @memberof LoginForm
   * @returns {object} user details
   */
  responseGoogle(response) {
    console.log(response.profileObj);
    const { email, name, givenName, googleId } = response.profileObj;
    this.props.signUp({
      FullName: name,
      UserName: givenName,
      Email: email,
      Password: googleId,
      ConfirmPassword: googleId }).then(
      () => {},
      (err) => {}
    );
    this.props.signIn({ Email: email, Password: googleId }).then(
      (res) => customHistory.push('/recipe-box'),
      (err) => {
        this.setState({ errors: err.response.data, isLoading: false });
        toastr.error(err.response.data.message);
      }
    );
  }

  /**
     * 
     * 
     * @param {any} e 
     * @memberof LoginForm
     * @returns {void}
     */
  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.signIn(this.state)
      .then(
        (res) => customHistory.push('/recipe-box'),
        (err) => {
          this.setState({ errors: err.response.data, isLoading: false });
          toastr.error(err.response.data.message);
        }
      );
  }

  /**
   * 
   * 
   * @returns {void}
   * @memberof LoginForm
   */
  render() {
    const { errors } = this.state;
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
              required />
          </div>
          <div className="form-group">
            <input
              value={this.state.Password}
              onChange={this.onChange}
              type="password"
              name="Password"
              className="form-control form-control-lg"
              placeholder="Password"
              required />
            {/* {errors.message && <InlineError text={errors.message}/>} */}
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-info btn-block" />
          <br />
          <Link to="#"><strong>forgot your password?</strong></Link>
          <hr className="bg-white" />
          <Link to="#">or sign in with one of these services</Link>
          <ul className="list-inline text-center">
            <li className="list-inline-item"><Link className="btn btn-lg" to="#" title="Google"><GoogleLogin
              style={{ width: '', backgroundColor: 'transparent', borderColor: 'transparent' }}
              clientId="1020610939165-pgmi2vuh8broeahhfo1v6vfqueb92sak.apps.googleusercontent.com"
              buttonText= {<i className="fa fa-2x fa-google-plus" />}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              disabledStyle
            /></Link>&nbsp; </li>
            <li className="list-inline-item"><Link className="btn btn-lg" to="#" title="Facebook"><i className="fa fa-2x fa-facebook" /></Link></li>
          </ul>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  users: state.user
});

const mapDispatchToProps = (dispatch) => ({
  signUp: data => dispatch(userActions.signUp(data)),
  signIn: data => dispatch(userActions.signIn(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
