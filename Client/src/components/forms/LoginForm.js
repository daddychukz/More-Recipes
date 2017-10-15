import React from 'react';
import { Link } from 'react-router-dom';


export const LoginForm = () => {
    return (
        <div>              
                {/* SIGNIN CARD  */}
            <form>
                <div className="form-group">
                    <input type="email" className="form-control form-control-lg" placeholder="Email" required />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-info btn-block">Login</button>
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
};