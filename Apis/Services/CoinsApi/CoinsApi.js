import * as routes from "../../Globals/Endpoints";
import * as api from "../../Utils/Request";

import showNotification from "../../../Components/Popup";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getCryptoInfo = async (cryptoID) => {
  return await api
    .getReq(`${routes.getCoinInfo}?id=${cryptoID}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      showNotification({
        type: "danger",
        message: err.message ? err.message : "Something wrong at getCrytoInfo",
      });
    });
};
export const get50Crypto = async (body) => {
  return await api
    .getReq(routes.getAllCoins)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      showNotification({
        type: "danger",
        message: err.message ? err.message : "Something wrong at 50Crypto",
      });
    });
};
