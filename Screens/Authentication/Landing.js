import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  BackHandler,
  Animated,
  Dimensions,
} from "react-native";
import React, { useRef } from "react";
import {
  appcolor,
  fontFamily,
  Images,
  resizeMode,
} from "../../Components/Constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CommonBtn from "../../Components/CommonBtn";
import CommonTextInput from "../../Components/CommonTextInput";
import getDeviceAttributes from "../../utils/getDeviceAttributes";

export default function Landing(props) {
  const widthWindow = Dimensions.get("window").width;
  const translateAnimation = useRef(new Animated.Value(-widthWindow)).current;

  const translateIn = () => {
    Animated.timing(translateAnimation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    getDeviceAttributes();
    const unsubscribe = props.navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", backPressed);
      // The screen is focused
      // Call any action
    });
    const subscribe = props.navigation.addListener("blur", () => {
      BackHandler.removeEventListener("hardwareBackPress", backPressed);

      // The screen is focused
      // Call any action
    });

    setTimeout(() => translateIn(), 500);

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);
  const backPressed = () => {
    if (props.navigation.isFocused()) {
      BackHandler.exitApp();
    }
  };
  // const childRef = useRef()

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle={"default"}
      />
      <ImageBackground
        source={Images.ic_splash}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingHorizontal: wp("3"),
          paddingBottom: hp("8"),
        }}
        resizeMode={resizeMode.cover}>
        <Animated.View
          style={{ transform: [{ translateX: translateAnimation }] }}>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: fontFamily.verdanaSemiBold,
                color: appcolor.white,
              }}>
              Welcome to{" "}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 40,
              fontFamily: fontFamily.Brandonblk,
              color: appcolor.white,
              marginTop: wp("1"),
              marginVertical: wp("-4"),
            }}>
            AlphaPoint
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamily.verdanaRegular,
              color: appcolor.white,
              marginVertical: wp("4"),
              textAlign: "left",
              width: "75%",
            }}>
            Buy and Sell Crypto, {"\n"}
            Exclusively for Everyone.{" "}
          </Text>
          <CommonBtn title='Sign Up' />
          <CommonBtn
            title='Sign In'
            onPress={() => props.navigation.navigate("Signin")}
            buttonstyle={{ backgroundColor: appcolor.white }}
            textcolor={{ color: appcolor.darkgray }}
          />
          <Text style={{ color: appcolor.white }}>0.32.0</Text>
        </Animated.View>
      </ImageBackground>
      {/* </Drawertag> */}
    </View>
  );
}
