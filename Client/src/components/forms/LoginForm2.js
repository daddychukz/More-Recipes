import React from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

class LoginForm2 extends React.Component {

    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => 
    this.setState({ 
        data: { ...this.state.data, [e.target.name]: e.target.value }
    });

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors }));
        }
    };

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = 'Invalid Email';
        if (!data.password) errors.password = 'Cannot be blank';
        return errors;
    }

    render() {
        const { data, errors } = this.state;

        return (
            <form className="col-4" onSubmit={this.onSubmit}>
                {errors.global && (
                    <div>
                        <h5>Ooops!</h5>
                        <InlineError text={errors.global}/>
                    </div>
                )}
                <div className="form-group">
                    <label className='control-label'>Email</label>
                    <input
                        type='text'
                        name='email'
                        value={data.email}
                        onChange={this.onChange}
                        className='form-control' />
                </div>
                {errors.email && <InlineError text={errors.email}/>}
                <div className="form-group">
                    <label className='control-label'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={data.password}
                        onChange={this.onChange}
                        className='form-control' />
                </div>
                {errors.password && <InlineError text={errors.password}/>}
                <div className='form-group'>
                    <button className='btn btn-primary btn-md'>
                        Login
                    </button>
                </div>
            </form>
        );
    }
}

LoginForm2.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm2;