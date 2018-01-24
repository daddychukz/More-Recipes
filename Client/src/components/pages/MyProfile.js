import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import createBrowserHistory from 'history/createBrowserHistory';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import * as userActions from '../../actions/userActions';
import SideBar from './SideBar';
import Footer from './Footer';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import HeaderProfile from './HeaderProfile';
import EditProfileModal from '../modals/EditProfileModal';

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
      publicId: '',
      UserName: '',
      About: '',
      Hobbies: '',
      Phone: 0,
      Address: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
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
    const decodedUserId = this.props.profile.userId;
    this.props.getUserProfile(decodedUserId).then(
      () => {
        this.setState({
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
      this.setState({
        imageUrl: result[0].secure_url,
        publicId: result[0].public_id
      });
    });
  }

  changePassword = () => {
    const { newPassword, confirmPassword } = this.state;
    const data = {
      Password: this.state.newPassword,
      OldPassword: this.state.oldPassword,
      UserId: this.props.profile.userId
    };
    if (newPassword !== confirmPassword) {
      toastr.error('Passwords do not match');
    } else {
      this.props.resetPassword(data).then(
        () => this.setState({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }),
        (err) => {
          toastr.error(err.response.data.message);
          this.setState({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        }
      );
    }
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
    const decodedUserId = this.props.profile.userId;
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
                        <div key={this.props.profile.userId}>
                          <div className="d-flex flex-row">
                            <div className="p-2 align-self-start">
                              {
                                this.props.profile.publicUrl ===
                                "user-male_jvc8hn.jpg" ?
                                  <img
                                    src={this.props.profile.imageUrl}
                                    alt="myPix" width="250"
                                    height="300" /> :
                                  <Image publicId={this.props.profile.publicUrl}>
                                    <Transformation
                                      crop="scale"
                                      width="250"
                                      height="300"
                                      dpr="auto"
                                      responsive_placeholder="blank"
                                    />
                                  </Image>
                              }
                            </div>
                            <div className="p-2 align-self-end">
                              <p><span className="obj-color">About:</span>
                                &nbsp;
                                {this.props.profile.about}
                              </p>
                              <p>
                                <span className="obj-color">Hobbies:</span>
                                &nbsp;
                                {this.props.profile.hobbies}
                              </p>
                              <p>
                                <i className="fa fa-envelope-o obj-color"
                                  aria-hidden="true"/>&nbsp;
                                {this.props.profile.email}
                              </p>
                              <address>
                                <i className="fa fa-map-marker obj-color"
                                  aria-hidden="true" />&nbsp;
                                {this.props.profile.address}
                              </address>
                              <p>
                                <i className="fa fa-phone obj-color"
                                  aria-hidden="true" />&nbsp;
                                {this.props.profile.phone}
                              </p>
                              <p>
                                <i className="fa fa-user obj-color"
                                  aria-hidden="true" />&nbsp;
                                {this.props.profile.username}
                              </p>
                              <Link className="btn btn-info" to="#"
                                role="button" data-toggle="modal"
                                data-target="#changePassword">
                                Change Password
                              </Link>
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

        <ChangePasswordModal
          oldPassword={this.state.oldPassword}
          newPassword={this.state.newPassword}
          confirmPassword={this.state.confirmPassword}
          onClick={this.changePassword}
          onChange={this.onChange}/>

        <EditProfileModal
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          username={this.state.UserName}
          phone={this.state.Phone}
          hobbies={this.state.Hobbies}
          about={this.state.About}
          address={this.state.Address}
          publicID={this.state.publicId}
          uploadWidget={this.uploadWidget}/>
      </div>
    );
  }
}

MyProfile.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  profile: state.user
});

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: (Id) => dispatch(userActions.getUserProfile(Id)),
  resetPassword: password => dispatch(userActions.resetPassword(password)),
  updateUserProfile: (Id, data) => dispatch(userActions.updateUserProfile(Id, data)),
  logout: () => dispatch(userActions.logout())
});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

