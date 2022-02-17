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
const AddClasse = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      nom_classe: {
        value: '',
        isValid: false
      },
      emploi_classe: {
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
        'http://localhost:5000/api/classes',
        'POST',
        JSON.stringify({
          nom_classe: formState.inputs.nom_classe.value,
          emploi_classe: formState.inputs.emploi_classe.value,
        }),
        { 'Content-Type': 'application/json' }
      );
      history.push('/classe');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <div className="parent">
      <Card className="main-card">
        <Card.Header>
          Ajout d'une nouvelle classe
        </Card.Header>
        <Card.Body>
          <form className="place-form" onSubmit={SubmitHandler}>
          {isLoading}

          <div className="nom-prenom-group">
            <Card className="card-input" style={{width:'20em'}}>
              <Input
                id="nom_classe"
                element="input"
                type="text"
                label="Nom de la classe"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer un nom valide"
                onInput={inputHandler}
              />
            </Card>
            <Card className="card-input" style={{width:'20em'}}>
              <Input
                id="emploi_classe"
                element="input"
                type="text"
                label="Emploi de la classe"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer une emploi de classe valide"
                onInput={inputHandler}
              />
            </Card>
          </div>
          <Button type="submit" disabled={!formState.isValid}>
            Ajouter la Classe
          </Button>
          
        </form>
        </Card.Body>
      </Card>
      
    </div>
    </React.Fragment>
  );
};

export default AddClasse;