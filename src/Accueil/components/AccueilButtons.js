import React , {useContext} from "react";
import "./AccueilButtons.css";
import { Button, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {AuthContext} from '../../shared/context/auth-context';

const AccueilButtons = (props) => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <CardGroup className="cards1">
        <div className="emploi">
          <Card
            border="success"
            style={{ width: "18rem" }}
            className="text-center cards"
          >
            <Card.Body>
              <Card.Title>Emploi de temps</Card.Title>
              <Card.Text>
                Clique ici pour voir la liste des emploi de temps.
              </Card.Text>
              <Link to="/Emplois">
                <Button variant="success">Voir emploi</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="examen">
          <Card
            border="success"
            style={{ width: "18rem" }}
            className="text-center cards"
          >
            <Card.Body>
              <Card.Title>Examen</Card.Title>
              <Card.Text>
                Clique ici pour voir les examens a venir et les notes.
              </Card.Text>
              <Link to="/Examens">
                <Button variant="success">Voir examens</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </CardGroup>


      <CardGroup className="cards2">
        <div className="classe">
          <Card
            border="success"
            style={{ width: "18rem" }}
            className="text-center cards"
          >
            <Card.Body>
              <Card.Title>Classe</Card.Title>
              <Card.Text>
                Clique ici pour voir les classes et la liste des étudiants de
                chaque classe.
              </Card.Text>
              
              <Link to="/Classe">
                <Button variant="success">Voir classes</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        {auth.user.role=="admin" &&
        <div className="compte">
          <Card
            border="success"
            style={{ width: "18rem" }}
            className="text-center cards"
          >
            <Card.Body>
              <Card.Title>Gestion des comptes</Card.Title>
              <Card.Text>
                Menu de création et modification des comptes, option pour les
                admins seulement.
              </Card.Text>
              <Link to="/Users">
                <Button variant="success">Gestion des comptes</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>}
      </CardGroup>
    </div>
  );
};

export default AccueilButtons;
