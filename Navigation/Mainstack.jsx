import { View, Text, Linking } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splashscreen from "../Screens/Authentication/Splashscreen";
import Signin from "../Screens/Authentication/Signin";
import Landing from "../Screens/Authentication/Landing";
import CryptoList from "../Screens/Crypto/CryptoList";
import Details from "../Screens/Crypto/Details";

import {
  checkSession,
  clearSession,
  getAccessToken,
} from "../Apis/Utils/Session";
import { setIsLoggedIn } from "../redux/CommonStateSlice";
import jwt from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
export default function Mainstack() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Landing");
  const is_logged_in = useSelector((state) => state.CommonState.is_logged_in);
  var userMail = "";

  const navigationRef = useRef();

  const dispatch = useDispatch();

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      console.log("checking session");
      const check_session = await checkSession();
      let is_logged_in = check_session;

      if (check_session) {
        const userData = await AsyncStorage.getItem("UserEmail");
        const user = JSON.parse(userData);
        console.log("MainStack: user", check_session, user);
        // if (user?.idenfy_verification_status === "V") {
        //   setInitialRoute("CryptoList");
        // } else {
        setInitialRoute("CryptoList");
        userMail = userData?.email;
        // }
        //const token = await getAccessToken();
        const exp_date = new Date();
        const remaining_exp = (exp_date.getTime() * 1000 - Date.now()) / 1000;

        if (remaining_exp <= 0) {
          await clearSession();
          is_logged_in = false;
        }
      }
      setIsLoading(false);
      dispatch(setIsLoggedIn(is_logged_in));
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return <Splashscreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
        }}>
        {is_logged_in === false ? (
          <>
            <Stack.Screen name='Landing' component={Landing} />
            <Stack.Screen name='Signin' component={Signin} />
          </>
        ) : (
          <>
            <Stack.Screen name='CryptoList' component={CryptoList} />
            <Stack.Screen name='Details' component={Details} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
