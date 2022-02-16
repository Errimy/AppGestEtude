import React from 'react';
import './Navigation.css';


const Navigation = props => {

    return <header className='nav' >
        {props.children}
    </header>
};

export default Navigation;