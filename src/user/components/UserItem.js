import  React from "react";
import './UserItem.css';
import { Table } from "react-bootstrap";

const UserItem = props => {
    return(
        <Table >
                    <tbody>
                        <td>{props.nom}</td>
                        <td>{props.prenom}</td>
                        <td>{props.role}</td>
                    </tbody>
                    </Table>

    )
}

export default UserItem;