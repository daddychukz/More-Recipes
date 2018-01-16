import React from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createBrowserHistory from 'history/createBrowserHistory';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import * as userActions from '../../actions/userActions';
import SideBar from './SideBar';
import Footer from './Footer';
import HeaderProfile from './HeaderProfile';

const customHistory = createBrowserHistory({
  forceRefresh: true
});

/**
 * 
 * 
 * @class MyProfile
 * @extends {React.Component}
 */
class MyProfile extends React.Component {
  /**
   * Creates an instance of MyProfile.
   * @param {any} props 
   * @memberof MyProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      imageUrl: '',
      publicId: '',
      UserName: '',
      About: '',
      Hobbies: '',
      Phone: '',
      Address: '',
      isLoading: true
    };
    this.uploadWidget = this.uploadWidget.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * dispatches actions that makes request to get users profile
   * @method componentWillMount
   * @memberof MyProfile
   * @returns {void}
   */
  componentWillMount() {
    const decodedUserId = jwt.decode(localStorage.jwtToken).userId;
    this.props.getUserProfile(decodedUserId).then(
      () => {
        this.setState({ profile: this.props.profile });
        console.log(this.state.profile);
        this.setState({
          imageUrl: this.state.profile.imageUrl,
          publicId: this.state.profile.publicUrl,
          UserName: this.state.profile.username,
          About: this.state.profile.about,
          Hobbies: this.state.profile.hobbies,
          Phone: this.state.profile.phone,
          Address: this.state.profile.address,
          isLoading: false
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * uploadWidget
   * uploads user profile photo
   * @method uploadWidget
   * @memberof MyProfile
   * @returns {object} component
   */
  uploadWidget() {
    window.cloudinary.openUploadWidget({
      cloud_name: process.env.CloudName,
      upload_preset: process.env.UploadPreset,
      tags: ['daddy'] },
    (error, result) => {
      console.log(result[0]);
      this.setState({ imageUrl: result[0].secure_url, publicId: result[0].public_id });
    });
  }

  /**
   * logs out a user
   * @returns {void}
   * @param {any} e 
   * @memberof MyProfile
   */
  logout(e) {
    this.props.logout();
    customHistory.push('/');
  }

  /**
   * 
   * @returns {void}
   * @param {any} e 
   * @memberof MyProfile
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * submits updated user details
   * @returns {object} userProfile
   * @param {any} e 
   * @memberof MyProfile
   */
  onSubmit(e) {
    e.preventDefault();
    const decodedUserId = jwt.decode(localStorage.jwtToken).userId;
    const data = {
      imageUrl: this.state.imageUrl,
      publicId: this.state.publicId,
      UserName: this.state.UserName,
      About: this.state.About,
      Hobbies: this.state.Hobbies,
      Phone: this.state.Phone,
      Address: this.state.Address
    };
    this.props.updateUserProfile(decodedUserId, data).then(
      () => {
        console.log(this.props.profile);
      });
  }

  /**
   * 
   * @method render
   * @returns {component} MyProfile
   * @memberof MyProfile
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <HeaderProfile />

        <header id="header" />

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
              {
                this.state.isLoading ?
                  <div className="loader" /> :
                  <div className="col-md-8" id="display">
                    <CloudinaryContext cloudName={`${process.env.CloudName}`}>
                      {
                        <div key={this.state.profile.userId}>
                          <div className="d-flex flex-row">
                            <div className="p-2 align-self-start">
                              {
                                this.state.profile.publicUrl === "user-male_jvc8hn.jpg" ?
                                  <img src={this.state.profile.imageUrl} alt="myPix" width="250" height="300" /> :
                                  <Image publicId={this.state.profile.publicUrl}>
                                    <Transformation
                                      crop="scale"
                                      width="250"
                                      height="300"
                                      dpr="auto"
                                      responsive_placeholder="blank"
                                    />
                                  </Image>
                              // <img src={this.state.imageUrl} alt="myPix" width="250" height="300" />
                              }
                            </div>
                            <div className="p-2 align-self-end">
                              <p><span className="obj-color">About:</span>&nbsp; {this.state.profile.about}</p>
                              <p><span className="obj-color">Hobbies:</span>&nbsp; {this.state.profile.hobbies}</p>
                              <p><i className="fa fa-envelope-o obj-color" aria-hidden="true" />&nbsp; {this.state.profile.email}</p>
                              <address><i className="fa fa-map-marker obj-color" aria-hidden="true" />&nbsp; {this.state.profile.address}</address>
                              <p><i className="fa fa-phone obj-color" aria-hidden="true" />&nbsp;{this.state.profile.phone}</p>
                              <p><i className="fa fa-user obj-color" aria-hidden="true" />&nbsp; {this.state.profile.username}</p>
                              <Link className="btn btn-info" to="#" role="button" data-toggle="modal" data-target="#changePassword">Change Password</Link>
                            </div>
                          </div>
                        </div>
                      }
                    </CloudinaryContext>
                  </div>
              }
            </div>
          </div>
        </section>

        <Footer />
        <div className="modal fade text-dark" id="profileModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h5 className="modal-title" style={{ color: 'white' }} id="contactModalTitle">
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
                    <label htmlFor="name">Phone Number</label>
                    <input
                      value={this.state.Phone}
                      onChange={this.onChange}
                      type="number"
                      name="Phone"
                      className="form-control"
                      required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Hobbies</label>
                    <input
                      value={this.state.Hobbies}
                      onChange={this.onChange}
                      type="text"
                      name="Hobbies"
                      className="form-control"
                      required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">About</label>
                    <input
                      value={this.state.About}
                      onChange={this.onChange}
                      type="text"
                      name="About"
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
                      required />
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
  logout: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  profile: state.user,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: (Id) => dispatch(userActions.getUserProfile(Id)),
  updateUserProfile: (Id, data) => dispatch(userActions.updateUserProfile(Id, data)),
  logout: () => dispatch(userActions.logout())
});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

