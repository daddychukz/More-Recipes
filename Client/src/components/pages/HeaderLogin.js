import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <div className="container">
        <Link to={'/'} className="navbar-brand">More-Recipes</Link>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={'/'} className="nav-link active">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link" data-toggle="modal" data-target="#contactModal">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div className="modal fade text-dark" id="contactModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h5 className="modal-title" style={{ color: 'white' }} id="contactModalTitle">
            Contact Us
            </h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="messager">Message</label>
                <textarea className="form-control" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary btn-block">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
