import { PRODUCTS } from '../../data/dummy-data';
import { Products } from '../../data/type';
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../actions/products';

export interface ActionDeleteProduct {
  type: typeof DELETE_PRODUCT;
  pid: Products['id'];
}

export interface ActionCreateProduct {
  type: typeof CREATE_PRODUCT;
  productData: {
    title: Products['title'];
    description: Products['description'];
    imageUrl: Products['imageUrl'];
    price: Products['price'];
  };
}

export interface ActionUpdateProduct {
  type: typeof UPDATE_PRODUCT;
  pid: Products['id'];
  productData: {
    title: Products['title'];
    description: Products['description'];
    imageUrl: Products['imageUrl'];
  };
}

type Actions = ActionDeleteProduct | ActionCreateProduct | ActionUpdateProduct;

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownderId === 'u1'),
};

export const productsReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case CREATE_PRODUCT: {
      const newProduct: Products = {
        id: new Date().toString(),
        ownderId: 'u1',
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
        ownderId: state.userProducts[productIndex].ownderId,
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
