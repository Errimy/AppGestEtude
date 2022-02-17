
import "./Login.css";
import { Button, Form } from "react-bootstrap";
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


  const authSubmitHandler = async event => {
    console.log("it works");
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
        auth.login(responseData.user.id);

        history.push('/Accueil');
      } catch (err) {
        console.log(err);
      }
  };

  return (
    <div className="text-center">
      {isLoading}
        <h1 className="text-center titre" >Page de connexion</h1>

      <form onSubmit={authSubmitHandler}>
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
        <Button variant="success" type="submit">
          Connexion
        </Button>
        <br />
        <br />
        <Form.Label className="text-muted">
          Problème de connexion ? Merci de contacter l'administration.
        </Form.Label>
      </form>
    </div>
  );
};

export default Login;
