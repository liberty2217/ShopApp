import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Card } from '../../components/UI/Card';
import { Input } from '../../components/UI/Input';
import { Colors } from '../../constants';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { login, signup } from '../../store/actions/auth';
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

type Props = NativeStackScreenProps<AuthStackParamList, 'Auth'>;

export const Auth: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);

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

  useEffect(() => {
    if (error) {
      Alert.alert('Error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = signup(formState.inputValues.email, formState.inputValues.password);
    } else {
      action = login(formState.inputValues.email, formState.inputValues.password);
    }

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
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
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button title={isSignup ? 'Sign Up' : 'Login'} color={Colors.primary} onPress={authHandler} />
            )}

            <Button
              title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup((prevState) => !prevState);
              }}
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};
