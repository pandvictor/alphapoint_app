import * as routes from "../Globals/Endpoints";
import * as api from "../Utils/Request";

import showNotification from "../../Components/Popup";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Authentation
export const Signup = async (body) => {
  console.log(body);
  return {
    status: 200,
    data: {
      ...body,
      status: 200,
      accessTokenKey: "asdfasf",
      refreshTokenKey: "1545asdf",
      first_name: "Messi",
    },
  };
  /*return await api
    .PostReq(routes.userSignupRoute, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      showNotification({
        type: "danger",
        message: err.message ? err.message : "Something wrong at Signup",
      });
    });*/
};
export const Login = async (body) => {
  return await api
    .PostReq(routes.userLoginRoute, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      showNotification({
        type: "danger",
        message: err.message ? err.message : "Something wrong at Signup",
      });
    });
};

export const forgotPassword = async (body) => {
  return await api
    .PostReq(routes.forgotPassword, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      showNotification({
        type: "danger",
        message: err.message ? err.message : "Something wrong at Signup",
      });
    });
};

export const verifyOtp = async (body) => {
  return await api
    .PostReq(routes.verifyOtp, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      showNotification({
        type: "danger",
        message: err.message ? err.message : "Something wrong at Signup",
      });
    });
};

export const resetPassword = async (body) => {
  return await api
    .PostReq(routes.resetPassword, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      showNotification({
        type: "danger",
        message: err.message ? err.message : "Something wrong at Signup",
      });
    });
};

//Dashbard
export const getidenfyuser = async () => {
  return await api
    .getReq(routes.idenfyRoute)
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

export const getUserProfileRoute = async (body) => {
  return await api
    .getReq(routes.getUserProfileRoute + body + "/")
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

export const updateProfileRoute = async (userUuid, body) => {
  return await api
    .putReq(routes.updateProfileRoute + userUuid + "/", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      showNotification({
        type: "danger",
        message: err.message ? err.message : "Something wrong at Signup",
      });
    });
};

export const deleteProfileRoute = async (uuid) => {
  return await api
    .delReq(routes.deleteProfileRoute + uuid + "/")
    .then((response) => {
      return response;
    })
    .catch((err) => {
      showNotification({
        type: "danger",
        message: err.message ? err.message : "Something wrong at Delete",
      });
    });
};

export const homeScreenRoute = async (body) => {
  return await api
    .getReq(routes.homeScreenRoute, body)
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

export const podsList = async (body) => {
  return await api
    .PostReq(routes.podsList, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      showNotification({
        type: "danger",
        message: err.message ? err.message : "Something wrong at Signup",
      });
    });
};

export const usageHistory = async (body) => {
  return await api
    .getReq(routes.usageHistory, body)
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

export const getUnreadNotification = async (body) => {
  return await api
    .getReq(routes.getUnreadNotification, body)
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

export const markReadUnread = async (body) => {
  return await api
    .getReq(routes.markReadUnread + body)
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

export const RefreshToken = async (body) => {
  return await api
    .PostReq(routes.refreshTokenRoute, body)
    .then((response) => {
      AsyncStorage.setItem("token", JSON.stringify(response.data.access));
      AsyncStorage.setItem("refresh", JSON.stringify(response.data.refresh));
      return response;
    })
    .catch((err) => {
      console.error(err);
      showNotification({
        type: "danger",
        message: err.message
          ? err.message
          : "Something wrong when Authorizing the request",
      });
    });
};

export const getLatestTerms = async (body) => {
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

export const deviceInfo = async (body) => {
  return await api
    .PostReq(routes.getDeviceInfo, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};
