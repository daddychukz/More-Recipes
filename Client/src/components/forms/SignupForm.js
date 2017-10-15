import React from 'react';
import { Link } from 'react-router-dom';


export const SignupForm = () => {
    return (
        <div>              
        {/* SIGNUP CARD  */}
            <form>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Username" required />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control form-control-lg" placeholder="Email" required />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Password" required />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" required />
                </div>
                <input type="submit" value="Register" className="btn btn-info btn-block" />
            </form>
        </div>
    );
};