import React from 'react';
import NavMenu from '../components/NavMenu/NavMenu';
import Footer from '../components/Footer/Footer';
import './Layout.css';

export default props => {
    const { children } = props;
    return (
        <div>
            <NavMenu />
                {children}
            <Footer />
        </div>
    );
};
