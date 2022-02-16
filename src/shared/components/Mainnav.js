import React from 'react';
import './Mainnav.css';
import Navigation from './Navigation';
import { Button,Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom'


const Mainnav = props => {

    const location = useLocation();
    let isPageLogin = location.pathname === '/Login';
    console.log(location.pathname + " isPAGElOGIN : " + isPageLogin);


    return isPageLogin ?<Nav className="navbar navbar-dark bg-success"></Nav> : 
    <Navigation>
    <Nav className="navbar navbar-dark bg-success">
        <NavLink to ='/'>
            <p className="header btn btn-success">Accueil</p>
        </NavLink>
       
        <Button variant="danger">Se déconnecter</Button>
    </Nav>
    </Navigation>
}

export default Mainnav;