import React, { useContext } from 'react';
import './Mainnav.css';
import Navigation from './Navigation';
import { Button,Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useLocation , useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth-context';


const Mainnav = props => 
{
    const auth = useContext(AuthContext);
    console.log(auth);
    const history = useHistory();

    const disconnectUser = () => {
        console.log('---- You have been kicked');
        auth.logout();

        history.push('/Login');
    }

    return !auth.isLoggedIn ?
    <Nav className="navbar navbar-dark bg-success"></Nav> : 
    
    <Navigation>
    <Nav className="navbar navbar-dark bg-success">
        <Link to ='/'>
            <Button variant="outline-light">Accueil</Button>
        </Link>
        <Button onClick={() => disconnectUser()} variant="danger">Se déconnecter</Button>
    </Nav>
    </Navigation>
}

export default Mainnav;