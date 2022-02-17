import  React from "react";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hooks';

const ExamenItem = props => {
    const { sendRequest } = useHttpClient();
    const formatYmd = date => date.toISOString().slice(0, 10);

    const confirmDeleteHandler = async () => 
    {
      try {
        await sendRequest(
          `http://localhost:5000/api/examens/${props.id}`,
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
            <td>{props.matiere}</td>
            <td>{props.nom_etudiant}</td>
            <td>{props.note}</td>
            <td>
                {formatYmd( new Date(props.date))}
            </td>
            <td>
                <Link to={`/examens/${props.id}`}><Button variant="outline-info">Modifier</Button></Link>
                <Button variant="outline-danger"onClick={confirmDeleteHandler}>Supprimer</Button>
            </td>
        </tr>
    )
}

export default ExamenItem;