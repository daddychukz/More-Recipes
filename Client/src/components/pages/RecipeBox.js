import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import Pagination from '../services/UltimatePagination';
import * as recipesActions from '../../actions/recipeActions';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

/**
 * 
 * 
 * @class RecipeBox
 * @extends {React.Component}
 */
class RecipeBox extends React.Component {
  /**
   * Creates an instance of RecipeBox.
   * @param {any} props 
   * @memberof RecipeBox
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      isLoading: true,
      currentPage: 1,
      pagination: {
        totalPages: 2,
        boundaryPagesRange: 1,
        siblingPagesRange: 2,
        limit: 4,
        offset: 0,
      },
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
   * dispatches actions that makes request to get all recipes
   * @method componentDidMount
   * @memberof RecipeBox
   * @returns {void}
   */
  componentDidMount() {
    const limit = this.state.pagination.limit;
    const offset = this.state.pagination.offset;
    this.props.viewAllRecipes(limit, offset).then(() => {
      this.setState({
        recipes: this.props.data.recipes,
        isLoading: false,
        pagination: {
          ...this.state.pagination,
          totalPages: this.props.data.pagination.pageCount,
        }
      });
    })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * @param {any} number
   * @memberof RecipeBox
   * @returns {object} recipes
   */
  onChange(number) {
    this.setState({
      currentPage: number,
      pagination: {
        totalCount: this.props.data.pagination.totalCount,
        totalPages: this.props.data.pagination.pageCount,
        limit: 4,
        offset: this.state.pagination.limit * (number - 1)
      }
    }, () => {
      const limit = this.state.pagination.limit;
      const offset = this.state.pagination.offset;

      this.props.viewAllRecipes(limit, offset).then(() => {
        this.setState({ recipes: this.props.data.recipes, isLoading: false });
      })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  /**
   * 
   * @method render
   * @memberof RecipeBox
   * @returns {object} component
   */
  render() {
    return (
      <div>
        <Header/>

        <header id="header" />

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
                <input className="form-control" type="text" placeholder="Filter Recipes..."/>
                <br />
                <br />
                { this.state.isLoading ?
                  <div className="loader" /> :
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
                        );
                      })
                    }
                  </CloudinaryContext>
                }
                <Pagination
                  pagination={{ ...this.state.pagination }}
                  currentPage={this.state.currentPage}
                  onChange={this.onChange}
                />
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
  viewAllRecipes: PropTypes.func.isRequired,
};

RecipeBox.defaultProps = {
  data: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  data: state.recipe
});

const mapDispatchToProps = (dispatch) => ({
  viewAllRecipes: (limit, offset) => dispatch(recipesActions.viewAllRecipes(limit, offset))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeBox);
