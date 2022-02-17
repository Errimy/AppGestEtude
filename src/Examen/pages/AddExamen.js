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
const AddExamen = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      matiere: {
        value: '',
        isValid: false
      },
      nom_etudiant: {
        value: '',
        isValid: false
      },
      note: {
        value: '',
        isValid: false
      },
      date: {
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
        'http://localhost:5000/api/examens',
        'POST',
        JSON.stringify({
          matiere: formState.inputs.matiere.value,
          nom_etudiant: formState.inputs.nom_etudiant.value,
          note: formState.inputs.note.value,
          date: formState.inputs.date.value,
        }),
        { 'Content-Type': 'application/json' }
      );
      history.push('/examens');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <div className="parent">
      <Card className="main-card">
        <Card.Header>
          Ajout d'un examen
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
                id="nom_etudiant"
                element="input"
                type="text"
                label="Nom de l'etudiant"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer un nom valide"
                onInput={inputHandler}
              />
            </Card>
            </div>
            <div className="nom-prenom-group">

            <Card className="card-input" style={{width:'20em'}}>
              <Input
                id="note"
                element="input"
                type="number"
                label="note de l'examen'"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer une note valide"
                onInput={inputHandler}
              />
            </Card>
            <Card className="card-input" style={{width:'20em'}}>
              <Input
                id="date"
                element="input"
                type="date"
                label="date de l'examen'"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrer une date valide"
                onInput={inputHandler}
              />
            </Card>
            </div>

          <Button type="submit" disabled={!formState.isValid}>
            Ajouter la Note de l'examen
          </Button>
          
        </form>
        </Card.Body>
      </Card>
      
    </div>
    </React.Fragment>
  );
};

export default AddExamen;