import {SESSION_DATA, IS_LOGIN, USER_ID, USER_ROLE_ID} from './Type';

export const sessiondata = data => {
  return {
    type: SESSION_DATA,
    payload: data,
  };
};
export const islogin = loginstate => {
  return {
    type: IS_LOGIN,
    payload: loginstate,
  };
};
export const useriddispatch = id => {
  return {
    type: USER_ID,
    payload: id,
  };
};
export const userroleiddispatch = id => {
  return {
    type: USER_ROLE_ID,
    payload: id,
  };
};
