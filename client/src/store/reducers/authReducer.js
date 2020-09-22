import * as actionType from "../actions/actionTypes";
const initState = {
  token: null,
  email: null,
  userId: null,
  loading: false,
  errors: {
    email: null,
    password: null,
    general: null,
  },
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, general: null, email: null, userId: null },
      };

    case actionType.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        email: action.email,
        userId: action.userId,
        loading: false,
      };
    case actionType.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          general: action.errors.error,
          email: action.errors.email,
          password: action.errors.password,
        },
      };

    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        email: null,
        userId: null,
        errors: { ...state.errors, general: null, email: null, userId: null },
      };

    default:
      return state;
  }
};

export default authReducer;
