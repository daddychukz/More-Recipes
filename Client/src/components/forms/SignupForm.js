import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import createBrowserHistory from 'history/createBrowserHistory';
import * as userActions from '../../actions/userActions';
import InlineError from '../messages/InlineError';

const customHistory = createBrowserHistory({
    forceRefresh: true
});

class SignupForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            Email: '',
            UserName: '',
            Fullame: '',
            Password: '',
            ConfirmPassword: '',
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        this.props.actions.signUp(this.state).then(
            () => {
                toastr.success('Registration Successful');
                customHistory.push('/');
            },
            (err) => {
                this.setState({ errors: err.response.data.errors[0], isLoading: false })
                toastr.error(err.response.data.errors[0].message)
            }
        );
        console.log(this.props.users);
    }
    

    render() {
        const { errors } = this.state;
        return (
            <div>              
        {/* SIGNUP CARD  */}
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input 
                        value={this.state.fullname}
                        onChange={this.onChange}
                        type="text" 
                        name="fullname"
                        className="form-control form-control-lg" 
                        placeholder="Full Name" 
                        required />
                </div>
                <div className="form-group">
                    <input 
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text" 
                        name="username"
                        className="form-control form-control-lg" 
                        placeholder="Username" 
                        required />
                </div>
                <div className="form-group">
                    <input 
                        value={this.state.email}
                        onChange={this.onChange}
                        type="email" 
                        name="email"
                        className="form-control form-control-lg" 
                        placeholder="Email" 
                        required />
                </div>
                <div className="form-group">
                    <input 
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password" 
                        name="password"
                        className="form-control form-control-lg" 
                        placeholder="Password" 
                        required />
                </div>
                <div className="form-group">
                    <input 
                        value={this.state.confirmPassword}
                        onChange={this.onChange}
                        type="password"
                        name="confirmPassword" 
                        className="form-control form-control-lg" 
                        placeholder="Confirm Password" 
                        required />
                        {/* {errors.message && <InlineError text={errors.message}/>} */}
                </div>
                    <input 
                        type="submit" 
                        value="Register" 
                        className="btn btn-info btn-block" />
            </form>
        </div>
        );
    }
}

SignupForm.propTypes = {
    users: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        users: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);