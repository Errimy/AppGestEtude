import React from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/Input'
import Button from '../../shared/Button'
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
  } from '../../shared/util/validators';

const AddUser = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrer le nom"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Ajouter l'Utilisateur
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddUser;