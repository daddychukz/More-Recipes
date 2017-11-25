import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import * as userActions from '../../actions/userActions';
import Header from './Header';
import SideBar from './SideBar';
import { Footer } from './Footer';


class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
        }
    }

    componentWillMount() {
        const userId = jwt.decode(localStorage.jwtToken).userId
        this.props.getUserProfile(userId).then(
            () => {
                this.setState({ profile: this.props.profile })
                console.log(this.state.profile)
            })
            .catch((error) => {
                console.log(error);
            })
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
            </div>
        );
    }
}

MyProfile.propTypes = {
    getUserProfile: PropTypes.func.isRequired
  }

  function mapStateToProps(state, ownProps) {
      return {
          profile: state.user
      }
  }

  function mapDispatchToProps(dispatch) {
      return {
          getUserProfile: (Id) => dispatch(userActions.getUserProfile(Id))
      }
  }
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

// export default MyProfile;
