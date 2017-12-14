import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import { Footer } from './Footer';
import RecipeForm from '../forms/RecipeForm';

class AddRecipe extends React.Component {
    render() {
        return (
            <div>
                <Header />

                <header id="header" />

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
                            <SideBar />
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
                                <h5 className="modal-title" style={{ color: 'rgb(255, 255, 255)' }} id="contactModalTitle">
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
                                        <textarea className="form-control" rows="6" />
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
