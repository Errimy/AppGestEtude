import  React from "react";
import { Button } from "react-bootstrap";

const EmploiItem = props => {
    return(
        <tr>
            <td>{props.matiere}</td>
            <td>{props.jour}</td>
            <td>{props.heure}</td>
            <td>
                <Button variant="outline-info">Modifier</Button>
                <Button variant="outline-danger">Supprimer</Button>
            </td>
        </tr>
    )
}

export default EmploiItem;