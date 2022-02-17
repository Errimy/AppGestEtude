import React from 'react';
import './Mainnav.css';
import Navigation from './Navigation';
import { Button,Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useLocation , useHistory } from 'react-router-dom'


const Mainnav = props => 
{
    const history = useHistory();
    const disconnectUser = () => {
        console.log('---- You have been kicked');
        localStorage.removeItem('user');
        history.push('/Login');
    }


    const location = useLocation();
    let isPageLogin = location.pathname === '/Login';

    return isPageLogin ?<Nav className="navbar navbar-dark bg-success"></Nav> : 
    <Navigation>
    <Nav className="navbar navbar-dark bg-success">
        <NavLink to ='/'>
            <Button variant="outline-light">Accueil</Button>
        </NavLink>
        <Button onClick={disconnectUser} variant="danger">Se déconnecter</Button>
    </Nav>
    </Navigation>
}

export default Mainnav;