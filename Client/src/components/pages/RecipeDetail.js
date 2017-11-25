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
import SideBar from './SideBar';
import { Footer } from './Footer';


class RecipeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeDetail: [],
            votes: [],
            upvote: 'fa fa-2x fa-thumbs-o-up',
            downvote: 'fa fa-2x fa-thumbs-o-down',
            favoriteIcon: 'fa fa-2x fa-star-o',
            Review: '',
            allReviews: [],
            Category: 'Soup',
        }
        this.upvote = this.upvote.bind(this);
        this.downVote = this.downVote.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.favoriteRecipe = this.favoriteRecipe.bind(this);
    }

    componentWillMount() {
        const recipeId = this.props.match.params.recipeId;
        this.props.viewSingleRecipe(recipeId).then( 
            () => {
                console.log(this.props.viewRecipe)
            this.setState({ recipeDetail: this.props.viewRecipe })
            if (!isEmpty(this.state.recipeDetail.Votes)) {
                if (this.state.recipeDetail.Votes[this.state.recipeDetail.Votes.length - 1].userId === jwt.decode(localStorage.jwtToken).userId && 
                    this.state.recipeDetail.recipeId === this.props.match.params.recipeId &&
                    this.state.recipeDetail.Votes[this.state.recipeDetail.Votes.length - 1].vote === true) {
                        this.setState({ upvote: 'fa fa-2x fa-thumbs-up' })
                    } else if (this.state.recipeDetail.votes[this.state.recipeDetail.Votes.length - 1].userId === jwt.decode(localStorage.jwtToken).userId && 
                        this.state.recipeDetail.recipeId === this.props.match.params.recipeId &&
                        this.state.recipeDetail.Votes[this.state.recipeDetail.Votes.length - 1].vote === false) {
                            this.setState({ downvote: 'fa fa-2x fa-thumbs-down' })
                        }
                    }
          })

          this.props.viewAllReviews().then(
              () => {
                  this.setState({ allReviews: this.props.showReview })
                  })

          this.props.getFavorite(recipeId).then(
              () => {
                  console.log(this.props.favoriteData);
                this.setState({ favorite: this.props.favoriteData.favorite })
                if (!isEmpty(this.state.favorite)) {
                    if (this.state.favorite.userId === jwt.decode(localStorage.jwtToken).userId && 
                        this.state.favorite.recipeId === this.props.match.params.recipeId) {
                            this.setState({ favoriteIcon: 'fa fa-2x fa-star' })
                        } else {
                            this.setState({ favoriteIcon: 'fa fa-2x fa-star-o' })
                        }
                        }
              })
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    favoriteRecipe(){
        const recipeId = this.state.recipeDetail.recipeId
        const data = {
            Category: this.state.Category
        }
        this.props.addFavorite(recipeId, data).then(
            () => {
                this.props.getFavorite(recipeId).then(
                    () => {
                    if (!isEmpty(this.props.favoriteData.favorite)) {
                        if (this.props.favoriteData.favorite.userId === jwt.decode(localStorage.jwtToken).userId && 
                            this.props.favoriteData.favorite.recipeId === this.props.match.params.recipeId) {
                                this.setState({ favoriteIcon: 'fa fa-2x fa-star' })
                            }
                        } else {
                            this.setState({ favoriteIcon: 'fa fa-2x fa-star-o' })
                        }
                    })
                    toastr.success(this.props.favoriteData.message);
            },
            (err) => {
                toastr.error(err.response.data.message);
            }
        )
    }

    upvote(){
        this.props.upvoteRecipe(this.state.recipeDetail.recipeId).then( 
            () => {
                    setTimeout(() => { this.props.viewSingleRecipe(this.state.recipeDetail.recipeId).then( 
                        () => {
                        this.setState({ recipeDetail: this.props.viewRecipe })
                        this.setState({ votes: this.state.recipeDetail.Votes[this.state.recipeDetail.Votes.length - 1] })
                        if (!isEmpty(this.state.votes)) {
                            if (this.state.votes.userId === jwt.decode(localStorage.jwtToken).userId && 
                                this.state.votes.recipeId === this.props.match.params.recipeId) {
                                this.setState({ upvote: 'fa fa-2x fa-thumbs-up' })
                                this.setState({ downvote: 'fa fa-2x fa-thumbs-o-down' })
                            }
                            
                        } else if (isEmpty(this.state.votes)){
                            this.setState({ upvote: 'fa fa-2x fa-thumbs-o-up' })
                            this.setState({ downvote: 'fa fa-2x fa-thumbs-o-down' })
                        }
                    })}, 1000)
                toastr.success(this.props.viewRecipe.message);
            },
            (err) => {
                toastr.error(err.response.data.message);
            })
    }

    downVote(){
        this.props.downvoteRecipe(this.state.recipeDetail.recipeId).then( 
            () => {
                    setTimeout(() => {
                        this.props.viewSingleRecipe(this.state.recipeDetail.recipeId).then( 
                        (res) => {
                        this.setState({ recipeDetail: this.props.viewRecipe })
                        this.setState({ votes: this.state.recipeDetail.Votes[this.state.recipeDetail.Votes.length - 1] })
                        if (!isEmpty(this.state.votes)) {
                            if (this.state.votes.userId === jwt.decode(localStorage.jwtToken).userId && 
                                this.state.votes.recipeId === this.props.match.params.recipeId) {
                                this.setState({ downvote: 'fa fa-2x fa-thumbs-down' })
                                this.setState({ upvote: 'fa fa-2x fa-thumbs-o-up' })
                            }
                        } else if (isEmpty(this.state.votes)){
                            this.setState({ upvote: 'fa fa-2x fa-thumbs-o-up' })
                            this.setState({ downvote: 'fa fa-2x fa-thumbs-o-down' })
                        }
                    })}, 1000)
                    toastr.success(this.props.viewRecipe.message);
                    console.log(this.props.viewRecipe.message)
                },
                (err) => {
                    toastr.error(err.response.data.message);
                })
        }

    onSubmit(e){
        e.preventDefault();
        const recipeId = this.props.match.params.recipeId;
        const data = {
            Review: this.state.Review
        }
        this.props.reviewRecipe(recipeId, data)
        .then(
            () => this.setState({ Review: '' }),
            (err) => this.setState({ errors: err.response.data})
        )
        this.props.viewAllReviews().then(
            () => {
                console.log(this.props.showReview)
                this.setState({ allReviews: this.props.showReview })
            }
        )
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
                                <CloudinaryContext cloudName={`${process.env.CloudName}`}>
                                        {
                                            <div key={this.state.recipeDetail.recipeId}>
                                                <h1 className="text-center obj-color">{this.state.recipeDetail.title}</h1>
                                                <div className="text-center p-2">
                                                    <Image publicId={this.state.recipeDetail.publicId}>
                                                        <Transformation
                                                            crop="scale"
                                                            width="300"
                                                            height="200"
                                                            dpr="auto"
                                                            responsive_placeholder="blank"
                                                        />
                                                    </Image>
                                                </div>
                                                <h6 className="text-muted text-center">by: {this.state.recipeDetail.fullname}</h6>
                                                <br />
                                                <p>{this.state.recipeDetail.description}</p>
                                            </div>
                                        }
                                        <hr />
                                        <div className="clearfix"></div>
                                        <ul className="list-inline">
                                            <li className="list-inline-item"><Link className="btn btn-sm" to="#" onClick={this.upvote} title="Upvote"><i className={this.state.upvote}></i></Link><span className="badge badge-info" title="Upvotes">{this.state.recipeDetail.upvotes}</span>&nbsp; </li>
                                            |
                                            <li className="list-inline-item"><Link className="btn btn-sm" to="#" onClick={this.downVote} title="Downvote"><i className={this.state.downvote}></i></Link><span className="badge badge-info" title="Downvotes">{this.state.recipeDetail.downvotes}</span>&nbsp; </li>
                                            |
                                            <li className="list-inline-item"><Link className="btn btn-sm" to="#" title="Views"><i className="fa fa-2x fa-eye obj-color"></i></Link><span className="badge badge-info" title="Views">30</span></li>
                
                                            <li className="list-inline-item float-right"><Link className="btn btn-sm" onClick={this.favoriteRecipe} to="#" title="Favorite"><i className={this.state.favoriteIcon}></i></Link></li>
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
                                                    rows='6'
                                                    required ></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Post Review</button>
                                        </form>
                                        <h3>REVIEWS</h3>
                                        {
                                            this.state.allReviews.map(data => {
                                            return (
                                                <div key={data.id}>
                                                    <div className="d-flex flex-row">
                                                        <div className="p-2 align-self-start">
                                                            <Image publicId={data.User.publicUrl}>
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
                                                            <h4><a to="#">{data.User.fullname}</a></h4>                
                                                            <small className="text-muted">{data.createdAt}</small>                    
                                                            <p>{data.review}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        )}
                                    </CloudinaryContext>
                                <br />

                             </div>
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
    getFavorite: PropTypes.func.isRequired
  }

  function mapStateToProps(state, ownProps) {
      return {
          viewRecipe: state.recipe,
          showReview: state.review,
          favoriteData: state.favorite
      }
  }

  function mapDispatchToProps(dispatch) {
      return {
        viewSingleRecipe: Id => dispatch(recipesActions.viewSingleRecipe(Id)),
        upvoteRecipe: id => dispatch(recipesActions.upvoteRecipe(id)),
        downvoteRecipe: id => dispatch(recipesActions.downvoteRecipe(id)),
        reviewRecipe: (Id, reviews) => dispatch(reviewActions.reviewRecipe(Id, reviews)),
        viewAllReviews: () => dispatch(reviewActions.viewAllReviews()),
        addFavorite: (Id, category) => dispatch(favoriteActions.addToFavorites(Id, category)),
        getFavorite: (Id) => dispatch(favoriteActions.getSingleFavorite(Id))
      }
  }
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
