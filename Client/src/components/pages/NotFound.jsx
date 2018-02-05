import React from 'react';
import Header from './Header';

/**
 * @description displays when a page content is not found
 *
 * @function AddRecipe
 *
 * @param {any} ()
 *
 * @returns {JSX} JSX representation of component
 */
const NotFound = () => (
  <div>
    <Header />

    <header id="header" />

    <section>
      <div className="container">
        <div className="row">
          <div className="col-6 obj-color">
            <h2>404! Resource Not Found</h2>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default NotFound;
