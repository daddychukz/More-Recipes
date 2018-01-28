import React from 'react';
import PropTypes from 'prop-types';

/**
 * 
 * 
 * @class FavoriteRecipeModal
 * @extends {React.Component}
 */
class FavoriteRecipeModal extends React.Component {
  /**
   * Creates an instance of FavoriteRecipeModal.
   * @param {any} props 
   * @memberof FavoriteRecipeModal
   */
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  /**
   * 
   * 
   * @memberof FavoriteRecipeModal
   * @returns {void}
   */
  render() {
    return (
      <div className="modal fade text-dark" id="category">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h5
                className="modal-title"
                style={{ color: 'white' }}
                id="contactModalTitle"
              >
                Select a Category
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <select
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                    value={this.props.value}
                    name="selectCategory"
                    className="form-control form-control-lg"
                  >
                    {
                      this.props.getUniqueCategories.map(item =>
                        <option key={item}>{item}</option>
                      )
                    }
                  </select>
                </div>
                <div className="form-group">
                  <input
                    onInput={this.props.onInput}
                    value={this.props.Category}
                    type="text"
                    name="Category"
                    className="form-control form-control-lg"
                    placeholder="or enter new category"
                    required
                  />
                </div>
                <input
                  type="button"
                  value="Add To Favorites"
                  className="btn btn-info btn-block"
                  data-dismiss="modal"
                  onClick={this.props.onClick}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FavoriteRecipeModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  Category: PropTypes.string.isRequired,
  getUniqueCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default FavoriteRecipeModal;
