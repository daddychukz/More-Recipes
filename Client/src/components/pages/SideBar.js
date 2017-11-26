import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../../actions/userActions';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: []
        }
    }

    componentWillMount() {
        const userId = jwt.decode(localStorage.jwtToken).userId
        this.props.getUserProfile(userId).then(
            () => {
                this.setState({ profile: this.props.profile })
            })
        }

    render() {
        return (
            <div className="col-md-4">
                <div className="list-group mb-3">
                    <li className="list-group-item active text-center"><h5>{this.state.profile.fullname}</h5></li>
                    <Link to="#" className="list-group-item"><i className="fa fa-cutlery" aria-hidden="true"></i> My Recipes <span className="badge badge-pill badge-info float-right">12</span></Link>
                    <Link to="#" className="list-group-item"><i className="fa fa-star" aria-hidden="true"></i> My Favourites <span className="badge badge-pill badge-info float-right">20</span></Link>
                    <Link to={'/my-profile'} className="list-group-item"><i className="fa fa-user" aria-hidden="true"></i> My Profile</Link>
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
        );
    }
}

SideBar.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
