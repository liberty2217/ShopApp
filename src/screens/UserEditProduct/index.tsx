import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { AdminStackParamList } from '../../navigation/AdminNavigator';
import { createProduct, updateProduct } from '../../store/actions/products';
import { useAppSelector } from '../../store/app/rootReducer';
import { styles as s } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input } from '../../components/UI/Input';
import { Colors } from '../../constants';

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

type Props = NativeStackScreenProps<AdminStackParamList, 'UserEditProduct'>;

export const UserEditProduct: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { route, navigation } = props;

  const { productId } = { ...route.params };

  const editedProduct = useAppSelector((state) => state.products.userProducts.find((prod) => prod.id === productId));

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      if (editedProduct) {
        await dispatch(
          updateProduct(
            productId!,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
          ),
        );
      } else {
        await dispatch(
          createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
          ),
        );
      }
    } catch (err: any) {
      setError(err.message);
    }

    setIsLoading(false);
    navigation.goBack();
  }, [dispatch, formState, productId, editedProduct, navigation]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [navigation, submitHandler]);

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

  if (isLoading) {
    return (
      <View style={s.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={s.kav} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={s.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
