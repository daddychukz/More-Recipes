import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description delete user recipe
 *
 * @function deleteRecipeModal
 *
 * @param {object} props
 *
 * @returns {views} delete recipe modal
 */
const deleteRecipeModal = (props) => {
  const { onClick } = props;
  return (
    <div className="modal fade text-dark" id="delete-recipe">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Message</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p> Do you realy want to delete this Recipe?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClick}
              className="btn btn-primary"
              data-dismiss="modal"
            >
                Yes Delete!
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
                Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

deleteRecipeModal.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default deleteRecipeModal;
