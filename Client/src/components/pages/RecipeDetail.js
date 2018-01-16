import React from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import * as recipesActions from '../../actions/recipeActions';
import * as reviewActions from '../../actions/reviewActions';
import * as favoriteActions from '../../actions/favoriteActions';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

/**
 * 
 * 
 * @class RecipeDetail
 * @extends {React.Component}
 */
class RecipeDetail extends React.Component {
  /**
   * Creates an instance of RecipeDetail.
   * @param {any} props 
   * @memberof RecipeDetail
   */
  constructor(props) {
    super(props);
    this.state = {
      upvoted: false,
      downvoted: false,
      upvote: 'fa fa-2x fa-thumbs-o-up',
      downvote: 'fa fa-2x fa-thumbs-o-down',
      favoriteIcon: 'fa fa-2x fa-star-o',
      Review: '',
      Category: 'Soup',
      upvoteCount: 0,
      downvoteCount: 0,
      isLoading: true
    };
    this.upvote = this.upvote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
  }

  /**
   * dispatches actions that makes request to get a single recipe
   * dispatches actions that makes request to get all reviews for a particular recipe
   * dispatches actions that makes request to get a single recipe favorited by a user
   * @method componentWillMount
   * @memberof RecipeDetail
   * @returns {object} component
   */
  componentDidMount() {
    const recipeId = this.props.match.params.recipeId;
    const userId = this.props.user.userId;
    this.props.viewSingleRecipe(recipeId)
      .then(
        () => {
          const recipeVotes = this.props.singleRecipe.Votes;
          this.setState({
            upvoteCount: this.props.singleRecipe.upvotes,
            downvoteCount: this.props.singleRecipe.downvotes,
            isLoading: false
          });
          if (!isEmpty(recipeVotes)) {
            if (recipeVotes[recipeVotes.length - 1].userId === this.props.user.userId &&
          this.props.singleRecipe.recipeId === this.props.match.params.recipeId &&
          recipeVotes[recipeVotes.length - 1].vote === true) {
              this.setState({ upvote: 'fa fa-2x fa-thumbs-up' });
            } else if (recipeVotes[recipeVotes.length - 1].userId === this.props.user.userId &&
          this.props.singleRecipe.recipeId === this.props.match.params.recipeId &&
          recipeVotes[recipeVotes.length - 1].vote === false) {
              this.setState({ downvote: 'fa fa-2x fa-thumbs-down' });
            }
          }
        });

    this.props.viewAllReviews(recipeId);

    const isFavorited = (recipe) => {
      return recipe.recipeId === this.props.match.params.recipeId &&
      recipe.userId === this.props.user.userId;
    };

    this.props.getFavorite(userId).then(
      () => {
        if (this.props.favoriteData.find(isFavorited)) {
          this.setState({ favoriteIcon: 'fa fa-2x fa-star' });
        } else {
          this.setState({ favoriteIcon: 'fa fa-2x fa-star-o' });
        }
      }
    );
  }

  /**
   * 
   * @param {any} nextProps
   * @method componentWillReceiveProps
   * @memberof RecipeDetail
   * @returns {object} component
   */
  componentWillReceiveProps(nextProps) {
    const recipeId = nextProps.match.params.recipeId;
    const userId = this.props.user.userId;
    if (nextProps.match.params.recipeId !== this.props.match.params.recipeId) {
      this.props.viewSingleRecipe(recipeId).then(
        () => {
          const recipeVotes = this.props.singleRecipe.Votes;
          this.setState({
            upvoteCount: this.props.singleRecipe.upvotes,
            downvoteCount: this.props.singleRecipe.downvotes
          });
          if (!isEmpty(recipeVotes)) {
            if (recipeVotes[recipeVotes.length - 1].userId === this.props.user.userId &&
          this.props.singleRecipe.recipeId === this.props.match.params.recipeId &&
          recipeVotes[recipeVotes.length - 1].vote === true) {
              this.setState({ upvote: 'fa fa-2x fa-thumbs-up' });
            } else if (recipeVotes[recipeVotes.length - 1].userId === this.props.user.userId &&
          this.props.singleRecipe.recipeId === this.props.match.params.recipeId &&
          recipeVotes[recipeVotes.length - 1].vote === false) {
              this.setState({ downvote: 'fa fa-2x fa-thumbs-down' });
            } else {
              this.setState({ downvote: 'fa fa-2x fa-thumbs-o-down', upvote: 'fa fa-2x fa-thumbs-o-up' });
            }
          } else {
            this.setState({ downvote: 'fa fa-2x fa-thumbs-o-down', upvote: 'fa fa-2x fa-thumbs-o-up' });
          }
        });
      this.props.viewAllReviews(recipeId);

      const isFavorited = (recipe) => {
        return recipe.recipeId === this.props.match.params.recipeId &&
        recipe.userId === this.props.user.userId;
      };

      this.props.getFavorite(userId).then(
        () => {
          if (this.props.favoriteData.find(isFavorited)) {
            this.setState({ favoriteIcon: 'fa fa-2x fa-star' });
          } else {
            this.setState({ favoriteIcon: 'fa fa-2x fa-star-o' });
          }
        }
      );
    }
  }

