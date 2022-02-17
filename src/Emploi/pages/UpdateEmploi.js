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

const UpdateEmploi = () => {
  const { isLoading, sendRequest} = useHttpClient();
  const [loadedEmploi, setLoadedEmploi] = useState();
  const emploiId = useParams().emploiId;

  console.log(" id : " + emploiId);

  const [formState, inputHandler, setFormData] = useForm(
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

  useEffect(() => {
    const fetchEmploi = async () => 
    {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/emplois/${emploiId}`
        );
        setLoadedEmploi(responseData.emploi);
        setFormData(
          {
            matiere: {
                value: responseData.emploi.matiere,
                isValid: true
            },
              jour: {
                value: responseData.emploi.jour,
                isValid: true
            },
            heure: {
                value: responseData.emploi.heure,
                isValid: true
            },
              
          },
          true
        );

      } catch (err) {}
    };
    fetchEmploi();
  }, [sendRequest, emploiId, setFormData]);

  const history = useHistory();

  const classeUpdateSubmitHandler = async event => {
        console.log(formState.inputs.matiere.value);
        console.log();
    try {
      await sendRequest(
        `http://localhost:5000/api/emplois/${emploiId}`,
        'PATCH',
        JSON.stringify({
          matiere: formState.inputs.matiere.value,
          jour: formState.inputs.jour.value,
          heure: formState.inputs.heure.value,

        }),
        {
          'Content-Type': 'application/json'
        }
      );
    } catch (err) {}
    history.push('/Emplois');
  };


 

  return (
    <React.Fragment>
      <div className="parent">
      <Card className="main-card">
        <Card.Header>
          Modifier la classe:
        </Card.Header>
        <Card.Body>

        {!isLoading && loadedEmploi && (
        <form className="place-form" onSubmit={classeUpdateSubmitHandler}>
        <Input
          id="matiere"
          element="input"
          type="text"
          label="Nom de Matiere"
          initialValue={loadedEmploi.matiere}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer un nom valide"
          onInput={inputHandler}
          initialValid={true}

        />
                <br></br>
                <br></br>
        <Input
          id="jour"
          element="input"
          type="text"
          label="Jour"
          initialValue={loadedEmploi.jour}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer un jour valide"
          onInput={inputHandler}
          initialValid={true}
        />
                <br></br>
                <br></br>
        <Input
          id="heure"
          element="input"
          type="text"
          label="Heure"
          initialValue={loadedEmploi.heure}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer une Heure valide"
          onInput={inputHandler}
          initialValid={true}
        />
        <br></br>
        <br></br>
        <br></br>
          <Button type="submit">
            Modifier La Séance
          </Button>

        </form>
        
        )}
      </Card.Body>

      </Card>
      
      </div>
    </React.Fragment>
  );
};

export default UpdateEmploi;
