import { PRODUCTS } from '../../data/dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  useProducts: PRODUCTS.filter((product) => product.id === 'u1'),
};

export const productsReducer = (state = initialState, action) => {
  return state;
};
