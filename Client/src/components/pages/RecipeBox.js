import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { Footer } from './Footer';


const RecipeBox = () => {
    return (
        <div>
                <Header />
                
                <header id="header">
                
                </header>
                
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
                            <div className="col-md-4">
                                <div className="list-group mb-3">
                                    <li className="list-group-item active text-center"><h5>DURUGO CHUKS</h5></li>
                                    <Link to="#" className="list-group-item"><i className="fa fa-cutlery" aria-hidden="true"></i> My Recipes <span className="badge badge-pill badge-info float-right">12</span></Link>
                                    <Link to="#" className="list-group-item"><i className="fa fa-star" aria-hidden="true"></i> My Favourites <span className="badge badge-pill badge-info float-right">20</span></Link>
                                    <Link to="#" className="list-group-item"><i className="fa fa-user" aria-hidden="true"></i> My Profile</Link>
                                </div>
                            
                                 {/* TOP RECIPE  */}
                                <ul className="list-group mb-3">
                                    <li className="list-group-item active text-center"><h5>Top 3 Favorite Recipes</h5></li>
                                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1"><Link to="#" className="mb-1"><strong>Egusi Recipe</strong></Link></h5>
                                            <small className="text-muted">7 days ago</small>
                                        </div>
                                        <p className="mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, maxime!</p>
                                    </div>
                                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1"><Link to="#"><strong>Roasted Plantain</strong></Link></h5>
                                            <small className="text-muted">5 days ago</small>
                                        </div>
                                        <p className="mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, maxime!</p>
                                    </div>
                                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1"><Link to="#"><strong>Sweetened Bean Cake</strong></Link></h5>
                                            <small className="text-muted">2 days ago</small>
                                        </div>
                                        <p className="mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, maxime!</p>
                                    </div>
                                </ul>                        
                            </div>
        
                            {/* RECIPE CATALOG 
                            <div className="col-md-8" id="display">
                                <h1 className="text-center obj-color">Onion Stew</h1><h6 className="text-muted text-center">by: Emeka Onyeka</h6>                        
                                                           
                                <br />
                                
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni officia quasi deserunt impedit, vitae totam consequatur a nemo. Amet, unde! Suscipit placeat commodi iusto totam similique animi, doloribus adipisci modi harum obcaecati, magnam deserunt rerum distinctio ea praesentium quia blanditiis dolore voluptas fugit accusamus laboriosam iure? Eaque totam placeat, delectus, voluptatem atque voluptatibus ullam ab sapiente sint in ipsam doloribus qui. </p>
                                <img src="../../static/img/rec6.jpeg" alt="recipe 1" className="float-right" width="300" height="200" />
                                <p>Corporis libero dignissimos incidunt voluptates non assumenda, nihil natus quam ex itaque quae earum, consequatur ducimus atque id ipsam aliquid, asperiores esse. Adipisci sunt, voluptatibus fugit sequi neque vitae dignissimos recusandae nostrum porro eveniet corporis, suscipit quaerat dolorem laboriosam tempora? Numquam nesciunt temporibus vitae, id nulla blanditiis labore harum praesentium exercitationem asperiores nam, aut veritatis soluta aperiam debitis mollitia ipsum eaque sit dolor a architecto, accusantium vel facilis libero! Libero tempora fuga cum magnam error aperiam optio, ex veritatis, impedit quo porro nobis asperiores distinctio iusto voluptates officiis temporibus vitae, tenetur minus quia adipisci deleniti maiores commodi. Vero nihil ab, ipsam odio perferendis dicta, fuga ex reprehenderit beatae esse, adipisci quos earum aspernatur? Minima earum porro quia recusandae voluptates voluptatem consequuntur consectetur illum labore eaque fugit ut maiores, sunt voluptas consequatur vitae, nihil cumque modi perferendis natus dolorum aspernatur.</p>     

                                <hr />  

                                <ul className="list-inline">
                                    <li className="list-inline-item"><Link className="btn btn-sm" to="#" title="Upvote"><i className="fa fa-2x fa-thumbs-o-up"></i></Link><span className="badge badge-info" title="Upvotes">12</span>&nbsp; </li>
                                    |
                                    <li className="list-inline-item"><Link className="btn btn-sm" to="#" title="Downvote"><i className="fa fa-2x fa-thumbs-o-down"></i></Link><span className="badge badge-info" title="Downvotes">2</span>&nbsp; </li>
                                    |
                                    <li className="list-inline-item"><Link className="btn btn-sm" to="#" title="Views"><i className="fa fa-2x fa-eye obj-color"></i></Link><span className="badge badge-info" title="Views">30</span></li>
        
                                    <li className="list-inline-item float-right"><Link className="btn btn-sm" to="#" title="Favorite" data-toggle="modal" data-target="#favorite"><i className="fa fa-2x fa-star-o"></i></Link></li>
                                </ul>
                                
                                <br />

                                <h3>Reviews</h3>
                                <div className="mb-3" style={{ border: '#E9ECEF 1px solid' }}>
                                    <div className="d-flex flex-row">
                                        <div className="p-2 align-self-start">
                                            <img src="../../static/img/user-female.png" alt="user" className="img-fluid rounded-circle" width="50" height="50" />
                                        </div>
                                        <div className="p-2 align-self-end">                                    
                                            <h3><a to="#">Janet John</a></h3>                
                                            <small className="text-muted">September 18, 2017</small>                    
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit veritatis consequatur, perspiciatis, est quo cumque, ratione accusantium ipsum consequuntur illum inventore nihil distinctio magni. </p>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <div className="p-2 align-self-start">
                                            <img src="../../static/img/user-male.jpg" alt="user" className="img-fluid rounded-circle" width="50" height="50" />
                                        </div>
                                        <div className="p-2 align-self-end">                                    
                                            <h3><a to="#">Fred Mat</a></h3> 
                                            <small className="text-muted">September 19, 2017</small>                                  
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit veritatis consequatur, perspiciatis, est quo cumque, ratione accusantium ipsum consequuntur illum inventore nihil distinctio magni. </p>
                                        </div>
                                    </div>
                                </div>

                                <br />

                                <form className="mb-3">
                                    <h3>Post a Review</h3>
                                    <div className="form-group">
                                        <textarea className="form-control"></textarea>
                                    </div>
                                    <button type="button" className="btn btn-primary">Post Review</button>
                                </form>
                             </div> */}
                             {/* RECIPE CATALOG  */}
                            
                            <div className="col-md-8" id="display">
                                <form className="form-inline float-right">
                                    <input type="text" className="form-control col-5" placeholder="Recipe..." />&nbsp;
                                    <button type="submit" className="btn btn-info col-5">Search</button>
                                </form>
                                <br />
                                <br />
                                <div className="d-flex flex-row">
                                    <div className="p-2 align-self-start">
                                        <img src="../../static/img/rec6.jpeg" alt="recipe 1" width="100" height="100" />
                                    </div>
                                    <div className="p-2 align-self-end">
                                        <small className="text-muted float-right">7 days ago</small>
                                        <h3><Link to="#">Onion Stew</Link></h3>
                                        <small>by: Emeka Onyeka</small>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit veritatis consequatur, perspiciatis, est quo cumque, ratione accusantium ipsum consequuntur illum inventore nihil distinctio magni. </p>
                                    </div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="p-2 align-self-start">
                                        <img src="../../static/img/rec5.jpeg" alt="recipe 1" width="100" height="100" />
                                    </div>
                                    <div className="p-2 align-self-end">
                                        <small className="text-muted float-right">6 days ago</small>
                                        <h3><Link to="#">Sweetened Rice Meal</Link></h3>
                                        <small>by: Durugo Chuks</small>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit veritatis consequatur, perspiciatis, est quo cumque, ratione accusantium ipsum consequuntur illum inventore nihil distinctio magni. </p>
                                    </div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="p-2 align-self-start">
                                        <img src="../../static/img/rec1.jpg" alt="recipe 1" width="100" height="100" />
                                    </div>
                                    <div className="p-2 align-self-end">
                                        <small className="text-muted float-right">5 days ago</small>
                                        <h3><Link to="#">Paprika Sausages</Link></h3>
                                        <small>by: Rita Femi</small>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit veritatis consequatur, perspiciatis, est quo cumque, ratione accusantium ipsum consequuntur illum inventore nihil distinctio magni. </p>
                                    </div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="p-2 align-self-start">
                                        <img src="../../static/img/home.jpg" alt="recipe 1" width="100" height="100" />
                                    </div>
                                    <div className="p-2 align-self-end">
                                        <small className="text-muted float-right">2 days ago</small>
                                        <h3><Link to="#">Sweetened African Egusi Meal</Link></h3>
                                        <small>by: Jennifer James</small>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit veritatis consequatur, perspiciatis, est quo cumque, ratione accusantium ipsum consequuntur illum inventore nihil distinctio magni. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
        
                     {/* Recipe MODAL  */}
                    <div className="modal fade text-dark" id="addRecipe">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header bg-primary">
                                        <h5 className="modal-title" style={{ color:'rgb(255, 255, 255)' }} id="contactModalTitle">
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
                                                <textarea className="form-control" rows="6"></textarea>
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
        
                         {/* FAVORITE MODAL  */}
                        <div className="modal fade text-dark" id="favorite" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Message</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Successfully Added to Your Favorites
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save</button>
                                </div>
                                </div>
                            </div>
                        </div>
            </div>
    );
};


export default RecipeBox;
