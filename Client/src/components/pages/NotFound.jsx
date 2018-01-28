import React from 'react';
import Header from './Header';

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
