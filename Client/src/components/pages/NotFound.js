import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

const NotFound = () => {
    return (
        <div>
            <Header />
            
            <header id="header">
            
            </header>
            
            <section>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 obj-color'>
                            <h2>404! Resource Not Found</h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NotFound;

