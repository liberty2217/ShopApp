import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '../../constants';
import { styles as s } from './styles';
import { useAppDispatch } from '../../store/app/rootReducer';
import { authenticate, setDidTryAL } from '../../store/actions/auth';

export const Startup = (props) => {
  const { navigation } = props;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        dispatch(setDidTryAL());
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;

      const expirationDate = new Date(expiryDate);

      // if cur date is past than expiry token date or token is invalid then return to Auth screen
      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(setDidTryAL());

        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      // if all are valid -> then authenticate user
      dispatch(authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={s.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};
