import React from 'react';

//Stateless component
const RecipeModal = () => (

  <div className="modal fade text-dark" id="addRecipe">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header bg-primary">
          <h5 className="modal-title" style={{ color: 'rgb(255, 255, 255)' }} id="contactModalTitle">
            Add Recipe
          </h5>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="name">Recipe Title</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="messager">Recipe Description</label>
              <textarea className="form-control" rows="6" />
            </div>
            <div className="form-group">
              <label htmlFor="imgFile">Upload Image</label>
              <input type="file" className="form-control-file" id="imgFile" aria-describedby="fileHelp" />
              <small id="fileHelp" className="form-text text-muted">Please upload an example image of recipe for better reviews.</small>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary btn-block" data-dismiss="modal">Submit</button>
        </div>
      </div>
    </div>
  </div>

);

export default RecipeModal;

