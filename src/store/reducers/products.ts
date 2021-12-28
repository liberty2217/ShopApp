import { PRODUCTS } from '../../data/dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownderId === 'u1'),
};

export const productsReducer = (state = initialState, action) => {
  return state;
};
