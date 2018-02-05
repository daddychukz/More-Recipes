import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import customHistory from '../common/commonFunctions';
import * as userActions from '../../actions/userActions';
import SideBar from './SideBar';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import HeaderProfile from './HeaderProfile';
import EditProfileModal from '../modals/EditProfileModal';

/**
 * @class MyProfile
 *
 * @extends {React.Component}
 */
class MyProfile extends React.Component {
  /**
   * @param {any} props
   *
   * @memberof MyProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      PublicId: '',
      UserName: '',
      About: '',
      Hobbies: '',
      Phone: '',
      Address: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      isLoading: true
    };
    this.uploadWidget = this.uploadWidget.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  /**
   * @description life cycle method called before component mounts the DOM
   *
   * @method componentWillMount
   *
   * @memberof MyProfile
   *
   * @returns {object} fetches user profile information
   */
  componentWillMount() {
    this.props.getUserProfile().then(
      () => {
        this.setState({
          UserName: this.props.profile.username,
          Phone: this.props.profile.phone,
          Address: this.props.profile.address,
          About: this.props.profile.about,
          Hobbies: this.props.profile.hobbies,
          PublicId: this.props.profile.publicUrl,
          Email: this.props.profile.email,
          isLoading: false
        });
      })
      .catch(() => {});
  }

  /**
   * @description submits updated user details
   *
   * @param {any} event
   *
   * @memberof MyProfile
   *
   * @returns {object} userProfile
   */
  onSubmit(event) {
    event.preventDefault();
    const data = {
      ImageUrl: this.state.ImageUrl,
      PublicId: this.state.PublicId,
      UserName: this.state.UserName,
      About: this.state.About,
      Hobbies: this.state.Hobbies,
      Phone: this.state.Phone,
      Address: this.state.Address
    };
    this.props.updateUserProfile(data).then(
      () => {
        toastr.success('Profile updated successfully');
        $('#profileModal').modal('toggle');
      }
    );
  }

  /**
   * @description update component state when form value changes
   *
   * @param {any} event
   *
   * @memberof MyProfile
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description cloudinary image widget
   *
   * @memberof MyProfile
   *
   * @returns {void}
   */
  uploadWidget() {
    window.cloudinary.openUploadWidget({
      cloud_name: process.env.CloudName,
      upload_preset: process.env.UploadPreset,
      tags: ['daddy'] },
    (error, result) => {
      this.setState({
        ImageUrl: result[0].secure_url,
        PublicId: result[0].public_id
      });
    });
  }

  /**
   * @description changes user password
   *
   * @memberof MyProfile
   *
   * @returns {message} success message
   * @returns {message} error messsage
   */
  changePassword() {
    const { newPassword, confirmPassword } = this.state;
    const userData = {
      Password: this.state.newPassword,
      OldPassword: this.state.oldPassword,
      UserId: this.props.profile.userId,
    };
    if (newPassword !== confirmPassword) {
      toastr.error('Passwords do not match');
    } else {
      this.props.resetPassword(userData).then(
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
   * @description logs out a user
   *
   * @memberof MyProfile
   *
   * @returns {void}
   */
  logout() {
    this.props.logout();
    customHistory.push('/');
  }

  /**
   * @description renders component to the DOM
   *
   * @memberof MyProfile
   *
   * @returns {JSX} JSX representation of component
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
                  <div className="col-sm-12 col-md-12 col-lg-8" id="display">
                    <CloudinaryContext cloudName={`${process.env.CloudName}`}>
                      {
                        <div key={this.props.profile.userId}>
                          <div className="d-flex flex-row flex-wrap">
                            <div className="p-2 align-self-start">
                              {
                                this.props.profile.publicUrl ===
                                'user-male_jvc8hn.jpg' ?
                                  <img
                                    src={this.props.profile.imageUrl}
                                    alt="myPix"
                                    width="280"
                                    height="300"
                                  /> :
                                  <Image
                                    publicId={this.props.profile.publicUrl}
                                  >
                                    <Transformation
                                      crop="scale"
                                      width="300"
                                      height="300"
                                      dpr="auto"
                                      responsive_placeholder="blank"
                                    />
                                  </Image>
                              }
                            </div>
                            <div className="p-2 align-self-end">
                              <p>
                                <i
                                  className="fa fa-user obj-color"
                                  aria-hidden="true"
                                />&nbsp;
                                {this.props.profile.username}
                              </p>
                              <p><span className="obj-color">Name:</span>
                                &nbsp;
                                {this.props.profile.fullname}
                              </p>
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
                                <i
                                  className="fa fa-envelope-o obj-color"
                                  aria-hidden="true"
                                />&nbsp;
                                {this.props.profile.email}
                              </p>
                              <address>
                                <i
                                  className="fa fa-map-marker obj-color"
                                  aria-hidden="true"
                                />&nbsp;
                                {this.props.profile.address}
                              </address>
                              <p>
                                <i
                                  className="fa fa-phone obj-color"
                                  aria-hidden="true"
                                />&nbsp;
                                {this.props.profile.phone}
                              </p>
                              <Link
                                className="btn btn-info"
                                to="#"
                                role="button"
                                data-toggle="modal"
                                data-target="#changePassword"
                              >
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

        <ChangePasswordModal
          oldPassword={this.state.oldPassword}
          newPassword={this.state.newPassword}
          confirmPassword={this.state.confirmPassword}
          onClick={this.changePassword}
          onChange={this.onChange}
        />

        <EditProfileModal
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          username={this.state.UserName}
          phone={this.state.Phone}
          hobbies={this.state.Hobbies}
          about={this.state.About}
          address={this.state.Address}
          publicID={this.state.PublicId}
          uploadWidget={this.uploadWidget}
        />
      </div>
    );
  }
}

MyProfile.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    userId: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    address: PropTypes.string,
    about: PropTypes.string,
    hobbies: PropTypes.string,
    phone: PropTypes.string,
    publicUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    fullname: PropTypes.string
  }).isRequired,
  resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.user
});

const mapDispatchToProps = dispatch => ({
  getUserProfile: () => dispatch(userActions.getUserProfile()),
  resetPassword: password => dispatch(userActions.resetPassword(password)),
  updateUserProfile: userData => dispatch(
    userActions.updateUserProfile(userData)),
  logout: () => dispatch(userActions.logout())
});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
