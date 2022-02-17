import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory,Link } from 'react-router-dom';

import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { Card } from 'react-bootstrap';
import './AddUser.css';

const UpdateExamen = () => {
  const { isLoading, sendRequest} = useHttpClient();
  const [loadedExamen, setLoadedExamen] = useState();
  const examenId = useParams().examenId;

  console.log(" id : " + examenId);

  const [formState, inputHandler, setFormData] = useForm(
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

  useEffect(() => {
    const fetchExamen = async () => 
    {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/examens/${examenId}`
        );
        setLoadedExamen(responseData.examen);
        setFormData(
          {
            matiere: {
                value: responseData.examen.matiere,
                isValid: true
            },
              nom_etudiant: {
                value: responseData.examen.nom_etudiant,
                isValid: true
            },
            note: {
                value: responseData.examen.note,
                isValid: true
            },
            date: {
                value: responseData.examen.date,
                isValid: true
            },
              
          },
          true
        );

      } catch (err) {}
    };
    fetchExamen();
  }, [sendRequest, examenId, setFormData]);

  const history = useHistory();

  const examenUpdateSubmitHandler = async event => {
        console.log(formState.inputs.matiere.value);
        console.log();
    try {
      await sendRequest(
        `http://localhost:5000/api/examens/${examenId}`,
        'PATCH',
        JSON.stringify({
          matiere: formState.inputs.matiere.value,
          nom_etudiant: formState.inputs.nom_etudiant.value,
          note: formState.inputs.note.value,
          date: formState.inputs.date.value,

        }),
        {
          'Content-Type': 'application/json'
        }
      );
    } catch (err) {}
    history.push('/Examens');
  };


 

  return (
    <React.Fragment>
      <div className="parent">
      <Card className="main-card">
        <Card.Header>
          Modifier l'examen:
        </Card.Header>
        <Card.Body>

        {!isLoading && loadedExamen && (
        <form className="place-form" onSubmit={examenUpdateSubmitHandler}>
        <Input
          id="matiere"
          element="input"
          type="text"
          label="Nom de Matiere"
          initialValue={loadedExamen.matiere}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer un nom valide"
          onInput={inputHandler}
          initialValid={true}

        />
                <br></br>
                <br></br>
        <Input
          id="nom_etudiant"
          element="input"
          type="text"
          label="Nom de l'etudiant"
          initialValue={loadedExamen.nom_etudiant}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer un nom valide"
          onInput={inputHandler}
          initialValid={true}
        />
                <br></br>
                <br></br>
        <Input
          id="note"
          element="input"
          type="number"
          label="Note"
          initialValue={loadedExamen.note}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer une Note valide"
          onInput={inputHandler}
          initialValid={true}
        />
                <br></br>
                <br></br>
        <Input
            id="date"
            element="input"
            type="date"
            label="date de l'examen"
            initialValue={loadedExamen.date}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrer une date valide"
            onInput={inputHandler}
            initialValid={true}

        />
        <br></br>
        <br></br>
        <br></br>
          <Button type="submit">
            Modifier L'examen
          </Button>

        </form>
        
        )}
      </Card.Body>

      </Card>
      
      </div>
    </React.Fragment>
  );
};

export default UpdateExamen;
