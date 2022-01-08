import {
  AuthAction,
  AUTHENTICATE,
  LOGOUT,
  LogoutAction,
  SetDidTryAutoLoginAction,
  SET_DID_TRY_AL,
} from '../actions/auth';

type AuthReducerInitialState = {
  token: string | null;
  userId: string | null;
  didTryAutoLogin: boolean;
};

const initialState: AuthReducerInitialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

type Action = AuthAction | SetDidTryAutoLoginAction | LogoutAction;

export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    // "combine" case SIGN_IN and SIGN_UP in one
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

    default:
      return state;
  }
};
