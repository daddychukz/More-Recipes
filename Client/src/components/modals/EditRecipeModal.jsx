import React from 'react';
import PropTypes from 'prop-types';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

/**
 *
 *
 * @class EditRecipeModal
 * @extends {React.Component}
 */
class EditRecipeModal extends React.Component {
  /**
   * Creates an instance of EditRecipeModal.
   * @param {any} props
   * @memberof EditRecipeModal
   */
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  /**
   *
   *
   * @memberof EditRecipeModal
   * @returns {void}
   */
  render() {
    return (
      <div className="modal fade text-dark" id="editRecipe">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h5
                className="modal-title"
                style={{ color: 'rgb(255, 255, 255)' }}
                id="contactModalTitle"
              >
               Edit Recipe
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="Title">Recipe Title</label>
                  <input
                    value={this.props.Title}
                    onChange={this.props.onChange}
                    type="text"
                    name="Title"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Description">Recipe Description</label>
                  <textarea
                    value={this.props.Description}
                    onChange={this.props.onChange}
                    type="address"
                    name="Description"
                    className="form-control"
                    rows="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="imgFile">Upload Image</label>
                  <CloudinaryContext cloudName={`${process.env.CloudName}`}>
                    <Image publicId={this.props.publicId}>
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
                    onClick={this.props.uploadWidget}
                    type="button"
                    value="Upload Image"
                  />
                  <small
                    id="fileHelp"
                    className="form-text text-muted"
                  >
                    Please upload an example image of recipe for better reviews.
                  </small>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    onClick={this.props.onSubmit}
                    className="btn btn-info"
                    data-dismiss="modal"
                  >Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    data-dismiss="modal"
                  >Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditRecipeModal.propTypes = {
  Title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  publicId: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  uploadWidget: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default EditRecipeModal;
