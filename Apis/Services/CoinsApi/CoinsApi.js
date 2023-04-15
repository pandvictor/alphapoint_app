import * as routes from "../Globals/Endpoints";
import * as api from "../Utils/Request";

import showNotification from "../../Components/Popup";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const get50Crypto = async (body) => {
  return await api
    .getReq(routes.getLatestTermsRoute)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      showNotification({
        type: "danger",
        message: err.message ? err.message : "Something wrong at Login",
      });
    });
};
