import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import * as recipesActions from '../../actions/recipeActions';
import * as reviewActions from '../../actions/reviewActions';
import * as favoriteActions from '../../actions/favoriteActions';
import Header from './Header';
import { Footer } from './Footer';


class MyRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
    }

    componentWillMount() {
        this.props.getUserRecipes()
        .then(
            () => {
                this.setState({ recipes: this.props.recipes })
            })
            .catch((error) => {
                console.log(error);
            })
          }

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
        
                            {/* RECIPE CATALOG  */}
                            <div className="col-md-8" id="display">
                                <input className="form-control" type="text" placeholder="Filter Recipes..."/>
                                <br/>
                                <table className="table table-hover">
                                    <tbody>
                                        <tr>
                                            <th>Title</th>                                    
                                            <th>Created</th>
                                            <th></th>
                                        </tr>
                                        {
                                            this.state.recipes.map(data => {
                                                const newDate = new Date(data.createdAt).toDateString();
                                                console.log(data);
                                                return (
                                                    <tr key={data.recipeId}>
                                                        <td><Link to={`/recipe/${data.recipeId}`}>{data.title}</Link></td>
                                                        <td>{newDate}</td>
                                                        <td><Link to="#" data-toggle="modal" title="Edit" data-target="#editRecipe"><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;</Link> <Link to="#" title="Delete" data-toggle="modal" data-target="#delete"><i className="fa fa-trash text-danger" aria-hidden="true"></i></Link></td>  
                                                    </tr>
                                                )
                                            })
                                        }
                                            
                                    </tbody>                           
                                </table>                       
                            </div>
                            
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }
}

MyRecipe.propTypes = {
    getUserRecipes: PropTypes.func.isRequired,
  }

  function mapStateToProps(state, ownProps) {
      return {
          recipes: state.recipe
      }
  }

  function mapDispatchToProps(dispatch) {
      return {
        getUserRecipes: () => dispatch(recipesActions.getUserRecipes())
      }
  }
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipe);
