import  React from "react";
import { Button } from "react-bootstrap";

const ClasseItem = props => {
    return(
        <tr>
            <td>{props.nom_classe}</td>
            <td>
                <Button variant="outline-info">Modifier</Button>
                <Button variant="outline-danger">Supprimer</Button>
            </td>
        </tr>
    )
}

export default ClasseItem;