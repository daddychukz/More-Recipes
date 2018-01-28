import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import * as recipeActions from '../../actions/recipeActions';

/**
 *
 *
 * @class RecipeForm
 * @extends {React.Component}
 */
class RecipeForm extends React.Component {
  /**
   * Creates an instance of RecipeForm.
   * @param {any} props
   * @param {any} context
   * @memberof RecipeForm
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      Title: '',
      Description: '',
      imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
      publicId: 'home_gipmmy.jpg',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  /**
   *
   *
   * @param {any} e
   * @memberof RecipeForm
   * @returns {void}
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @param {any} e
   * @memberof RecipeForm
   * @returns {void}
   */
  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.addRecipe(this.state)
      .then(
        () => this.setState({ Title: '', Description: '' }),
        (err) => {
          toastr.error(err.response.data.message);
        }
      );
  }

  /**
   *
   * @returns {void}
   * @memberof RecipeForm
   */
  uploadWidget() {
    window.cloudinary.openUploadWidget({
      cloud_name: process.env.CloudName,
      upload_preset: process.env.UploadPreset,
      tags: ['daddy'] },
    (error, result) => {
      this.setState({
        imageUrl: result[0].secure_url,
        publicId: result[0].public_id
      });
    });
  }

  /**
   *
   *
   * @memberof RecipeForm
   * @returns {object} component
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
              <Image publicId={this.state.publicId}>
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
