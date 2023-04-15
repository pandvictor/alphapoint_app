import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  appcolor,
  constants,
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
import Header from "../../Components/Header";
import showNotification from "../../Components/Popup";
import Loder from "../../Components/Loder";
import * as authServices from "../../Apis/Services/UserAuth";

import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/CommonStateSlice";
import { setSession } from "../../Apis/Utils/Session";
import validateEmail from "../../utils/verifyEmail";
import getDeviceAttributes from "../../utils/getDeviceAttributes";

export default function Signin(props) {
  console.log("si entro signin");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Rememberme, setRememberme] = useState(false);
  const [prevRemember, setPrevRemember] = useState(false);
  const [Showloder, setShowloder] = useState(false);
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const dispatch = useDispatch();

  const blurerror = () => {
    setEmail("");
    setPassword("");
    setRememberme(false);
  };
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      AsyncStorage.removeItem("token");
      getRememberMeData();
    });
    const subscribe = props.navigation.addListener("blur", () => {
      blurerror();

      // The screen is focused
      // Call any action
    });
    fadeIn();
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const Valiadtion = () => {
    if (!validateEmail(Email.trim())) {
      showNotification({
        type: "danger",
        message: "Email",
        description: "Please enter valid email",
      });

      return false;
    } else if (Password == "") {
      showNotification({
        type: "danger",
        message: "Password",
        description: "Please enter password",
      });

      return false;
    }

    return true;
  };
  const Submit = () => {
    if (Valiadtion()) {
      validateRememberData();
      setShowloder(true);
      let body = {
        email: Email.toLocaleLowerCase(),
        password: Password,
      };
      if (Valiadtion()) {
        dispatch(setIsLoggedIn(true));
        setSession(
          JSON.stringify({ ...body, uuid: "ses45623sf" }),
          JSON.stringify("adasfsfasdrwe"),
          JSON.stringify("aesfseqgkm2pS")
        );
        props.navigation.navigate("Home");
        return;
        authServices
          .Login(body)
          .then((resp) => {
            setShowloder(false);
            console.log("resp", resp);
            try {
              //const res = resp?.text();
              if (res.indexOf("502 Bad Gateway") !== -1) {
                showNotification({
                  type: "danger",
                  message: "Server Error",
                  description: "Please try again later.",
                });
              }
            } catch (e) {
              console.log(e);
            }

            if (!resp) {
              showNotification({
                type: "danger",
                message: "Sign in",
                description: "Invalid Credentials",
              });
            }

            if (resp?.message == "Network Error") {
              showNotification({
                type: "danger",
                message: "Sign in",
                description:
                  "Network not available. Please check your internet and try again",
              });
            }
            const { data } = resp;
            if (data?.status == 401) {
              showNotification({
                type: "danger",
                message: "Sign in",
                description: "Invalid Credentials",
              });
            } else if (data?.status == 417) {
              showNotification({
                type: "danger",
                message: "Sign in",
                description: "Email not Confirmed",
              });
            } else if (data?.status == 502) {
              showNotification({
                type: "danger",
                message: "Sign in",
                description: "Invalid Credentials",
              });
            } else if (data?.status == constants.Fourhundred) {
              showNotification({
                type: "danger",
                message: "Sign in",
                description: data ? data?.message : "",
              });
            } else if (data?.status == 502) {
              showNotification({
                type: "danger",
                message: "Connection",
                description: "Can´t connect to Server",
              });
            } else if (resp?.status == 200) {
              showNotification({
                type: "success",
                message: "Sign in",
                description: "Sign in successfully",
              });
              setSession(
                JSON.stringify(resp.data),
                JSON.stringify(resp.data.access_token),
                JSON.stringify(resp.data.refresh_token)
              );
              // console.log('Userdata', resp.data);
              AsyncStorage.setItem("Userdata", JSON.stringify(resp.data));

              if (resp?.data?.idenfy_verification_status == "V") {
                console.log(
                  "user_first_login ------>>",
                  typeof resp?.data?.user_first_login
                );
                console.log(
                  "user_first_login ------>>",
                  resp?.data?.user_first_login
                );
                if (
                  resp?.data?.user_first_login !== null &&
                  resp?.data?.user_first_login === false
                ) {
                  dispatch(setIsLoggedIn(true));
                  getDeviceAttributes();
                  props.navigation.navigate("Home");
                } else {
                  dispatch(setIsLoggedIn(true));
                  props.navigation.navigate("Welcomescreen");
                }
              } else {
                dispatch(setIsLoggedIn(true));
                props.navigation.navigate("DFIdentityStatusScreen", {
                  email: resp?.data?.email,
                  firstScreen: true,
                });
              }
            }
          })
          .catch((err) => {
            setShowloder(false);
            showNotification({
              type: "danger",
              message: err.message ? err.message : "Something wrong at Sign in",
            });
          });
      }
    }
  };

  const rememberMeData = async () => {
    if (Valiadtion()) {
      let userInfo = {
        Email: Email,
        Password: Password,
        Rememberme: prevRemember != false ? prevRemember : !Rememberme,
      };
      await AsyncStorage.setItem("RememberMe", JSON.stringify(userInfo));
      setRememberme(!Rememberme);
    }
  };

  const getRememberMeData = async () => {
    const Data = await AsyncStorage.getItem("RememberMe");
    const Data2 = JSON.parse(Data);
    if (Data2 != null) {
      if (Data2.Rememberme) {
        setEmail(Data2.Email);
        setPassword(Data2.Password);
        setRememberme(Data2.Rememberme);
        setPrevRemember(Data2.Rememberme);
      }
    }
  };

  const validateRememberData = async () => {
    const Data = await AsyncStorage.getItem("RememberMe");
    const Data2 = JSON.parse(Data);
    if (Data2 != null) {
      if (Data2.Rememberme) {
        if (Data2.Email != Email) {
          rememberMeData();
        }
      }
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <ImageBackground
        source={Images.ic_splash2}
        resizeMode='cover'
        style={{ flex: 1, justifyContent: "center" }}>
        <Header navigation={props.navigation} title='Sign In' />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}>
          <Animated.View
            style={{
              justifyContent: "center",
              paddingHorizontal: wp("3"),
              minHeight: hp("75"),
              opacity: fadeAnimation,
            }}>
            <View
              style={{
                backgroundColor: appcolor.white,
                borderRadius: wp("2"),
                height: "80%",
                width: "100%",
                paddingHorizontal: wp("4"),
                justifyContent: "space-evenly",
              }}>
              <View style={{}}>
                <Image
                  source={Images.ic_onelogo}
                  style={{
                    resizeMode: resizeMode,
                    height: wp("20"),
                    width: "100%",
                  }}
                />
              </View>
              <View style={{}}>
                <CommonTextInput
                  placeholder='Email'
                  keyboardType='email-address'
                  onChangeText={(text) => setEmail(text)}
                  value={Email}
                  editable={true}
                />
                <CommonTextInput
                  placeholder='Password'
                  onChangeText={(text) => setPassword(text)}
                  value={Password}
                  editable={true}
                  autoCapitalize='none'
                  eye
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      rememberMeData();
                    }}
                    style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={
                        Rememberme ? Images.ic_checkbox21 : Images.ic_checkbox
                      }
                      style={{ height: wp("7"), width: wp("7") }}
                    />
                    <Text
                      style={{
                        fontFamily: fontFamily.verdanaRegular,
                        fontSize: 13,
                        marginLeft: wp("1.5"),
                        color: appcolor.darkgray,
                      }}>
                      Remember me
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: fontFamily.verdanaRegular,
                        fontSize: 13,
                        marginLeft: wp("1.5"),
                        color: appcolor.Forgotcolor,
                      }}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{}}>
                <CommonBtn title='Sign In' onPress={() => Submit()} />
              </View>
            </View>
          </Animated.View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              paddingBottom: 10,
            }}>
            <Text
              style={[
                {
                  fontSize: 14,
                  color: appcolor.white,
                  fontFamily: fontFamily.verdanaRegular,
                },
              ]}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
            // onPress={() => props.navigation.navigate("Signup")}
            >
              <Text
                style={[
                  {
                    fontSize: 14,
                    color: appcolor.btnTextColor,
                    fontFamily: fontFamily.verdanaSemiBold,
                  },
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
      {Showloder && <Loder />}
    </View>
  );
}
