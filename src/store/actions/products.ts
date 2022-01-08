import { ThunkAction } from '@reduxjs/toolkit';
import { Products } from '../../data/type';
import { RootState } from '../app/rootReducer';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export type ActionDeleteProduct = {
  type: typeof DELETE_PRODUCT;
  pid: Products['id'];
};

export type ActionCreateProduct = {
  type: typeof CREATE_PRODUCT;
  productData: Products;
};

export type ActionUpdateProduct = {
  type: typeof UPDATE_PRODUCT;
  pid: Products['id'];
  productData: {
    title: Products['title'];
    description: Products['description'];
    imageUrl: Products['imageUrl'];
  };
};

export type ActionSetProducts = {
  type: typeof SET_PRODUCTS;
  products: Products[];
  userProducts: Products[];
};

type ActionSetProduct = {
  type: typeof SET_PRODUCTS;
  products: Products[];
};

export const deleteProduct = (
  productId: Products['id'],
): ThunkAction<void, RootState, unknown, ActionDeleteProduct> => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://rn-complete-guide-81bea-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('Something wen wrong!');
    }

    return dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const fetchProducts = (): ThunkAction<void, RootState, unknown, ActionSetProduct> => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch('https://rn-complete-guide-81bea-default-rtdb.firebaseio.com/products.json');

      if (!response.ok) {
        // if repsonse is 400 / 500 status code
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      const loadedProducts: Products[] = [];

      for (const key in resData) {
        loadedProducts.push({
          id: key,
          ownerId: resData[key].ownerId,
          title: resData[key].title,
          imageUrl: resData[key].imageUrl,
          description: resData[key].description,
          price: resData[key].price,
        });
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
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
): ThunkAction<void, RootState, unknown, ActionCreateProduct> => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://rn-complete-guide-81bea-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      },
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId!,
      },
    });
  };
};

export const updateProduct = (
  id: Products['id'],
  title: Products['title'],
  description: Products['description'],
  imageUrl: Products['imageUrl'],
): ThunkAction<void, RootState, unknown, ActionUpdateProduct> => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-complete-guide-81bea-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something wen wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
