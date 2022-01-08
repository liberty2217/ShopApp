import { AuthAction, AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

// const initialState = {
//     // ts error - if null then nothing but null
//     token: null,
//     userId: null,
//   };

type Action = AuthAction;

export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    }
    case SET_DID_TRY_AL: {
      return {
        ...state,
        didTryAutoLogin: true,
      };
    }
    case LOGOUT: {
      //reset token to logout
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    }
    // case LOGIN: {
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    // }
    // case SIGNUP: {
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    // }
    default:
      return state;
  }
};
