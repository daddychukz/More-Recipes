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
import Header from './Header';
import { Footer } from './Footer';


class RecipeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeDetail: [],
            votes: [],
            upvote: 'fa fa-2x fa-thumbs-o-up',
            downvote: 'fa fa-2x fa-thumbs-o-down',
            review: '',
            allReviews: []
        }
        this.upvote = this.upvote.bind(this);
        this.downVote = this.downVote.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        const recipeId = this.props.match.params.recipeId;
        this.props.viewSingleRecipe(recipeId).then( 
            () => {
             //   console.log(this.props.viewRecipe[0])
            this.setState({ recipeDetail: this.props.viewRecipe[0] })
            if (!isEmpty(this.state.recipeDetail.votes)) {
                if (this.state.recipeDetail.votes[this.state.recipeDetail.votes.length - 1].userId === jwt.decode(localStorage.jwtToken).userId && 
                    this.state.recipeDetail.recipeId === this.props.match.params.recipeId &&
                    this.state.recipeDetail.votes[this.state.recipeDetail.votes.length - 1].vote === true) {
                        this.setState({ upvote: 'fa fa-2x fa-thumbs-up' })
                    } else if (this.state.recipeDetail.votes[this.state.recipeDetail.votes.length - 1].userId === jwt.decode(localStorage.jwtToken).userId && 
                        this.state.recipeDetail.recipeId === this.props.match.params.recipeId &&
                        this.state.recipeDetail.votes[this.state.recipeDetail.votes.length - 1].vote === false) {
                            this.setState({ downvote: 'fa fa-2x fa-thumbs-down' })
                        }
            }
          })
          this.props.viewAllReviews().then(
              () => {
                  this.setState({ allReviews: this.props.showReview })
                  })
        
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    upvote(){
        this.props.upvoteRecipe(this.state.recipeDetail.recipeId).then( 
            () => {
                    setTimeout(() => { this.props.viewSingleRecipe(this.state.recipeDetail.recipeId).then( 
                        () => {
                        this.setState({ recipeDetail: this.props.viewRecipe[0] })
                        this.setState({ votes: this.state.recipeDetail.votes[this.state.recipeDetail.votes.length - 1] })
                        if (!isEmpty(this.state.votes)) {
                            if (this.state.votes.userId === jwt.decode(localStorage.jwtToken).userId && 
                                this.state.votes.recipeId === this.props.match.params.recipeId) {
                                this.setState({ upvote: 'fa fa-2x fa-thumbs-up' })
                                this.setState({ downvote: 'fa fa-2x fa-thumbs-o-down' })
                            }
                            
                        }
                    })}, 1000)
                toastr.success(this.props.viewRecipe.Message);
            },
            (err) => {
                toastr.error(err.response.data.Message);
            })
    }

    downVote(){
        this.props.downvoteRecipe(this.state.recipeDetail.recipeId).then( 
            () => {
                    setTimeout(() => {
                        this.props.viewSingleRecipe(this.state.recipeDetail.recipeId).then( 
                        (res) => {
                        this.setState({ recipeDetail: this.props.viewRecipe[0] })
                        this.setState({ votes: this.state.recipeDetail.votes[this.state.recipeDetail.votes.length - 1] })
                        if (!isEmpty(this.state.votes)) {
                            if (this.state.votes.userId === jwt.decode(localStorage.jwtToken).userId && 
                                this.state.votes.recipeId === this.props.match.params.recipeId) {
                                this.setState({ downvote: 'fa fa-2x fa-thumbs-down' })
                                this.setState({ upvote: 'fa fa-2x fa-thumbs-o-up' })
                            }
                        }
                    })}, 1000)
                    toastr.success(this.props.viewRecipe.Message);
                    console.log(this.props.viewRecipe.Message)
                },
                (err) => {
                    toastr.error(err.response.data.Message);
                })
        }

    onSubmit(e){
        e.preventDefault();
        const recipeId = this.props.match.params.recipeId;
        const data = {
            review: this.state.review
        }
        this.props.reviewRecipe(recipeId, data)
        .then(
            () => this.setState({ review: '' }),
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
                                                <h6 className="text-muted text-center">by: {this.state.recipeDetail.fullName}</h6>
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
                
                                            <li className="list-inline-item float-right"><Link className="btn btn-sm" to="#" title="Favorite" data-toggle="modal" data-target="#favorite"><i className="fa fa-2x fa-star-o"></i></Link></li>
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
                                                    rows='6'
                                                    required ></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Post Review</button>
                                        </form>
                                        <h3>Reviews</h3>
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
                                                            <h3><a to="#">{data.User.fullName}</a></h3>                
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

RecipeDetail.propTypes = {
    viewSingleRecipe: PropTypes.func.isRequired,
    upvoteRecipe: PropTypes.func.isRequired,
    downvoteRecipe: PropTypes.func.isRequired,
    reviewRecipe: PropTypes.func.isRequired,
    viewAllReviews: PropTypes.func.isRequired
  }

  function mapStateToProps(state, ownProps) {
      return {
          viewRecipe: state.recipe,
          showReview: state.review
      }
  }

  function mapDispatchToProps(dispatch) {
      return {
        viewSingleRecipe: Id => dispatch(recipesActions.viewSingleRecipe(Id)),
        upvoteRecipe: id => dispatch(recipesActions.upvoteRecipe(id)),
        downvoteRecipe: id => dispatch(recipesActions.downvoteRecipe(id)),
        reviewRecipe: (Id, reviews) => dispatch(reviewActions.reviewRecipe(Id, reviews)),
        viewAllReviews: () => dispatch(reviewActions.viewAllReviews())
      }
  }
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
