import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './HeaderLogin';
import { LoginForm } from '../forms/LoginForm';
import { SignupForm } from '../forms/SignupForm';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <header id="home-section">
                    <div className="dark-overlay">
                        <div className="home-inner">
                            <div className="container">
                                <div className="row" id="parent">
                                    <div className="col-lg-8 d-none d-lg-block">
                                        <h1 className="display-4"> Share your <strong> awesome </strong> and exciting <strong>recipe</strong> ideas</h1>
                                        <div className="d-flex flex-row">
                                            <div className="p-4 align-self-start">
                                                <i className="fa fa-check btn-info"></i>
                                            </div>
                                            <div className="p-4 align-self-end">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat earum quam cupiditate unde saepe nam?
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row">
                                            <div className="p-4 align-self-start">
                                                <i className="fa fa-check btn-info"></i>
                                            </div>
                                            <div className="p-4 align-self-end">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat earum quam cupiditate unde saepe nam?
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row">
                                            <div className="p-4 align-self-start">
                                                <i className="fa fa-check btn-info"></i>
                                            </div>
                                            <div className="p-4 align-self-end">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat earum quam cupiditate unde saepe nam?
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                            <Link to="#" className="btn btn-info" role="button" data-toggle="collapse" data-target="#cardLogin" data-parent="#parent">Signin</Link>&nbsp;
                                            <Link to="#" className="btn btn-info" role="button" data-toggle="collapse" data-target="#cardRegister" data-parent="#parent">Signup</Link>
                                    <div className="collapse show py-3" id="cardLogin">
                                        <div className="card main-color-bg text-center card-form">
                                            <div className="card-body">
                                                <h3>Log Into Your Account</h3>
                                                <p>Please enter your Login details</p>    
                                            <LoginForm />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="collapse py-3" id="cardRegister">
                                        <div className="card main-color-bg text-center card-form">
                                            <div className="card-body">
                                                <h3>Signup Today</h3>
                                                <p>Please fill out this form to register</p>
                                                <SignupForm />
                                            </div>
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </header>
            </div>
        );
    }
}

export default Home;
