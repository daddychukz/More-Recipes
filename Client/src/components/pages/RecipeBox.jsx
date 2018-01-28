import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import isEmpty from 'lodash/isEmpty';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import Pagination from '../services/UltimatePagination';
import { viewAllRecipes } from '../../actions/recipeActions';
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
      isLoading: true,
      currentPage: 1,
      pagination: {
        totalPages: 2,
        boundaryPagesRange: 1,
        siblingPagesRange: 2,
        limit: 4,
        offset: 0,
      },
      searchString: ''
    };
    this.onPageChange = this.onPageChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * dispatches actions that makes request to get all recipes
   * @method componentDidMount
   * @memberof RecipeBox
   * @returns {void}
   */
  componentWillMount() {
    const limit = this.state.pagination.limit;
    const offset = this.state.pagination.offset;
    const searchString = this.state.searchString;
    this.props.viewAllRecipes(limit, offset, searchString).then(() => {
      this.setState({
        recipes: this.props.allRecipe.recipes,
        isLoading: false,
        pagination: {
          ...this.state.pagination,
          totalPages: this.props.allRecipe.pagination.pageCount,
        }
      });
    },
    error => toastr.error(error.response.data.message)
    );
  }

  /**
   * @param {any} number
   * @memberof RecipeBox
   * @returns {object} recipes
   */
  onPageChange(number) {
    this.setState({
      currentPage: number,
      pagination: {
        totalCount: this.props.allRecipe.pagination.totalCount,
        totalPages: this.props.allRecipe.pagination.pageCount,
        limit: 4,
        offset: this.state.pagination.limit * (number - 1)
      }
    }, () => {
      const limit = this.state.pagination.limit;
      const offset = this.state.pagination.offset;
      const searchString = this.state.searchString;

      this.props.viewAllRecipes(limit, offset, searchString).then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  /**
   *
   *
   * @param {any} event
   * @memberof RecipeBox
   * @returns {object} recipes
   */
  onInputChange(event) {
    const { limit, offset } = this.state.pagination;
    this.setState({
      searchString: event.target.value
    }, () => {
      this.props.viewAllRecipes(limit, offset, this.state.searchString).then(
        () => {
          this.setState({
            isLoading: false,
            pagination: {
              ...this.state.pagination,
              totalPages: this.props.allRecipe.pagination.pageCount,
            }
          });
        },
        (err) => {
          toastr.error(err.response.data.message);
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
    if (!isEmpty(this.props.allRecipe.recipes)) {
      return (
        <div>
          <Header />

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
                  <input
                    value={this.state.searchString}
                    onInput={this.onInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Filter Recipes..."
                  />
                  <br />
                  {
                    this.state.isLoading ?
                      <div className="loader" /> :
                      <CloudinaryContext cloudName={`${process.env.CloudName}`}>
                        {
                          this.props.allRecipe.recipes.map((allRecipes) => {
                            const newDate = new Date(allRecipes.createdAt)
                              .toDateString();
                            return (
                              <div key={allRecipes.recipeId}>
                                <div className="p-2 float-left">
                                  <Image publicId={allRecipes.publicId}>
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
                                  <small className="text-muted float-right">
                                    {newDate}
                                  </small>
                                  <h3 style={{ wordWrap: 'break-word' }}>
                                    <Link to={`/recipe/${allRecipes.recipeId}`}>
                                      {allRecipes.title}
                                    </Link>
                                  </h3>
                                  <small>by: {allRecipes.fullname}</small>
                                  <p style={{ wordWrap: 'break-word' }}> {
                                    allRecipes.description.split(' ')
                                      .splice(0, 80)
                                      .join(' ')
                                      .concat(' ...')} </p>
                                </div>
                              </div>
                            );
                          })
                        }
                      </CloudinaryContext>
                  }
                  {
                    this.props.allRecipe.pagination.totalCount > 4 ?
                      <Pagination
                        pagination={{ ...this.state.pagination }}
                        currentPage={this.state.currentPage}
                        onChange={this.onPageChange}
                      /> :
                      <div />
                  }
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      );
    }
    return (
      <div>
        <Header />

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
              <div className="col-md-8" id="display" />

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
  allRecipe: PropTypes.shape({
    pagination: PropTypes.shape({
      totalCount: PropTypes.number,
      pageCount: PropTypes.number
    }),
    recipes: PropTypes.array
  }).isRequired
};

const mapStateToProps = state => ({
  allRecipe: state.allRecipe
});

const mapDispatchToProps = dispatch => ({
  viewAllRecipes: (limit, offset, searchString) => dispatch(
    viewAllRecipes(limit, offset, searchString)
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeBox);
