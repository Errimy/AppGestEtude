import React from 'react';
import './Mainnav.css';
import Navigation from './Navigation';
import { Button,Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';


const Mainnav = props => {
    return <Navigation>
        <Nav class="navbar navbar-dark bg-success">
            <NavLink to ='/'>
                <p className="header btn btn-success">Accueil</p>
            </NavLink>
            <Button variant="danger">Se déconnecter</Button>
        </Nav>
    </Navigation>
}

export default Mainnav;