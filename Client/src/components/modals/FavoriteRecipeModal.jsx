import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description delete user recipe
 *
 * @function favoriteRecipeModal
 *
 * @param {object} props
 *
 * @returns {views} favorite recipe modal
 */
const favoriteRecipeModal = (props) => {
  const {
    onClick,
    onInput,
    Category,
    getUniqueCategories,
    value,
    onChange,
    disabled } = props;

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
                  disabled={disabled}
                  onChange={onChange}
                  value={value}
                  name="selectCategory"
                  className="form-control form-control-lg"
                >
                  {
                    getUniqueCategories.map(item =>
                      <option key={item}>{item}</option>
                    )
                  }
                </select>
              </div>
              <div className="form-group">
                <input
                  onInput={onInput}
                  value={Category}
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
                onClick={onClick}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

favoriteRecipeModal.defaultProps = {
  value: ''
};

favoriteRecipeModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  Category: PropTypes.string.isRequired,
  getUniqueCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default favoriteRecipeModal;
