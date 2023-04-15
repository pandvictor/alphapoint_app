import axios from "axios";
import URL from "../Globals/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showNotification from "../../Components/Popup";
import { RefreshToken } from "../Services/UserAuth";
import {
  getLatestTermsRoute,
  refreshTokenRoute,
  userLoginRoute,
  userSignupRoute,
} from "../Globals/Endpoints";
import jwt from "jwt-decode";
import { clearSession, getAccessToken, getRefreshToken } from "./Session";
import { setIsLoggedIn } from "../../redux/CommonStateSlice";

/**Create a instance of axios with a custom config */

export const http = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export const httpMultipart = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const checkTokens = async (url) => {
  const noAuthUrls = [
    refreshTokenRoute,
    userLoginRoute,
    userSignupRoute,
    getLatestTermsRoute,
  ];
  const REFRESH_TOKEN_AT = 86400;
  let refresh = await getRefreshToken();
  let token = await getAccessToken();

  if (!token || !refresh) return token;

  const exp_date = new Date(jwt(token).exp);
  const remaining_exp = (exp_date.getTime() * 1000 - Date.now()) / 1000;
  if (noAuthUrls.indexOf(url) === -1 && remaining_exp <= REFRESH_TOKEN_AT) {
    await RefreshToken({ refresh: JSON.parse(refresh) });
    token = await getAccessToken();
  }
  return token;
};

export const defineInterceptors = (store) => {
  /**Add a request interceptor */
  http.interceptors.request.use(
    async (config) => {
      let token = await checkTokens(config.url);
      if (token)
        config.headers[`Authorization`] = `Bearer ${JSON.parse(token)}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**Add a response interceptor */
  http.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log("error interceptors response", error);
      // return error.message;
      try {
        const res = error.text();
        if (res.indexOf("502 Bad Gateway") !== -1) {
          showNotification({
            type: "danger",
            message: "Server Error",
            description: "Please try again later",
          });
        }
      } catch (e) {}
      try {
        if (error.message == "Network Error") {
          showNotification({
            type: "danger",
            message: "Sign in",
            description:
              "Network not available. Please check your internet connect and try again",
          });
          return;
        }
      } catch (error) {}
      if (error.response) {
        try {
          if (
            error.response.data.response ==
            "User verification is being processed"
          ) {
            return {
              status: error.response.status,
              message: error.response.data,
            };
          }
        } catch (error) {}
        console.log("error.response.status", error.response.status);
        if (400 === error.response.status) {
          showNotification({
            type: "danger",
            message: error.response.data
              ? JSON.stringify(error.response.data)
              : "Server cannot process the request at this time Please try again later",
          });
        } else if (403 === error.response.status) {
          try {
            if (
              JSON.stringify(error.response.data?.Error).indexOf(
                "Make sure to stand within 250 feet of door to unlock"
              ) == -1
            ) {
              showNotification({
                type: "danger",
                message: error.response.data?.Error
                  ? JSON.stringify(error.response.data?.Error)
                  : "Some error occurs Please try again later",
              });
            }
          } catch (e) {}
        } else if (401 === error.response.status) {
          console.log("error.response.status", error.response.status);
          console.log("error.response.data", error.response.data);
          clearSession();
          showNotification({
            type: "warning",
            message:
              "Please login with valid credentials and verify your email",
          });
          store.dispatch(setIsLoggedIn(false));
        } else {
          showNotification({
            type: "danger",
            message: error.response.data
              ? JSON.stringify(error.response.data)
              : "Connect Error! Some internal error occured please try again later",
          });
        }
        try {
          return {
            status: error.response.status,
            message: error.response.data,
          };
        } catch (e) {
          return {
            status: error.response.status,
            message: "Some error occured please try again later",
          };
        }
      }
    }
  );

  /**Add a request interceptor */
  httpMultipart.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("token");

      // if (token) config.headers.authorization =  token;
      if (token)
        config.headers[`Authorization`] = `Bearer ${JSON.parse(token)}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**Add a response interceptor */
  httpMultipart.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        showNotification({
          type: "danger",
          message: error.response.data
            ? JSON.stringify(error.response.data)
            : "some error occurs 1 ",
        });
        if (401 === error.response.status) {
        } else {
          showNotification(
            "danger",
            error.response.data.message
              ? error.response.data.message
              : "some error occurs 2"
          );
          return error;
        }
      }
    }
  );
};
