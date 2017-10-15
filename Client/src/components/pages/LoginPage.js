import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm2';
import { login } from '../../actions/auth';


class LoginPage extends React.Component {

  submit = data => this.props.login(data).then(() => this.props.history.push('/'));

  render() {
    return (
      <div className="container">
        <h1>Login Page</h1>
    
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,

  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
