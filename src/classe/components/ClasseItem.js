import  React, { useContext } from "react";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hooks';

const ClasseItem = props => {
    const { sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);

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
            <td><Link to ={`./Users/classe/${props.id}`}>{props.nom_classe}</Link></td>       
            {auth.user.role=='admin'&& <td>
                <Link to={`/classes/${props.id}`}><Button variant="outline-info">Modifier</Button></Link>
                <Button variant="outline-danger" onClick={confirmDeleteHandler}>Supprimer</Button>
            </td>}
        </tr>
    )
}

export default ClasseItem;