import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import * as recipesActions from '../../actions/recipeActions';
import Header from './Header';
import SideBar from './SideBar';
import { Footer } from './Footer';


class RecipeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            isLoading: true
        }
    }

    componentDidMount() {
            this.props.viewAllRecipes().then(() => {
                this.setState({ recipes: this.props.recipes, isLoading: false })
            })
            .catch((error) => {
                console.log(error);
        });
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
                        <Link className="breadcrumb-item" to={'/recipe-box'}>Home</Link>
                        <span className="breadcrumb-item active">Recipe Box</span>            
                    </nav>  
                </div>
        
                 {/* MAIN SECTION  */}
                <section>
                    <div className="container">
                        <div className="row">
                            <SideBar />
        
                             {/* RECIPE CATALOG  */}                            
                            <div className="col-md-8" id="display">
                                <form className="form-inline float-right">
                                    <input type="text" className="form-control col-5" placeholder="Recipe..." />&nbsp;
                                    <button type="submit" className="btn btn-info col-5">Search</button>
                                </form>
                                <br />
                                <br />
                                { this.state.isLoading 
                                ? 
                                <h1>Loading data...</h1>
                                :
                                <CloudinaryContext cloudName={`${process.env.CloudName}`}>
                                    {
                                        this.state.recipes.map(data => {
                                            const newDate = new Date(data.createdAt).toDateString();
                                            console.log(data);
                                            return (
                                                <div key={data.recipeId}>
                                                    <div className="p-2 float-left">
                                                        <Image publicId={data.publicId}>
                                                            <Transformation
                                                                crop="scale"
                                                                width="100"
                                                                height="100"
                                                                dpr="auto"
                                                                responsive_placeholder="blank"
                                                            />
                                                        </Image>
                                                    </div>
                                                    <div className="p-2 align-self-end">
                                                        <small className="text-muted float-right">{newDate}</small>
                                                        <h3><Link to={`/recipe/${data.recipeId}`}>{data.title}</Link></h3>
                                                        <small>by: {data.fullname}</small>
                                                        <p> {data.description} </p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </CloudinaryContext>
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }
}

RecipeBox.propTypes = {
    viewAllRecipes: PropTypes.func.isRequired
  }

  function mapStateToProps(state, ownProps) {
      return {
          recipes: state.recipe
      }
  }

  function mapDispatchToProps(dispatch) {
      return {
        viewAllRecipes: () => dispatch(recipesActions.viewAllRecipes())
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(RecipeBox);
