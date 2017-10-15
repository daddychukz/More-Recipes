import React from 'react';
import { Link } from 'react-router-dom';

//Stateless component
export const Header = () => {
        return(
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                    <div className="container">
                        <Link to={'/'} className="navbar-brand">More-Recipes</Link>
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={'/'}  className="nav-link active">Home</Link>
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
                                <h5 className="modal-title" style={{color:'white'}} id="contactModalTitle">
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
                                        <textarea className="form-control"></textarea>
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
            // <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
            //     <div className="container">
            //         <Link to={'/'} className="navbar-brand"><h1 id="logo">More-Recipes</h1></Link>
            //         <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            //             <span className="navbar-toggler-icon"></span>
            //         </button>
            //         <div className="collapse navbar-collapse" id="navbarCollapse">
            //             <ul className="navbar-nav ml-auto">
            //                 <li className="nav-item">
            //                     <Link to={'/'}  className="nav-link active">Home</Link>
            //                 </li>
            //                 <li className="nav-item">
            //                     <Link to={'/add-recipe'} className="nav-link">Add Recipe</Link>
            //                 </li>
            //                 <li className="nav-item">
            //                     <Link to={'/my-recipe'} className="nav-link">My Recipes</Link>
            //                 </li>
            //                 <li className="nav-item">
            //                     <Link to={'/my-favorite'} className="nav-link">Favorites</Link>
            //                 </li>
            //                 <li className="nav-item">
            //                     <div className="btn-group open">
            //                         <i className="fa fa-user-circle fa-2x pull-right" data-toggle="dropdown" aria-hidden="true"></i>
            //                         <ul className="dropdown-menu">
            //                             <li><Link className="dropdown-item" to={'/profile'}>Profile</Link></li>
            //                             <li className="divider"></li>
            //                             <li><Link className="dropdown-item" to={'/login'}>Logout</Link></li>                        
            //                         </ul>
            //                     </div>                                                        
            //                 </li>
            //             </ul>
            //         </div>
            //     </div>
            // </nav>
        );
    }
