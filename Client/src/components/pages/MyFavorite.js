import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import * as favoriteActions from '../../actions/favoriteActions';
import Header from './Header';
import SideBar from './SideBar';
import { Footer } from './Footer';


class MyRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: []
        }
    }

    componentWillMount() {
        const userId = jwt.decode(localStorage.jwtToken).userId
        this.props.getFavorite(userId).then(
            () => {
                this.setState({ favorite: this.props.favoriteData.favoriteRecipe })
                console.log(this.state.favorite);
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
                            <SideBar />
        
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
                                            this.state.favorite.map(data => {
                                                const newDate = new Date(data.createdAt).toDateString();
                                                return (
                                                    <tr key={data.recipeId}>
                                                        <td><Link to={`/recipe/${data.recipeId}`}>{data.Recipe.title}</Link></td>
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
  }

  function mapStateToProps(state, ownProps) {
      return {
        favoriteData: state.favorite
      }
  }

  function mapDispatchToProps(dispatch) {
      return {
        getFavorite: (Id) => dispatch(favoriteActions.getUserFavorite(Id))
      }
  }
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipe);
