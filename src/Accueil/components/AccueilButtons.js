import React from "react";
import "./AccueilButtons.css";
import { Button, Card, CardGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AccueilButtons = (props) => {
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
              <Button variant="success">Voir emploi</Button>
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
              <Button variant="success">Voir examens</Button>
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
              <Button variant="success">Voir classes</Button>
            </Card.Body>
          </Card>
        </div>
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
              <Button variant="success">Gestion des comptes</Button>
            </Card.Body>
          </Card>
        </div>
      </CardGroup>
    </div>
  );
};

export default AccueilButtons;
