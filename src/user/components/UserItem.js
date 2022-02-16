import  React from "react";
import './UserItem.css';
import { Button } from "react-bootstrap";

const UserItem = props => {
    return(
        <tr>
            <td>{props.nom}</td>
            <td>{props.prenom}</td>
            <td>{props.role}</td>
            <td>
                <Button variant="outline-info">Modifier</Button>
                <Button variant="outline-danger">Supprimer</Button>
            </td>
        </tr>
    )
}
export default UserItem;