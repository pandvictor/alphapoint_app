import {SESSION_DATA, IS_LOGIN, USER_ID, USER_ROLE_ID} from './Type';

const initialState = {
  session: {},
  Islogin: false,
  UserrRoleid: 0,
  UserId: 0,
};

const SessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_DATA:
      return {
        ...state,
        session: action.payload,
      };
    case IS_LOGIN:
      return {
        ...state,
        Islogin: action.payload,
      };
    case USER_ID:
      return {
        ...state,
        UserId: action.payload,
      };
    case USER_ROLE_ID:
      return {
        ...state,
        UserrRoleid: action.payload,
      };

    default:
      return state;
  }
};
export default SessionReducer;
