import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createBrowserHistory from 'history/createBrowserHistory';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import * as userActions from '../../actions/userActions';
import Header from './Header';
import SideBar from './SideBar';
import { Footer } from './Footer';

const customHistory = createBrowserHistory({
    forceRefresh: true
});


class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            imageUrl: '',
            publicId: '',
            UserName: '',
            Email: '',
            Sex: '',
            Number: '',
            Address: ''
        }
        this.uploadWidget = this.uploadWidget.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        const decodedUserId = jwt.decode(localStorage.jwtToken).userId
        this.props.getUserProfile(decodedUserId).then(
            () => {
                this.setState({ profile: this.props.profile })
                console.log(this.state.profile)
                this.setState({ imageUrl: this.state.profile.imageUrl, publicId: this.state.profile.publicUrl })
            })
            .catch((error) => {
                console.log(error);
            })
        }

        uploadWidget() {
            window.cloudinary.openUploadWidget({ 
                cloud_name: process.env.CloudName,
                upload_preset: process.env.UploadPreset,
                tags:['daddy']},
                (error, result) => {
                    console.log(result[0]),
                    this.setState({ imageUrl: result[0].secure_url, publicId: result[0].public_id })
                });
        }

        logout(e) {
            this.props.logout();
            customHistory.push('/')
        }

        onChange(e){
            this.setState({ [e.target.name]: e.target.value })
        }

        onSubmit(e) {
            e.preventDefault();
            const decodedUserId = jwt.decode(localStorage.jwtToken).userId
            const data = {
                imageUrl: this.state.imageUrl,
                publicId: this.state.publicId,
                UserName: this.state.UserName,
                Email: this.state.Email,
                Sex: this.state.Sex,
                Number: this.state.Number,
                Address: this.state.Address
            }
            this.props.updateUserProfile(decodedUserId, data).then(
                () => {
                    console.log(this.props.profile)
                })
        }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
                    <div className="container">
                        <Link to={'/recipe-box'} className="navbar-brand"><h1 id="logo">More-Recipes</h1></Link>
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={'/recipe-box'}  className="nav-link active">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/add-recipe'} className="nav-link">Add Recipe</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/my-recipe'} className="nav-link">My Recipes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/my-favorite'} className="nav-link">Favorites</Link>
                                </li>
                                <li className="nav-item">
                                    <div className="btn-group open">
                                        <i className="fa fa-user-circle fa-2x pull-right" data-toggle="dropdown" aria-hidden="true"></i>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to={'/my-profile'}>Profile</Link></li>
                                            <li className="divider"></li>
                                            <li><Link className="dropdown-item" to='#' data-toggle="modal" data-target="#profileModal">Edit Profile</Link></li>
                                            <li><Link className="dropdown-item" to={'/'} onClick={this.logout.bind(this)}>Logout</Link></li>
                                        </ul>
                                    </div>                                                        
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                
                <header id="header">
                
                </header>
                
                 {/* BREADCRUMB  */}
                <div className="container">
                    <nav className="breadcrumb">            
                        <Link className="breadcrumb-item" to={'/recipe-box'}>Home</Link>
                        <span className="breadcrumb-item active">My Profile</span>            
                    </nav>  
                </div>
        
                 {/* MAIN SECTION  */}
                <section>
                    <div className="container">
                        <div className="row">
                            <SideBar />
        
                            {/* PROFILE */}
                            <div className="col-md-8" id="display">
                                <CloudinaryContext cloudName={`${process.env.CloudName}`}>
                                    {
                                        <div key={this.state.profile.userId}>
                                            <div className="d-flex flex-row">
                                                <div className="p-2 align-self-start">
                                                    <Image publicId={this.state.profile.publicUrl}>
                                                        <Transformation
                                                            crop="scale"
                                                            width="250"
                                                            height="300"
                                                            dpr="auto"
                                                            responsive_placeholder="blank"
                                                        />
                                                    </Image>
                                                </div>
                                                <div className="p-2 align-self-end">                             
                                                    <p><span className="obj-color">About:</span>&nbsp; Software Developer</p>
                                                    <p><span className="obj-color">Hobbies:</span>&nbsp; Programming, Singing</p>
                                                    <p><i className="fa fa-envelope-o obj-color" aria-hidden="true"></i>&nbsp; {this.state.profile.email}</p>                                   
                                                    <address><i className="fa fa-map-marker obj-color" aria-hidden="true"></i>&nbsp; {this.state.profile.address}</address>                          
                                                    <p><i className="fa fa-phone obj-color" aria-hidden="true"></i>&nbsp; 0{this.state.profile.phone}</p>
                                                    <p><i className="fa fa-user obj-color" aria-hidden="true"></i>&nbsp; {this.state.profile.username}</p>
                                                    <Link className="btn btn-info" to="#" role="button" data-toggle="modal" data-target="#changePassword">Change Password</Link>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </CloudinaryContext>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
                <div className="modal fade text-dark" id="profileModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h5 className="modal-title" style={{color:'white'}} id="contactModalTitle">
                                    Edit Profile
                                </h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Username</label>
                                        <input 
                                            value={this.state.UserName}
                                            onChange={this.onChange}
                                            type="text" 
                                            name="UserName"
                                            className="form-control"
                                            required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            value={this.state.Email}
                                            onChange={this.onChange}
                                            type="email"
                                            name="Email"
                                            className="form-control"
                                            required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Phone Number</label>
                                        <input 
                                            value={this.state.Number}
                                            onChange={this.onChange}
                                            type="number"
                                            name="Number"
                                            className="form-control"
                                            required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Sex</label>
                                        <input
                                            value={this.state.Sex}
                                            onChange={this.onChange}
                                            type="text"
                                            name="Sex"
                                            className="form-control"
                                            required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="messager">Address</label>
                                        <textarea
                                            value={this.state.Address}
                                            onChange={this.onChange}
                                            name="Address"
                                            className="form-control"
                                            required>
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <CloudinaryContext cloudName={`${process.env.CloudName}`}>
                                            <Image publicId={this.state.publicId}>
                                                <Transformation
                                                    crop="scale"
                                                    width="100"
                                                    height="100"
                                                    dpr="auto"
                                                    responsive_placeholder="blank"
                                                />
                                            </Image>
                                        </CloudinaryContext>
                                        <input className="form-control-file" onClick={this.uploadWidget} type="button" value="Upload Image" />
                                        <small id="fileHelp" className="form-text text-muted">Upload profile picture</small>
                                        {/* {errors.message && <InlineError text={errors.message}/>} */}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="mt-2 btn btn-primary btn-block">Update</button>
                                        <button type="button" className="btn btn-primary btn-block" data-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MyProfile.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    updateUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  function mapStateToProps(state, ownProps) {
      return {
          profile: state.user,
          auth: state.auth
      }
  }

  function mapDispatchToProps(dispatch) {
      return {
          getUserProfile: (Id) => dispatch(userActions.getUserProfile(Id)),
          updateUserProfile: (Id, data) => dispatch(userActions.updateUserProfile(Id, data)),
          logout: () => dispatch(userActions.logout())
      }
  }
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

// export default MyProfile;
