import { Text, LogBox, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import FlashMessage from "react-native-flash-message";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import SplashScreen from "react-native-splash-screen";
import Mainstack from "./Navigation/Mainstack";
//import { defineInterceptors } from "./Src/Apis/Utils/Http";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  LogBox.ignoreAllLogs();
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;

  //defineInterceptors(store);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Mainstack />
          <FlashMessage position='top' />
        </View>
      </Provider>
    </GestureHandlerRootView>
  );
}
