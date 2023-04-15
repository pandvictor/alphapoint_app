import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Platform } from "react-native";

export const appcolor = {
  darkgray: "#444344",
  black: "black",
  lightgray: "#b9b8b9",
  lightgray1: "#7e7e7e",
  white: "#ffffff",
  yellow: "#fffc79",
  yellowdot: "#ce8500",
  lightyellow: "#ffeccc",
  green: "#2dce89",
  greendot: "#007f00",
  Lightgreen: "#cdffcd",
  silver: "#8898aa",
  btnTextColor: "#FFFC79",
  textinputcolor: "#f4f4f4",
  Forgotcolor: "#797979",
  Identifybackcolor: "#e5e5e5",
  mentainaceDot: "#ce8500",
  offlineDot: "#ed3f3f",
};
export const constants = {
  Twohundredone: 201,
  Fourhundred: 400,
  Twohundredtwo: 202,
  TwoHundred: 200,
};

export const fontFamily = {
  verdanaRegular: "Verdana",
  verdanaBold: "Verdana-Bold",
  verdanaBoldItalic: "Verdana-BoldItalic",
  verdanaItalic: "Verdana-Italic",
  // Verdana-ItalicverdanaSemiBold: 'verdana',
  BrandonBold: "BrandonGrotesque-Bold",
  Brandonmed: "BrandonGrotesque-Medium",
  Brandonreg: "BrandonGrotesque-Regular",
  Brandonblk: "BrandonGrotesque-Black",
};

// imagestyle for plateforms
export const resizeMode = Platform.OS == "ios" ? "contain" : "center";

// duration of popup
export const duration = {
  Four: 3000,
};

export const Images = {
  ic_splash: require("../Images/screenLanding.jpeg"),
  ic_hand: require("../Images/ic_hand.png"),
  ic_splash2: require("../Images/ic_splash2.png"),
  Backarrow: require("../Images/Backarrow.png"),
  ic_onelogo: require("../Images/alphapoint-logo.png"),
  ic_checkbox21: require("../Images/ic_checkbox21.png"),
  ic_right: require("../Images/ic_right.png"),
  ic_cross: require("../Images/ic_cross.png"),
  launch_screen: require("../Images/launch_screen.png"),
  ic_checkbox: require("../Images/ic_checkbox.png"),
  eye: require("../Images/eye.png"),
  hidden: require("../Images/hidden.png"),
  ic_yellow: require("../Images/ic_yellow.png"),
  ic_home1: require("../Images/ic_home1.png"),
  ic_user: require("../Images/ic_user.png"),
  ic_logout1: require("../Images/ic_logout1.png"),
  ic_search3: require("../Images/ic_search3.png"),
  ic_navbar: require("../Images/ic_navbar.png"),
  ic_bell: require("../Images/ic_bell.png"),
  ic_profile: require("../Images/ic_profile.png"),
  ic_location: require("../Images/ic_location.png"),
  ic_img5: require("../Images/ic_img5.png"),
  ic_edit: require("../Images/ic_edit.png"),
  ic_parking: require("../Images/ic_parking.png"),
  Profilebackground: require("../Images/Profilebackground.png"),
  Rightarrow: require("../Images/Rightarrow.png"),
  ic_translate: require("../Images/ic_translate.png"),
  icon: require("../Images/icon.png"),
  Verification: require("../Images/Verification.png"),
  Livechat: require("../Images/Livechat.png"),
  ic_logo_1: require("../Images/ic_logo_1.png"),
  //   cameraclick: require('../Images/ic_camera_click.png'),
};
