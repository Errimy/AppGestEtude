import React from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/components/Input'
import Button from '../../shared/components/Button'
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
  } from '../../shared/util/validators';
import { Card } from 'react-bootstrap';
import './AddUser.css';
const AddUser = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      nom: {
        value: '',
        isValid: false
      },
      prenom: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      },
      mdp: {
        value: '',
        isValid: false
      },
      classe_user: {
        value: '',
        isValid: false
      },
      role: {
        value: '',
        isValid: false
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/users',
        'POST',
        JSON.stringify({
          nom: formState.inputs.nom.value,
          prenom: formState.inputs.prenom.value,
          email: formState.inputs.email.value,
          mdp: formState.inputs.mdp.value,
          classe_user: formState.inputs.classe_user.value,
          role: formState.inputs.role.value,
        }),
        { 'Content-Type': 'application/json' }
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <div className="parent">
      <Card className="main-card">
        <Card.Header>
          Ajout d'un nouveau utilisateur
        </Card.Header>
        <Card.Body>
          <form className="place-form" onSubmit={placeSubmitHandler}>
          {isLoading}

          <div className="nom-prenom-group">
            <Card className="card-input" style={{width:'20em'}}>
              <Input
                id="nom"
                element="input"
                type="text"
                label="Nom"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer le nom"
                onInput={inputHandler}
              />
            </Card>
            <Card className="card-input" style={{width:'20em'}}>
              <Input
                id="prenom"
                element="input"
                type="text"
                label="Prenom"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer le nom"
                onInput={inputHandler}
              />
            </Card>
          </div>
          <Card className="card-input">
            <Input
                element="input"
                id="email"
                type="email"
                label="E-Mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Adresse email"
                onInput={inputHandler}
              />
          </Card>
          
          <Card className="card-input">
            <Input
                element="input"
                id="mdp"
                type="password"
                label="Mot de passe"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Entrer votre mot de passe"
                onInput={inputHandler}
              />
          </Card>
          

          <div className="classe-role-group">
            <Card className="card-input" style={{width:'20em'}}>
              <Input
                id="classe_user"
                element="input"
                type="text"
                label="Classe"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer la classe"
                onInput={inputHandler}
              />
            </Card>
            
            <Card className="card-input" style={{width:'20em'}}>
              <Input
                id="role"
                element="input"
                type="text"
                label="Role"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer le role de cette utilisateur."
                onInput={inputHandler}
              />
            </Card>
          </div>
          
        </form>
        </Card.Body>
        <Button type="submit" disabled={!formState.isValid}>
            Ajouter l'Utilisateur
          </Button>
      </Card>
      
    </div>
    </React.Fragment>
  );
};

export default AddUser;