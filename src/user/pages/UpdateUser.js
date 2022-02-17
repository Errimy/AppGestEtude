import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory,Link } from 'react-router-dom';

import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { Card } from 'react-bootstrap';
import './AddUser.css';

const UpdateUser = () => {
  const { isLoading, sendRequest} = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const userId = useParams().userId;

  console.log("User id : " + userId);

  const [formState, inputHandler, setFormData] = useForm(
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

  useEffect(() => {
    const fetchUser = async () => 
    {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
        );
        setLoadedUser(responseData.user);
        setFormData(
          {
            nom: {
                value: responseData.user.nom,
                isValid: true
            },
              prenom: {
                value: responseData.user.prenom,
                isValid: true
            },
              email: {
                value: responseData.user.email,
                isValid: true
            },
              mdp: {
                value: responseData.user.mdp,
                isValid: true
            },
              classe_user: {
                value: responseData.user.classe_user,
                isValid: true
            },
              role: {
                value: responseData.user.role,
                isValid: true
            },
          },
          true
        );

      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, userId, setFormData]);

  const history = useHistory();

  const userUpdateSubmitHandler = async event => {
        console.log(formState.inputs.nom.value);
        console.log();
    try {
      await sendRequest(
        `http://localhost:5000/api/users/${userId}`,
        'PATCH',
        JSON.stringify({
          nom: formState.inputs.nom.value,
          prenom: formState.inputs.prenom.value,
          email: formState.inputs.email.value,
          mdp: formState.inputs.mdp.value,
          classe_user: formState.inputs.classe_user.value,
          role: formState.inputs.role.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
    } catch (err) {}
    history.push('/');
  };


 

  return (
    <React.Fragment>
      <div className="parent">
      <Card className="main-card">
        <Card.Header>
          Modifier l'utilisateur:
        </Card.Header>
        <Card.Body>

        {!isLoading && loadedUser && (
        <form className="place-form" onSubmit={userUpdateSubmitHandler}>
        <Input
          id="nom"
          element="input"
          type="text"
          label="Nom"
          initialValue={loadedUser.nom}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer un nom valide"
          onInput={inputHandler}
          initialValid={true}

        />
        <br></br>
        <Input
          id="prenom"
          element="input"
          type="text"
          label="Prenom"
          initialValue={loadedUser.prenom}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer un prenom valide"
          onInput={inputHandler}
          initialValid={true}

        />
        <br></br>
        <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            initialValue={loadedUser.email}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Adresse email pas valide"
            onInput={inputHandler}
            initialValid={true}

          />
          <br></br>
        <Input
            element="input"
            id="mdp"
            type="password"
            label="Mot de passe"
            initialValue={loadedUser.password}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="mot de passe de longuere minimum doit etre 6."
            onInput={inputHandler}
            initialValid={true}

          />
          <br></br>
        <Input
          id="classe_user"
          element="input"
          type="text"
          label="Classe"
          initialValue={loadedUser.classe_user}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer une classe valide"
          onInput={inputHandler}
          initialValid={true}

        />
        <br></br>
        <Input
          id="role"
          element="input"
          type="text"
          label="Role"
          initialValue={loadedUser.role}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer le role de cette utilisateur."
          onInput={inputHandler}
          initialValid={true}

        />
        
        <br></br>
        <br></br>
        <br></br>
        <Link to="/Users">
          <Button type="submit">
            Modifier l'utilisateur
          </Button>
        </Link>
        </form>
        
        )}
      </Card.Body>

      </Card>
      
      </div>
    </React.Fragment>
  );
};

export default UpdateUser;