  /**
   * 
   * @method onChange
   * @param {any} e 
   * @memberof RecipeDetail
   * @returns {void}
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * 
   * @method favoriteRecipe
   * @memberof RecipeDetail
   * @returns {object} favoriteRecipe
   */
  favoriteRecipe() {
    const recipeId = this.props.singleRecipe.recipeId;
    const isFavorited = (recipe) =>
      recipe.recipeId === this.props.match.params.recipeId &&
      recipe.userId === this.props.user.userId;

    const data = {
      Category: this.state.Category
    };
    this.props.addFavorite(recipeId, data).then(
      () => {
        if (this.props.favoriteData.find(isFavorited)) {
          this.setState({ favoriteIcon: 'fa fa-2x fa-star' });
          toastr.success('You favorited this recipe');
        } else {
          this.setState({ favoriteIcon: 'fa fa-2x fa-star-o' });
        }
      }
    );
  }

  /**
   * 
   * @method upvote
   * @memberof RecipeDetail
   * @returns {object} upvotes
   */
  upvote() {
    this.props.upvoteRecipe(this.props.singleRecipe.recipeId)
      .then(
        () => {
          if (this.props.vote.value === 1) {
            this.setState({
              upvoteCount: this.state.upvoteCount + 1,
              upvote: 'fa fa-2x fa-thumbs-up',
              downvote: 'fa fa-2x fa-thumbs-o-down',
              upvoted: true
            });
            if (this.state.downvoted) {
              this.setState({
                downvoteCount: this.state.downvoteCount - 1,
                downvoted: false
              });
            }
            toastr.success(this.props.vote.message);
          } else {
            this.setState({
              upvoteCount: this.state.upvoteCount - 1,
              upvote: 'fa fa-2x fa-thumbs-o-up',
              upvoted: false
            });
          }
        },
        (err) => {
          toastr.error(err.response.data.message);
        });
  }

  /**
   * 
   * @method downVote
   * @memberof RecipeDetail
   * @returns {object} downvote
   */
  downVote() {
    this.props.downvoteRecipe(this.props.singleRecipe.recipeId)
      .then(
        () => {
          if (this.props.vote.value === 1) {
            this.setState({
              downvoteCount: this.state.downvoteCount + 1,
              downvote: 'fa fa-2x fa-thumbs-down',
              upvote: 'fa fa-2x fa-thumbs-o-up',
              downvoted: true
            });
            if (this.state.upvoted) {
              this.setState({
                upvoteCount: this.state.upvoteCount - 1,
                upvoted: false
              });
            }
            toastr.success(this.props.vote.message);
          } else {
            this.setState({
              downvoteCount: this.state.downvoteCount - 1,
              downvote: 'fa fa-2x fa-thumbs-o-down',
              downvoted: false
            });
          }
        },
        (err) => {
          toastr.error(err.response.data.message);
        });
  }

  /**
   * 
   * 
   * @param {any} e 
   * @memberof RecipeDetail
   * @returns {object} reviews
   * @returns {object} favorite recipe
   */
  onSubmit(e) {
    e.preventDefault();
    const recipeId = this.props.match.params.recipeId;
    const data = {
      Review: this.state.Review
    };
    this.props.reviewRecipe(recipeId, data)
      .then(
        () => {
          this.setState({ Review: '' });
        },
        (err) => this.setState({ errors: err.response.data })
      );
  }

