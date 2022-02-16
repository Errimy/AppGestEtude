import React from "react";
import "./Login.css";
import { Button, Form } from "react-bootstrap";

const Login = (props) => {
  return (
    <div>
        <h1 className="text-center titre" >Page de connexion</h1>
      <Form className="text-center">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Adresse email</Form.Label>
          <Form.Control type="email" placeholder="Entrer votre email" className="inputlabel" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" placeholder="Mot de passe" className="inputlabel" />
        </Form.Group>
        <Button variant="success" type="submit">
          Connexion
        </Button>
        <br />
        <br />
        <Form.Label className="text-muted">
          Problème de connexion ? Merci de contacter l'administration.
        </Form.Label>
      </Form>
    </div>
  );
};

export default Login;
