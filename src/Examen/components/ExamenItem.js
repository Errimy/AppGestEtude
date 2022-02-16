import  React from "react";
import { Button } from "react-bootstrap";

const ExamenItem = props => {
    return(
        <tr>
            <td>{props.matiere}</td>
            <td>{props.nom_etudiant}</td>
            <td>{props.note}</td>
            <td>
                {props.date.toString()}
            </td>
            <td>
                <Button variant="outline-info">Modifier</Button>
                <Button variant="outline-danger">Supprimer</Button>
            </td>
        </tr>
    )
}

export default ExamenItem;