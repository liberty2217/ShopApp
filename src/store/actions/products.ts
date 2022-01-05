import { Dispatch } from 'react';
import { Products } from '../../data/type';
import { ActionCreateProduct, SetProductsAction } from '../reducers/products';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const deleteProduct = (productId: Products['id']) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const fetchProducts = () => {
  return async (dispatch: Dispatch<SetProductsAction>) => {
    // any async code you want!
    try {
      const response = await fetch('https://rn-complete-guide-81bea-default-rtdb.firebaseio.com/products.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      const loadedProducts: Products[] = [];

      for (const key in resData) {
        loadedProducts.push({
          id: key,
          ownerId: 'u1',
          title: resData[key].title,
          imageUrl: resData[key].imageUrl,
          description: resData[key].description,
          price: resData[key].price,
        });
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (err) {
      console.log('handling error here');
      throw err;
    }
  };
};

export const createProduct = (
  title: Products['title'],
  description: Products['description'],
  imageUrl: Products['imageUrl'],
  price: Products['price'],
) => {
  return async (dispatch: Dispatch<ActionCreateProduct>) => {
    // any async code you want!
    const response = await fetch('https://rn-complete-guide-81bea-default-rtdb.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (
  id: Products['id'],
  title: Products['title'],
  description: Products['description'],
  imageUrl: Products['imageUrl'],
) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
