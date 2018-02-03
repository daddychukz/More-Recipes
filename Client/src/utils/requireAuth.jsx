import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import createBrowserHistory from 'history/createBrowserHistory';

const customHistory = createBrowserHistory({
  forceRefresh: true
});


export default (ComposedComponent) => {
  /**
     *
     *
     * @class Authenticate
     * @extends {React.Component}
     */
  class Authenticate extends React.Component {
    /**
     *
     *
     * @memberof Authenticate
     * @returns {object} home page
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/');
      }
      const token = localStorage.getItem('jwtToken');
      jwt.verify(token, process.env.SECRET, (error) => {
        if (error) {
          if (error.message === 'jwt expired') {
            localStorage.removeItem('jwtToken');
            customHistory.push('/');
          }
          localStorage.removeItem('jwtToken');
          customHistory.push('/');
        }
      });
    }
    /**
     *
     *
     * @memberof Authenticate
     * @returns {object} component
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  return connect(mapStateToProps)(Authenticate);
};
