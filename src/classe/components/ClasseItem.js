import  React from "react";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hooks';

const ClasseItem = props => {
    const { sendRequest } = useHttpClient();

    const confirmDeleteHandler = async () => 
    {
      try {
        await sendRequest(
          `http://localhost:5000/api/classes/${props.id}`,
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
            <td>{props.nom_classe}</td>
            <td>
                <Link to={`/classes/${props.id}`}><Button variant="outline-info">Modifier</Button></Link>
                <Button variant="outline-danger" onClick={confirmDeleteHandler}>Supprimer</Button>
            </td>
        </tr>
    )
}

export default ClasseItem;