import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AdminStackParamList } from '../../navigation/AdminNavigator';
import { createProduct, updateProduct } from '../../store/actions/products';
import { useAppSelector } from '../../store/app/rootReducer';
import { styles as s } from './styles';

type Props = NativeStackScreenProps<AdminStackParamList, 'UserEditProduct'>;

export const UserEditProduct: React.FC<Props> = (props) => {
  const { route, navigation } = props;

  const { productId } = { ...route.params };

  const editedProduct = useAppSelector((state) => state.products.userProducts.find((prod) => prod.id === productId));

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(updateProduct(productId!, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }
  }, [description, dispatch, editedProduct, imageUrl, price, productId, title]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [navigation, submitHandler]);

  return (
    <ScrollView>
      <View style={s.form}>
        <View style={s.formControl}>
          <Text style={s.label}>Title</Text>
          <TextInput style={s.input} value={title} onChangeText={(text) => setTitle(text)} />
        </View>
        <View style={s.formControl}>
          <Text style={s.label}>Image URL</Text>
          <TextInput style={s.input} value={imageUrl} onChangeText={(text) => setImageUrl(text)} />
        </View>
        {editedProduct ? null : (
          <View style={s.formControl}>
            <Text style={s.label}>Price</Text>
            <TextInput style={s.input} value={price} onChangeText={(text) => setPrice(text)} />
          </View>
        )}
        <View style={s.formControl}>
          <Text style={s.label}>Description</Text>
          <TextInput style={s.input} value={description} onChangeText={(text) => setDescription(text)} />
        </View>
      </View>
    </ScrollView>
  );
};
