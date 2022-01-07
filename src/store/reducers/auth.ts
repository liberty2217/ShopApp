import { LOGIN, SIGNUP, AuthAction } from '../actions/auth';

const initialState = {
  token: '',
  userId: '',
};

// const initialState = {
//     // ts error - if null then nothing but null
//     token: null,
//     userId: null,
//   };

type Action = AuthAction;

export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        token: action.token,
        userId: action.userId,
      };
    }
    case SIGNUP: {
      return {
        token: action.token,
        userId: action.userId,
      };
    }
    default:
      return state;
  }
};
