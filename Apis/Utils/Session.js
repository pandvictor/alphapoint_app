import AsyncStorage from "@react-native-async-storage/async-storage";

const accessTokenKey = "token";
const refreshTokenKey = "refresh";
const userKey = "UserEmail";
export const setSession = async (user, accessToken, refreshToken) => {
  await AsyncStorage.setItem(accessTokenKey, accessToken);
  await AsyncStorage.setItem(refreshTokenKey, refreshToken);
  await AsyncStorage.setItem(userKey, JSON.stringify(user));
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem(accessTokenKey);
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem(refreshTokenKey);
};

export const getUser = async () => {
  return await AsyncStorage.getItem(userKey);
};

export const clearSession = async () => {
  await AsyncStorage.removeItem(accessTokenKey);
  await AsyncStorage.removeItem(refreshTokenKey);
  await AsyncStorage.removeItem(userKey);
};
export const checkSession = async () => {
  let accessToken = await AsyncStorage.getItem(accessTokenKey);
  let refreshToken = await AsyncStorage.getItem(refreshTokenKey);
  return !!accessToken && !!refreshToken;
};
