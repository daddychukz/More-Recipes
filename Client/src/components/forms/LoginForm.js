import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../../actions/userActions';

class LoginForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            email: '',
            password: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        this.props.actions.signIn(this.state);
        console.log(this.props.users);
    }
    
    render() {
        return (
            <div>
                    {/* SIGNIN CARD  */}
                <form onSubmit={this.onSubmit}>
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
                    <input 
                        type="submit" 
                        value="Login" 
                        className="btn btn-info btn-block" />
                    <br />
                    <Link to='#'><strong>forgot your password?</strong></Link>
                    <hr className="bg-white" />
                    <Link to='#'>or sign in with one of these services</Link>
                    <ul className="list-inline text-center">
                        <li className="list-inline-item"><Link className="btn btn-lg" to="#" title="Google"><i className="fa fa-2x fa-google-plus"></i></Link>&nbsp; </li>
                        <li className="list-inline-item"><Link className="btn btn-lg" to="#" title="Facebook"><i className="fa fa-2x fa-facebook"></i></Link></li>
                    </ul>
                </form>
            </div>
        );
    }
}
LoginForm.propTypes = {
    users: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        users: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);