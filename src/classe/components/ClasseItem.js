import  React from "react";
import { Table } from "react-bootstrap";

const ClasseItem = props => {
    return(
        <Table >
                    <tbody>
                        <td>{props.nom_classe}</td>
                    </tbody>
                    </Table>

    )
}

export default ClasseItem;