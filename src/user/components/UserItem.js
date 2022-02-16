import  React from "react";
import './UserItem.css';
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useHttpClient } from '../../shared/hooks/http-hooks';

const UserItem = props => {
    const { sendRequest } = useHttpClient();

    const confirmDeleteHandler = async () => 
    {
      try {
        await sendRequest(
          `http://localhost:5000/api/Users/${props.id}`,
          'DELETE'
        );
        props.onDelete(props.id);
      } catch (err) {

      } finally {
        window.location.reload();
      }
    };


    return(
        <tr>
            <td>{props.nom}</td>
            <td>{props.prenom}</td>
            <td>{props.role}</td>
            <td>{props.id}</td>

            <td>
                <Link to={`/users/${props.id}`}><Button variant="outline-info">Modifier</Button></Link>
                <Button variant="outline-danger" onClick={confirmDeleteHandler}>Supprimer</Button>
            </td>
        </tr>
    )
}
export default UserItem;