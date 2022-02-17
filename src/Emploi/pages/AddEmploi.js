import React from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/components/Input'
import Button from '../../shared/components/Button'
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import {
    VALIDATOR_REQUIRE,
  } from '../../shared/util/validators';
import { Card } from 'react-bootstrap';
import './AddUser.css';
const AddEmploi = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      matiere: {
        value: '',
        isValid: false
      },
      jour: {
        value: '',
        isValid: false
      },
      heure: {
        value: '',
        isValid: false
      },
    },
    false
  );

  const history = useHistory();

  const SubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/emplois',
        'POST',
        JSON.stringify({
          matiere: formState.inputs.matiere.value,
          jour: formState.inputs.jour.value,
          heure: formState.inputs.heure.value,
        }),
        { 'Content-Type': 'application/json' }
      );
      history.push('/emplois');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <div className="parent">
      <Card className="main-card">
        <Card.Header>
          Ajout d'une nouvelle séance
        </Card.Header>
        <Card.Body>
          <form className="place-form" onSubmit={SubmitHandler}>
          {isLoading}

          <div className="nom-prenom-group">
            <Card className="card-input" style={{width:'20em'}}>
              <Input
                id="matiere"
                element="input"
                type="text"
                label="Nom de la Matiere"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer un nom valide"
                onInput={inputHandler}
              />
            </Card>
            <Card className="card-input" style={{width:'20em'}}>
              <Input
                id="jour"
                element="input"
                type="text"
                label="Jour de la semaine"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer un jour valide"
                onInput={inputHandler}
              />
            </Card>
            <Card className="card-input" style={{width:'20em'}}>
              <Input
                id="heure"
                element="input"
                type="text"
                label="Heure de la séance"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer une Heure valide"
                onInput={inputHandler}
              />
            </Card>
          </div>
          <Button type="submit" disabled={!formState.isValid}>
            Ajouter la Séance
          </Button>
          
        </form>
        </Card.Body>
      </Card>
      
    </div>
    </React.Fragment>
  );
};

export default AddEmploi;