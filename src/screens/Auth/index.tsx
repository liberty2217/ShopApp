import React, { useCallback, useReducer } from 'react';
import { Button, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Card } from '../../components/UI/Card';
import { Input } from '../../components/UI/Input';
import { Colors } from '../../constants';
import { signup } from '../../store/actions/auth';
import { styles as s } from './styles';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

export const Auth = () => {
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const signupHandler = () => {
    dispatch(signup(formState.inputValues.email, formState.inputValues.password));
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier: string, inputValue: any, inputValidity: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  return (
    <KeyboardAvoidingView style={s.screen}>
      <Card style={s.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid E-mail address"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password address"
            onInputChange={inputChangeHandler}
            initialValue=""
          />

          <View style={s.buttonContainer}>
            <Button title="Login" color={Colors.primary} onPress={signupHandler} />
            <Button title="Switch to Sign up" color={Colors.primary} onPress={() => null} />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};
