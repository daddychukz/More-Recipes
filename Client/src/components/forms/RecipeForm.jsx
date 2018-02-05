import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import customHistory from '../common/commonFunctions';
import * as recipeActions from '../../actions/recipeActions';

/**
 * @class RecipeForm
 *
 * @extends {React.Component}
 */
class RecipeForm extends React.Component {
  /**
   * @description Creates an instance of AddRecipe.
   *
   * @param {any} props
   *
   * @memberof RecipeForm
   */
  constructor(props) {
    super(props);
    this.state = {
      Title: '',
      Description: '',
      ImageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
      PublicId: 'home_gipmmy.jpg',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  /**
   * @description update component state when form value changes
   *
   * @param {any} event
   *
   * @memberof RecipeForm
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handles adding a new recipe
   *
   * @param {any} event
   *
   * @memberof RecipeForm
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.addRecipe(this.state)
      .then(
        () => customHistory.push('/recipe-box'),
        (err) => {
          toastr.error(err.response.data.message);
        }
      );
  }

  /**
   * @description cloudinary image widget
   *
   * @memberof RecipeForm
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
   * @description renders component to the DOM
   *
   * @memberof RecipeForm
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="text-dark" htmlFor="title">
              Recipe Title
            </label>
            <input
              id="title"
              value={this.state.Title}
              onChange={this.onChange}
              type="text"
              name="Title"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label className="text-dark" htmlFor="description">
              Recipe Description
            </label>
            <textarea
              value={this.state.Description}
              onChange={this.onChange}
              name="Description"
              rows="6"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <CloudinaryContext cloudName="chuks-andela32">
              <Image publicId={this.state.PublicId}>
                <Transformation
                  crop="scale"
                  width="200"
                  height="150"
                  dpr="auto"
                  responsive_placeholder="blank"
                />
              </Image>
            </CloudinaryContext>
            <input
              className="form-control-file"
              onClick={this.uploadWidget}
              type="button"
              value="Add Image"
            />
            <small id="fileHelp" className="form-text text-muted">
              Please upload an example image of recipe for better reviews.
            </small>
          </div>
          <button type="submit" className="btn btn-info">Post Recipe</button>
        </form>
      </div>
    );
  }
}

RecipeForm.propTypes = {
  addRecipe: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  addRecipe: recipe => dispatch(recipeActions.addRecipe(recipe))
});

export default connect(null, mapDispatchToProps)(RecipeForm);
