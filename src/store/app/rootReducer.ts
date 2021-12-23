import { combineReducers, createStore } from '@reduxjs/toolkit';
import { productsReducer } from '../reducers/products';

export const rootReducer = combineReducers({
  products: productsReducer,
});

export const store = createStore(rootReducer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
