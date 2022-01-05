import { PRODUCTS } from '../../data/dummy-data';
import { Products } from '../../data/type';
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/products';

export interface ActionDeleteProduct {
  type: typeof DELETE_PRODUCT;
  pid: Products['id'];
}

export interface ActionCreateProduct {
  type: typeof CREATE_PRODUCT;
  productData: {
    id: string;
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

export interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  products: Products[];
}

type Actions = ActionDeleteProduct | ActionCreateProduct | ActionUpdateProduct | SetProductsAction;

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export const productsReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        availableProducts: action.products,
        userProducts: action.products,
      };
    }

    case CREATE_PRODUCT: {
      const newProduct: Products = {
        id: action.productData.id,
        ownerId: 'u1',
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
