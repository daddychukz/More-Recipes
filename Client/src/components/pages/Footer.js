import React from 'react';
import { Link } from 'react-router-dom';

//Stateless component
export const Footer = () => {
        return(
            // MAIN FOOTER
            <footer id="main-footer" className="bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <div className="py-4">
                                <h1 className="h3">More-Recipes</h1>
                                <p>Copyright &copy; 2017</p>
                                {/* <button className="btn btn-primary" data-toggle="modal" data-target="#contactModal">Contact Us</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }