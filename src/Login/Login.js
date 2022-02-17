
import "./Login.css";
import { Button, Form, Card } from "react-bootstrap";
import React, { useState, useContext } from 'react';
import Input from '../shared/components/Input';
import {useHistory} from 'react-router-dom';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../shared/util/validators';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hooks';
import { AuthContext } from '../shared/context/auth-context';


const Login = () => {

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      mdp: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const history = useHistory();

  if(auth.isLoggedIn)
    history.push('/');

  const authSubmitHandler = async event => {
    event.preventDefault();
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            mdp: formState.inputs.mdp.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        console.log(responseData);
        auth.login(responseData.user);

        history.push('/Accueil');
      } catch (err) {
        console.log(err);
      }
  };

  return (
    <Card className="main-card">
      <form onSubmit={authSubmitHandler}>
      {isLoading}
        <Card.Header as="h2" className="text-center titre">Page de connexion</Card.Header>
        <Card.Body>
        <div className="content">
        <Card className="child-card">  
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Input
              element="input"
              id="email"
              type="email"
              label="Adresse Email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Enter une adresse email valide."
              onInput={inputHandler}
            />
          </Form.Group>
        </Card>
        <Card className="child-card">
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Input
              className="mb-3"
              element="input"
              id="mdp"
              type="password"
              label="Mot de passe"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Entrer un mot de passe valide."
              onInput={inputHandler}
            />
          </Form.Group>
        </Card>
        </div>
        
        </Card.Body>

        <Card.Footer style={{textAlign: 'center'}}>
          <Button variant="success" type="submit">
              Connexion
            </Button>
            <Form.Label className="text-muted">
              Problème de connexion ? Merci de contacter l'administration.
            </Form.Label>
        </Card.Footer>
        </form>
    </Card>
  );
};

export default Login;
