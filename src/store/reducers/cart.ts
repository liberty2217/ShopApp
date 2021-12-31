import { Products } from '../../data/type';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';
import { ActionAddOrder } from './orders';
import { ActionDeleteProduct } from './products';

export type CartItem = {
  [key: string]: {
    quantity: number;
    prodPrice: Products['price'];
    prodTitle: Products['title'];
    sum: number;
  };
};

interface CartReducerInitialState {
  items: CartItem;
  totalAmount: number;
}

interface ActionAddToCart {
  type: 'ADD_TO_CART';
  payload: Products;
}

interface ActionRemoveFromCart {
  type: 'REMOVE_FROM_CART';
  pid: Products['id'];
}

type Action = ActionAddToCart | ActionRemoveFromCart | ActionAddOrder | ActionDeleteProduct;

const initialState: CartReducerInitialState = {
  items: {},
  totalAmount: 0,
};
export const cartReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.payload;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        const updatedCartItem = {
          quantity: state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          sum: state.items[addedProduct.id].sum + prodPrice,
        };
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const newCartItem = { quantity: 1, prodPrice, prodTitle, sum: prodPrice };
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }
    }
    case REMOVE_FROM_CART: {
      const selectedCartItem = state.items[action.pid];
      const currentQty = state.items[action.pid].quantity;

      let updatedCartItems;

      if (currentQty > 1) {
        //we need to reduce it, not erase it
        updatedCartItems = {
          quantity: selectedCartItem.quantity - 1,
          prodPrice: selectedCartItem.prodPrice,
          prodTitle: selectedCartItem.prodTitle,
          sum: selectedCartItem.sum - selectedCartItem.prodPrice,
        };
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItems };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.prodPrice,
      };
    }

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT: {
      if (!state.items[action.pid]) {
        return state;
      }

      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    }

    default:
      return state;
  }
};
