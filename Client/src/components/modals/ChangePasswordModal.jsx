import React from 'react';
import PropTypes from 'prop-types';


/**
 * @description change user password
 *
 * @function changePasswordModal
 *
 * @param {object} props
 *
 * @returns {views} change password form
 */
const changePasswordModal = (props) => {
  const { oldPassword, onChange, newPassword, confirmPassword, onClick } = props;
  return (
    <div className="modal fade text-dark" id="changePassword">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-info">
            <h5
              className="modal-title"
              style={{ color: 'white' }}
              id="contactModalTitle"
            >
                Change Your Password
            </h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <input
                  value={oldPassword}
                  onChange={onChange}
                  type="password"
                  name="oldPassword"
                  className="form-control form-control-lg"
                  placeholder="Old Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  value={newPassword}
                  onChange={onChange}
                  type="password"
                  name="newPassword"
                  className="form-control form-control-lg"
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  value={confirmPassword}
                  onChange={onChange}
                  type="password"
                  name="confirmPassword"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <input
                type="button"
                value="Change Password"
                className="btn btn-info btn-block"
                data-dismiss="modal"
                onClick={onClick}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

changePasswordModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  oldPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default changePasswordModal;
