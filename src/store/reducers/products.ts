import { PRODUCTS } from '../../data/dummy-data';
import { Products } from '../../data/type';
import { DELETE_PRODUCT } from '../actions/products';

export interface ActionDeleteProduct {
  type: 'DELETE_PRODUCT';
  pid: Products['id'];
}

type Action = ActionDeleteProduct;

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownderId === 'u1'),
};

export const productsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter((product) => product.id !== action.pid),
        availableProducts: state.availableProducts.filter((product) => product.id !== action.pid),
      };
    }
    default:
      return state;
  }
};
