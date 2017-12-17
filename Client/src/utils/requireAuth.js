import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default ComposedComponent => {
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

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  return connect(mapStateToProps)(Authenticate);
};
