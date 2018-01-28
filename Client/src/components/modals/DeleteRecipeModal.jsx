import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 *
 * @class DeleteRecipeModal
 * @extends {React.Component}
 */
class DeleteRecipeModal extends React.Component {
  /**
   * Creates an instance of DeleteRecipeModal.
   * @param {any} props
   * @memberof DeleteRecipeModal
   */
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  /**
   *
   *
   * @memberof DeleteRecipeModal
   * @returns {void}
   */
  render() {
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
                onClick={this.props.onClick}
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
  }
}

DeleteRecipeModal.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DeleteRecipeModal;
