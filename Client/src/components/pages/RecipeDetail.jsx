import React from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { viewSingleRecipe } from '../../actions/recipeActions';
import * as reviewActions from '../../actions/reviewActions';
import * as favoriteActions from '../../actions/favoriteActions';
import * as voteActions from '../../actions/voteActions';
import Header from './Header';
import SideBar from './SideBar';
import FavoriteRecipeModal from '../modals/FavoriteRecipeModal';

/**
 * @class RecipeDetail
 *
 * @extends {React.Component}
 */
class RecipeDetail extends React.Component {
  /**
   * @param {any} props
   *
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
      review: '',
      category: '',
      selectCategory: '',
      upvoteCount: 0,
      downvoteCount: 0,
      isLoading: true,
      favorited: false,
      isDisabled: false
    };
    this.upvote = this.upvote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onInput = this.onInput.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
    this.getUniqueCategories = this.getUniqueCategories.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  /**
   * @description life cycle method called before component mounts the DOM
   *
   * @memberof RecipeDetail
   *
   * @returns {object} fetches a single recipe
   * @returns {object} fetches all reviews for the recipe
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
            if (recipeVotes[recipeVotes.length - 1].userId ===
              this.props.user.userId && this.props.singleRecipe.recipeId ===
              this.props.match.params.recipeId &&
              recipeVotes[recipeVotes.length - 1].vote === true) {
              this.setState({ upvote: 'fa fa-2x fa-thumbs-up', upvoted: true });
            } else if (recipeVotes[recipeVotes.length - 1].userId ===
              this.props.user.userId && this.props.singleRecipe.recipeId ===
              this.props.match.params.recipeId &&
              recipeVotes[recipeVotes.length - 1].vote === false) {
              this.setState({
                downvote: 'fa fa-2x fa-thumbs-down',
                downvoted: true
              });
            }
          }
        });

    this.props.viewAllReviews(recipeId);

    const isFavorited = recipe => recipe.recipeId ===
    this.props.match.params.recipeId &&
    recipe.userId === this.props.user.userId;

    this.props.getFavorite(userId).then(
      () => {
        if (this.props.favoriteData.find(isFavorited)) {
          this.setState({ favoriteIcon: 'fa fa-2x fa-star', favorited: true });
        } else {
          this.setState({
            favoriteIcon: 'fa fa-2x fa-star-o',
            favorited: false });
        }
      }
    );
  }

  /**
   * @description called when component receives new propTypes
   *
   * @param {Object} nextProps
   *
   * @returns {object} fetches a single recipe
   * @returns {object} fetches all reviews for the recipe
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
            if (recipeVotes[recipeVotes.length - 1].userId ===
              this.props.user.userId && this.props.singleRecipe.recipeId ===
              this.props.match.params.recipeId &&
              recipeVotes[recipeVotes.length - 1].vote === true) {
              this.setState({ upvote: 'fa fa-2x fa-thumbs-up' });
            } else if (recipeVotes[recipeVotes.length - 1].userId ===
              this.props.user.userId &&
              this.props.singleRecipe.recipeId ===
              this.props.match.params.recipeId &&
              recipeVotes[recipeVotes.length - 1].vote === false) {
              this.setState({ downvote: 'fa fa-2x fa-thumbs-down' });
            } else {
              this.setState({ downvote: 'fa fa-2x fa-thumbs-o-down',
                upvote: 'fa fa-2x fa-thumbs-o-up' });
            }
          } else {
            this.setState({ downvote: 'fa fa-2x fa-thumbs-o-down',
              upvote: 'fa fa-2x fa-thumbs-o-up' });
          }
        });
      this.props.viewAllReviews(recipeId);

      const isFavorited = recipe => recipe.recipeId ===
        this.props.match.params.recipeId && recipe.userId ===
        this.props.user.userId;

      this.props.getFavorite(userId).then(
        () => {
          if (this.props.favoriteData.find(isFavorited)) {
            this.setState({ favoriteIcon: 'fa fa-2x fa-star',
              favorited: true });
          } else {
            this.setState({ favoriteIcon: 'fa fa-2x fa-star-o',
              favorited: false });
          }
        }
      );
    }
  }

  /**
   * @description update component state when form value changes
   *
   * @param {any} event
   *
   * @memberof RecipeDetail
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description update component state when user searches
   *
   * @param {any} event
   *
   * @returns { void }
   */
  onInput(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      isDisabled: true,
      selectCategory: ''
    });
  }

  /**
   * @description adds a review to a recipe
   *
   * @param {any} event
   *
   * @returns {object} reviews
   */
  onSubmit(event) {
    event.preventDefault();
    const recipeId = this.props.match.params.recipeId;
    const review = {
      review: this.state.review
    };
    this.props.reviewRecipe(recipeId, review)
      .then(
        () => {
          this.setState({ review: '' });
        }
      );
  }

  /**
   * @description gets users categories without duplicate
   *
   * @memberof RecipeDetail
   *
   * @returns {array} uniqueCategories
   */
  getUniqueCategories() {
    const uniqueCategories = [...new Set(this.props.favoriteData.map(
      fav => fav.category))];
    return uniqueCategories;
  }

  /**
   * @description display modal to favorite a recipe
   *
   * @memberof RecipeDetail
   *
   * @returns {void}
   */
  openModal() {
    if (!this.state.favorited) {
      const uniqueCategories = [...new Set(this.props.favoriteData.map(
        fav => fav.category))];
      this.setState({
        selectCategory: uniqueCategories[0],
        isDisabled: false,
        category: '' });

      $('#category').modal('show');
    }
  }

  /**
   * @description enables user add recipe to favorite
   *
   * @memberof RecipeDetail
   *
   * @returns {object} favoriteRecipe
   */
  favoriteRecipe() {
    const recipeId = this.props.singleRecipe.recipeId;
    const isFavorited = recipe =>
      recipe.recipeId === this.props.match.params.recipeId &&
      recipe.userId === this.props.user.userId;

    const category = {
      category: this.state.category ?
        this.state.category : this.state.selectCategory
    };
    this.props.addFavorite(recipeId, category).then(
      () => {
        if (this.props.favoriteData.find(isFavorited)) {
          this.setState({ favoriteIcon: 'fa fa-2x fa-star', favorited: true });
        } else {
          this.setState({ favoriteIcon: 'fa fa-2x fa-star-o',
            favorited: false });
        }
      }
    );
  }

  /**
   * @description upvote a recipe
   *
   * @memberof RecipeDetail
   *
   * @returns {object} upvotes
   */
  upvote() {
    this.props.upvoteRecipe(this.props.match.params.recipeId)
      .then(
        () => {
          if (this.props.singleRecipe.value === 1) {
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
            toastr.success('You upvoted this recipe');
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
   * @description downvote a recipe
   *
   * @memberof RecipeDetail
   *
   * @returns {object} downvote
   */
  downVote() {
    this.props.downvoteRecipe(this.props.singleRecipe.recipeId)
      .then(
        () => {
          if (this.props.singleRecipe.value === 1) {
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
            toastr.success('You downvoted this recipe');
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
   * @description renders component to the DOM
   *
   * @memberof RecipeDetail
   *
   * @returns {JSX} JSX representation of component
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

                  <div className="col-md-12 col-lg-8" id="display">
                    <CloudinaryContext cloudName={process.env.CloudName}>
                      {
                        <div key={this.props.singleRecipe.recipeId}>
                          <h1
                            className="text-center obj-color"
                            style={{ wordWrap: 'break-word' }}
                          >
                            {this.props.singleRecipe.title}</h1>
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
                          <h6 className="text-muted text-center">
                            by:&nbsp;
                            {this.props.singleRecipe.fullname}
                          </h6>
                          <br />
                          <p
                            id="desc"
                            style={{ wordWrap: 'break-word' }}
                          >
                            {this.props.singleRecipe.description}</p>
                        </div>
                      }
                      <hr />
                      <div className="clearfix" />
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <Link
                            id="upvote"
                            className="btn btn-sm"
                            to="#"
                            onClick={this.upvote}
                            title="Upvote"
                          >
                            <i className={this.state.upvote} /></Link>
                          <span className="badge badge-info" title="Upvotes">{
                            this.state.upvoteCount}</span>&nbsp; </li>
                                            |
                        <li className="list-inline-item">
                          <Link
                            id="downvote"
                            className="btn btn-sm"
                            to="#"
                            onClick={this.downVote}
                            title="Downvote"
                          >
                            <i className={this.state.downvote} /></Link>
                          <span className="badge badge-info" title="Downvotes">
                            {this.state.downvoteCount}
                          </span>&nbsp; </li>
                                            |
                        <li className="list-inline-item">
                          <Link className="btn btn-sm" to="#" title="Views">
                            <i className="fa fa-2x fa-eye obj-color" /></Link>
                          <span className="badge badge-info" title="Views">
                            {this.props.singleRecipe.viewsCount}
                          </span></li>

                        <li className="list-inline-item float-right">
                          <Link
                            id="favorite"
                            onClick={this.openModal}
                            className="btn btn-sm"
                            to="#"
                            title="Favorite"
                          >
                            <i
                              id="favIcon"
                              className={this.state.favoriteIcon}
                            />
                          </Link></li>
                      </ul>
                      <br />
                      <form className="mb-3" onSubmit={this.onSubmit}>
                        <h3>Post a Review</h3>
                        <div className="form-group">
                          <textarea
                            value={this.state.review}
                            onChange={this.onChange}
                            name="review"
                            className="form-control"
                            rows="6"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >Post Review</button>
                      </form>
                      <br />
                      <h3>REVIEWS</h3>
                      <div
                        style={{
                          border: '#E9ECEF 1px solid',
                          backgroundColor: '#EAECEF',
                          maxHeight: '500px',
                          overflow: 'scroll',
                          wordBreak: 'break-all',
                        }}
                      >
                        {
                          this.props.showReview.map(reviews => (
                            <div key={reviews.id}>
                              <div className="d-flex flex-row">
                                <div className="p-2 align-self-start">
                                  <Image publicId={reviews.User.publicUrl}>
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
                                  <h5 id="fullname">{reviews.User.fullname}
                                  </h5>
                                  <small className="text-muted">
                                    {reviews.createdAt}
                                  </small>
                                  <p id="user-review">{reviews.review}</p>
                                </div>
                              </div>
                            </div>
                          )
                          )}
                      </div>
                    </CloudinaryContext>
                    <br />

                  </div>
              }
            </div>
          </div>
        </section>

        <FavoriteRecipeModal
          disabled={this.state.isDisabled}
          onChange={this.onChange}
          value={this.state.selectCategory}
          getUniqueCategories={this.getUniqueCategories()}
          onInput={this.onInput}
          onClick={this.favoriteRecipe}
          category={this.state.category}
        />
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
  showReview: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteData: PropTypes.arrayOf(PropTypes.object).isRequired,
  singleRecipe: PropTypes.shape({
    viewsCount: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    fullname: PropTypes.string,
    publicId: PropTypes.string,
    recipeId: PropTypes.string,
    value: PropTypes.number,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    Votes: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  user: PropTypes.shape({
    fullname: PropTypes.string,
    userId: PropTypes.string,
    publicUrl: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired
    })
  }).isRequired,
};

const mapStateToProps = state => ({
  showReview: state.review,
  favoriteData: state.favorite,
  singleRecipe: state.singleRecipe,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  viewSingleRecipe: Id => dispatch(viewSingleRecipe(Id)),
  upvoteRecipe: id => dispatch(voteActions.upvoteRecipe(id)),
  downvoteRecipe: id => dispatch(voteActions.downvoteRecipe(id)),
  reviewRecipe: (Id, reviews) => dispatch(
    reviewActions.reviewRecipe(Id, reviews)),
  viewAllReviews: Id => dispatch(reviewActions.viewAllReviews(Id)),
  addFavorite: (Id, category) => dispatch(
    favoriteActions.addToFavorites(Id, category)),
  getFavorite: Id => dispatch(favoriteActions.getUserFavorite(Id))
});

export { RecipeDetail as PureRecipeDetail };
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
