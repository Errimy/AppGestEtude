import  React, { useContext } from "react";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hooks';


const EmploiItem = props => {
    const { sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);

    const confirmDeleteHandler = async () => 
    {
      try {
        await sendRequest(
          `http://localhost:5000/api/emplois/${props.id}`,
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
            <td>{props.jour}</td>
            <td>{props.heure}</td>
            {auth.user.role=='admin' &&<td>
                <Link to={`/emplois/${props.id}`}><Button variant="outline-info">Modifier</Button></Link>
                <Button variant="outline-danger" onClick={confirmDeleteHandler}>Supprimer</Button>
            </td>}
        </tr>
    )
}

export default EmploiItem;