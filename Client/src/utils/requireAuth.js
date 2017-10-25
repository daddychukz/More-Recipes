import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default ComposedComponent => {
    class Authenticate extends React.Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.props.history.push('/');
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }
    return connect(mapStateToProps)(Authenticate);
}
