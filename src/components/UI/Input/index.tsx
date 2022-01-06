import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { styles as s } from './styles';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

interface InputProps extends TextInputProps {
  id: string;
  label: string;
  errorText: string;
  onInputChange: any;
  initialValue?: string;
  initiallyValid?: boolean;
  required: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
}

export const Input: React.FC<InputProps> = (props) => {
  const { initialValue, initiallyValid, onInputChange, id } = props;

  const { required, email, min, max, minLength } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initiallyValid,
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;

    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +text < min) {
      isValid = false;
    }
    if (max != null && +text > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={s.formControl}>
      <Text style={s.label}>{props.label}</Text>
      <TextInput
        style={s.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        {...props}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={s.errorContainer}>
          <Text style={s.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};
