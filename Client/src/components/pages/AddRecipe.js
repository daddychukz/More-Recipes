import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import RecipeForm from '../forms/RecipeForm';

class AddRecipe extends React.Component {
    render() {
        return (
            <div>
                <Header />
                
                <header id="header">
                
                </header>
                
                 {/* BREADCRUMB  */}
                <div className="container">
                    <nav className="breadcrumb">            
                        <Link className="breadcrumb-item" to="#">Home</Link>
                        <span className="breadcrumb-item active">Recipe</span>            
                    </nav>  
                </div>
        
                 {/* MAIN SECTION  */}
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="list-group mb-3">
                                    <li className="list-group-item active text-center"><h5>DURUGO CHUKS</h5></li>
                                    <Link to="#" className="list-group-item"><i className="fa fa-cutlery" aria-hidden="true"></i> My Recipes <span className="badge badge-pill badge-info float-right">12</span></Link>
                                    <Link to="#" className="list-group-item"><i className="fa fa-star" aria-hidden="true"></i> My Favourites <span className="badge badge-pill badge-info float-right">20</span></Link>
                                    <Link to="#" className="list-group-item"><i className="fa fa-user" aria-hidden="true"></i> My Profile</Link>
                                </div>
                            
                                 {/* TOP RECIPE  */}
                                <ul className="list-group mb-3">
                                    <li className="list-group-item active text-center"><h5>Top 3 Favorite Recipes</h5></li>
                                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1"><Link to="#" className="mb-1"><strong>Egusi Recipe</strong></Link></h5>
                                            <small className="text-muted">7 days ago</small>
                                        </div>
                                        <p className="mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, maxime!</p>
                                    </div>
                                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1"><Link to="#"><strong>Roasted Plantain</strong></Link></h5>
                                            <small className="text-muted">5 days ago</small>
                                        </div>
                                        <p className="mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, maxime!</p>
                                    </div>
                                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1"><Link to="#"><strong>Sweetened Bean Cake</strong></Link></h5>
                                            <small className="text-muted">2 days ago</small>
                                        </div>
                                        <p className="mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, maxime!</p>
                                    </div>
                                </ul>                        
                            </div>
                            <div className="col-md-8">
                                <RecipeForm />
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
        
                     {/* Recipe MODAL  */}
                    <div className="modal fade text-dark" id="addRecipe">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header bg-primary">
                                        <h5 className="modal-title" style={{ color:'rgb(255, 255, 255)' }} id="contactModalTitle">
                                            Add Recipe
                                        </h5>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="name">Recipe Title</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="messager">Recipe Description</label>
                                                <textarea className="form-control" rows="6"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="imgFile">Upload Image</label>
                                                <input type="file" className="form-control-file" id="imgFile" aria-describedby="fileHelp" />
                                                <small id="fileHelp" className="form-text text-muted">Please upload an example image of recipe for better reviews.</small>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-primary btn-block" data-dismiss="modal">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                         {/* FAVORITE MODAL  */}
                        <div className="modal fade text-dark" id="favorite" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Message</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Successfully Added to Your Favorites
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save</button>
                                </div>
                                </div>
                            </div>
                        </div>
            </div>        
        );
    }
}

export default AddRecipe;
