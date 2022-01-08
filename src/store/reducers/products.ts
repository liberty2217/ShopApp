import { Products } from '../../data/type';
import {
  ActionCreateProduct,
  ActionDeleteProduct,
  ActionSetProducts,
  ActionUpdateProduct,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from '../actions/products';

type InitialState = {
  availableProducts: Products[];
  userProducts: Products[];
};
const initialState: InitialState = {
  availableProducts: [],
  userProducts: [],
};

type Actions = ActionDeleteProduct | ActionCreateProduct | ActionUpdateProduct | ActionSetProducts;

export const productsReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    }

    case CREATE_PRODUCT: {
      const newProduct: Products = {
        id: action.productData.id,
        ownerId: action.productData.ownerId,
        title: action.productData.title,
        imageUrl: action.productData.imageUrl,
        description: action.productData.description,
        price: action.productData.price,
      };
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    }

    case UPDATE_PRODUCT: {
      const productIndex = state.userProducts.findIndex((prod) => prod.id === action.pid);
      const updatedProduct: Products = {
        id: action.pid,
        ownerId: state.userProducts[productIndex].ownerId,
        title: action.productData.title,
        imageUrl: action.productData.imageUrl,
        description: action.productData.description,
        price: state.userProducts[productIndex].price,
      };
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availabelProductIndex = state.availableProducts.findIndex((prod) => prod.id === action.pid);
      const updatedAvailabelProducts = [...state.availableProducts];
      updatedAvailabelProducts[availabelProductIndex] = updatedProduct;

      return {
        ...state,
        availabelProducts: updatedAvailabelProducts,
        userProducts: updatedUserProducts,
      };
    }

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
