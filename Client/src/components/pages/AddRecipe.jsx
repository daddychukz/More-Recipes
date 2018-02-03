import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import RecipeForm from '../forms/RecipeForm';

const AddRecipe = () => (

  <div>
    <Header />

    <header id="header" />

    {/* BREADCRUMB  */}
    <div className="container">
      <nav className="breadcrumb">
        <Link className="breadcrumb-item" to="#">Home</Link>
        <span className="breadcrumb-item active">Recipe</span>
      </nav>
    </div>

    {/* MAIN SECTION  */}
    <section>
      <div className="container">
        <div className="row">
          <SideBar />
          <div className="col-md-12 col-lg-8">
            <RecipeForm />
          </div>
        </div>
      </div>
    </section>
    <br />

    <Footer />
  </div>
);

export default AddRecipe;
