import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import customHistory from '../components/common/commonFunctions';

export default (ComposedComponent) => {
  /**
   * @class Authenticate
   *
   * @extends {React.Component}
   */
  class Authenticate extends React.Component {
    /**
     * @description life cycle method called before component mounts the DOM
     *
     * @memberof Authenticate
     *
     * @returns {void}
     */
    componentWillMount() {
      const token = localStorage.getItem('jwtToken');
      jwt.verify(token, process.env.SECRET, (error) => {
        if (error) {
          localStorage.removeItem('jwtToken');
          this.props.history.push('/');
        }
      });
      if (this.props.isAuthenticated) {
        this.props.history.push('/recipe-box');
      }
    }
    /**
     * @description renders component to the DOM
     *
     * @memberof Authenticate
     *
     * @returns {JSX} JSX representation of component
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
