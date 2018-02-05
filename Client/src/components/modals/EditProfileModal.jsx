import React from 'react';
import PropTypes from 'prop-types';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

/**
 * @description edit user profile
 *
 * @function editProfileModal
 *
 * @param {object} props
 *
 * @returns {views} edit profile modal
 */
const editProfileModal = (props) => {
  const {
    onSubmit,
    username,
    onChange,
    phone,
    hobbies,
    about,
    address,
    publicID,
    uploadWidget } = props;
  return (
    <div className="modal fade text-dark" id="profileModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h5 className="modal-title" style={{ color: 'white' }}>
                   Edit Profile
            </h5>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Username</label>
                <input
                  value={username}
                  onChange={onChange}
                  type="text"
                  name="UserName"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Phone Number</label>
                <input
                  value={phone}
                  onChange={onChange}
                  type="number"
                  name="Phone"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Hobbies</label>
                <input
                  value={hobbies}
                  onChange={onChange}
                  type="text"
                  name="Hobbies"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">About</label>
                <input
                  value={about}
                  onChange={onChange}
                  type="text"
                  name="About"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="messager">Address</label>
                <textarea
                  value={address}
                  onChange={onChange}
                  name="Address"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <CloudinaryContext cloudName={`${process.env.CloudName}`}>
                  <Image publicId={publicID}>
                    <Transformation
                      crop="scale"
                      width="100"
                      height="100"
                      dpr="auto"
                      responsive_placeholder="blank"
                    />
                  </Image>
                </CloudinaryContext>

                <input
                  className="form-control-file"
                  onClick={uploadWidget}
                  type="button"
                  value="Upload Image"
                />
                <small id="fileHelp" className="form-text text-muted">
                      Upload profile picture
                </small>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="mt-2 btn btn-primary btn-block"
                >
                    Update
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  data-dismiss="modal"
                >
                    Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

editProfileModal.propTypes = {
  uploadWidget: PropTypes.func.isRequired,
  publicID: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  hobbies: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default editProfileModal;
