import React from 'react';
import { Link } from 'react-router-dom';

class Homepage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Home Page</h1>
                <p> mahsfkasfjsf akavcskafjasbjfcs akfsdkuf</p>
                <Link to="login" className="btn btn-primary btn-lg">Login</Link>
            </div>
        );
    }
}

export default Homepage;
