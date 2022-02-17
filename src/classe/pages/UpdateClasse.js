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

const UpdateClasse = () => {
  const { isLoading, sendRequest} = useHttpClient();
  const [loadedClasse, setLoadedClasse] = useState();
  const classeId = useParams().classeId;

  console.log(" id : " + classeId);

  const [formState, inputHandler, setFormData] = useForm(
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

  useEffect(() => {
    const fetchClasse = async () => 
    {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/classes/${classeId}`
        );
        setLoadedClasse(responseData.classe);
        setFormData(
          {
            nom_classe: {
                value: responseData.classe.nom_classe,
                isValid: true
            },
              emploi_classe: {
                value: responseData.classe.emploi_classe,
                isValid: true
            },
              
          },
          true
        );

      } catch (err) {}
    };
    fetchClasse();
  }, [sendRequest, classeId, setFormData]);

  const history = useHistory();

  const classeUpdateSubmitHandler = async event => {
        console.log(formState.inputs.nom_classe.value);
        console.log();
    try {
      await sendRequest(
        `http://localhost:5000/api/classes/${classeId}`,
        'PATCH',
        JSON.stringify({
          nom_classe: formState.inputs.nom_classe.value,
          emploi_classe: formState.inputs.emploi_classe.value,
        }),
        {
          'Content-Type': 'application/json'
        }
      );
    } catch (err) {}
    history.push('/Classe');
  };


 

  return (
    <React.Fragment>
      <div className="parent">
      <Card className="main-card">
        <Card.Header>
          Modifier la classe:
        </Card.Header>
        <Card.Body>

        {!isLoading && loadedClasse && (
        <form className="place-form" onSubmit={classeUpdateSubmitHandler}>
        <Input
          id="nom_classe"
          element="input"
          type="text"
          label="Nom de Classe"
          initialValue={loadedClasse.nom_classe}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer un nom de classe valide"
          onInput={inputHandler}
          initialValid={true}

        />
        <br></br>
        <Input
          id="emploi_classe"
          element="input"
          type="text"
          label="Emploi de la classe"
          initialValue={loadedClasse.emploi_classe}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer un emploi valide"
          onInput={inputHandler}
          initialValid={true}
        />
        <br></br>
        <br></br>
        <br></br>
          <Button type="submit">
            Modifier La classe
          </Button>

        </form>
        
        )}
      </Card.Body>

      </Card>
      
      </div>
    </React.Fragment>
  );
};

export default UpdateClasse;
