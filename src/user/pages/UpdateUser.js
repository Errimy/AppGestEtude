import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hooks';

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

  const userUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/users/${userId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
    } catch (err) {}
  };


 

  return (
    <React.Fragment>

      {!isLoading && loadedUser && (
        <form className="place-form" onSubmit={userUpdateSubmitHandler}>
        <Input
          id="nom"
          element="input"
          type="text"
          label="Nom"
          initialValue={loadedUser.nom}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer le nom"
          onInput={inputHandler}
        />
        <br></br>
        <br></br>
        <Input
          id="prenom"
          element="input"
          type="text"
          label="Prenom"
          initialValue={loadedUser.prenom}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer le nom"
          onInput={inputHandler}
        />
        <br></br>
        <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            initialValue={loadedUser.email}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Adresse email"
            onInput={inputHandler}
          />
          <br></br>
        <Input
            element="input"
            id="mdp"
            type="password"
            label="Mot de passe"
            initialValue={loadedUser.password}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Entrer votre mot de passe"
            onInput={inputHandler}
          />
          <br></br>
        <Input
          id="classe_user"
          element="input"
          type="text"
          label="Classe"
          initialValue={loadedUser.classe_user}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer la classe"
          onInput={inputHandler}
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
        />
        <br></br>
        <br></br>
        <br></br>
          <Button type="submit" disabled={!formState.isValid}>
            Modifier l'utilisateur
          </Button>
        </form>
        )}
    </React.Fragment>
  );
};

export default UpdateUser;