  /**
   * 
   * @method render
   * @memberof RecipeDetail
   * @returns {object} component 
   */
  render() {
    return (
      <div>
        <Header />

        <header id="header" />

        {/* BREADCRUMB  */}
        <div className="container">
          <nav className="breadcrumb">
            <Link className="breadcrumb-item" to={'/recipe-box'}>Home</Link>
            <span className="breadcrumb-item active">Recipe</span>
          </nav>
        </div>

        {/* MAIN SECTION  */}
        <section>
          <div className="container">
            <div className="row">
              <SideBar />

              {/* RECIPE CATALOG  */}
              {
                this.state.isLoading ?
                  <div className="loader" /> :

                  <div className="col-md-8" id="display">
                    <CloudinaryContext cloudName={`${process.env.CloudName}`}>
                      {
                        <div key={this.props.singleRecipe.recipeId}>
                          <h1 className="text-center obj-color">{this.props.singleRecipe.title}</h1>
                          <div className="text-center p-2">
                            <Image publicId={this.props.singleRecipe.publicId}>
                              <Transformation
                                crop="scale"
                                width="300"
                                height="200"
                                dpr="auto"
                                responsive_placeholder="blank"
                              />
                            </Image>
                          </div>
                          <h6 className="text-muted text-center">by: {this.props.singleRecipe.fullname}</h6>
                          <br />
                          <p>{this.props.singleRecipe.description}</p>
                        </div>
                      }
                      <hr />
                      <div className="clearfix" />
                      <ul className="list-inline">
                        <li className="list-inline-item"><Link className="btn btn-sm" to="#" onClick={this.upvote} title="Upvote"><i className={this.state.upvote} /></Link><span className="badge badge-info" title="Upvotes">{this.state.upvoteCount}</span>&nbsp; </li>
                                            |
                        <li className="list-inline-item"><Link className="btn btn-sm" to="#" onClick={this.downVote} title="Downvote"><i className={this.state.downvote} /></Link><span className="badge badge-info" title="Downvotes">{this.state.downvoteCount}</span>&nbsp; </li>
                                            |
                        <li className="list-inline-item"><Link className="btn btn-sm" to="#" title="Views"><i className="fa fa-2x fa-eye obj-color" /></Link><span className="badge badge-info" title="Views">30</span></li>

                        <li className="list-inline-item float-right"><Link className="btn btn-sm" onClick={this.favoriteRecipe} to="#" title="Favorite"><i className={this.state.favoriteIcon} /></Link></li>
                      </ul>
                      <br />
                      <form className="mb-3" onSubmit={this.onSubmit}>
                        <h3>Post a Review</h3>
                        <div className="form-group">
                          <textarea
                            value={this.state.Review}
                            onChange={this.onChange}
                            name="Review"
                            className="form-control"
                            rows="6"
                            required />
                        </div>
                        <button type="submit" className="btn btn-primary">Post Review</button>
                      </form>
                      <h3>REVIEWS</h3>
                      {
                        this.props.showReview.map(data => (
                          <div key={data.id}>
                            <div className="d-flex flex-row">
                              <div className="p-2 align-self-start">
                                <Image publicId={this.props.user.publicUrl}>
                                  <Transformation
                                    crop="scale"
                                    width="30"
                                    height="30"
                                    dpr="auto"
                                    responsive_placeholder="blank"
                                  />
                                </Image>
                              </div>
                              <div className="p-2 align-self-end">
                                <h4><a to="#">{this.props.user.fullname}</a></h4>
                                <small className="text-muted">{data.createdAt}</small>
                                <p>{data.review}</p>
                              </div>
                            </div>
                          </div>
                        )
                        )}
                    </CloudinaryContext>
                    <br />

                  </div>
              }
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

RecipeDetail.propTypes = {
  viewSingleRecipe: PropTypes.func.isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
  reviewRecipe: PropTypes.func.isRequired,
  viewAllReviews: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  getFavorite: PropTypes.func.isRequired,
  showReview: PropTypes.array.isRequired,
  favoriteData: PropTypes.array.isRequired,
  singleRecipe: PropTypes.object.isRequired,
  vote: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired
    })
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  showReview: state.review,
  favoriteData: state.favorite,
  singleRecipe: state.singleRecipe,
  vote: state.vote,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  viewSingleRecipe: Id => dispatch(recipesActions.viewSingleRecipe(Id)),
  upvoteRecipe: id => dispatch(recipesActions.upvoteRecipe(id)),
  downvoteRecipe: id => dispatch(recipesActions.downvoteRecipe(id)),
  reviewRecipe: (Id, reviews) => dispatch(reviewActions.reviewRecipe(Id, reviews)),
  viewAllReviews: (Id) => dispatch(reviewActions.viewAllReviews(Id)),
  addFavorite: (Id, category) => dispatch(favoriteActions.addToFavorites(Id, category)),
  getFavorite: (Id) => dispatch(favoriteActions.getUserFavorite(Id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
