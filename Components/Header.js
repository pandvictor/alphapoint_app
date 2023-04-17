import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { appcolor, fontFamily, Images, resizeMode } from "./Constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../redux/CommonStateSlice";
import { clearSession } from "../Apis/Utils/Session";
export default function Header(props) {
  const {
    onPressback,
    navigation,
    title,
    color = appcolor.white,
    barStyle = "default",
    headertype = "Normal",
    marginLeft = 0,
    rightimage = true,
    onPress,
    textstyle,
    profileImg,
    type,
    firstScreen,
    redirectionalModel,
    paddingTop,
    loader,
    marginRight = 0,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(loader, "loader status");
  }, [loader]);

  return (
    <View style={[{ paddingTop: 40 }, paddingTop]}>
      {headertype === "Normal" ? (
        <View
          style={{
            paddingBottom: Platform.OS == "android" ? wp("3") : wp("2"),
            flexDirection: "row",
            marginTop: Platform.OS == "android" ? hp("1") : hp("2"),
          }}>
          <StatusBar
            translucent={true}
            backgroundColor={"transparent"}
            barStyle={barStyle}
          />

          <Text
            style={{
              fontSize: 25,
              fontFamily: fontFamily.Brandonblk,
              color: color,
              textAlign: "center",
              marginLeft: !textstyle ? "40%" : marginLeft,
              marginRight: marginRight,
              flex: textstyle ? 1 : null,
            }}>
            {title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              // console.log(loader, 'i called');
              if (!loader) {
                // console.log('i can called asad');
                if (firstScreen) {
                  clearSession();
                  dispatch(setIsLoggedIn(false));
                } else {
                  if (redirectionalModel) {
                    clearSession();
                    dispatch(setIsLoggedIn(false));
                  }
                  navigation.goBack();
                }
              }
            }}
            style={{
              alignSelf: "flex-start",
              paddingHorizontal: wp("3"),
              height: "100%",
              paddingRight: wp("6"),
              paddingTop: wp("1.5"),
              position: "absolute",
              width: "15%",
              // justifyContent: 'center',
            }}>
            <Image
              source={Images.Backarrow}
              style={{
                height: wp("5"),
                width: wp("5"),
                resizeMode: resizeMode,
                tintColor: color,
              }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            marginTop: hp("2"),
            justifyContent: "space-between",
            paddingBottom: wp("5"),
            alignItems: "center",
          }}>
          <StatusBar
            translucent={true}
            backgroundColor={"transparent"}
            barStyle={barStyle}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: rightimage ? 0 : wp("2"),
              justifyContent: "center",
            }}>
            <TouchableOpacity
              onPress={onPress}
              style={{
                paddingHorizontal: wp("3"),
              }}>
              <Image
                //                source={Images.ic_navbar}
                source={require("../Images/alphapoint-logo.png")}
                style={{
                  height: wp("15"),
                  width: wp("15"),
                  resizeMode: resizeMode,
                  tintColor: appcolor.yellow,
                  marginLeft: wp(2),
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 25,
              fontFamily: fontFamily.Brandonblk,
              color: appcolor.white,
              textAlign: "center",
            }}>
            {title}
          </Text>
          {rightimage && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={onPress} style={{}}>
                <Image
                  source={Images.ic_bell}
                  style={{
                    height: wp("10"),
                    width: wp("10"),
                    resizeMode: resizeMode,
                    // tintColor: color,
                  }}
                />
              </TouchableOpacity>

              {type == "ImageType" ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Profile")}
                  style={{
                    //paddingRight: wp('2'),
                    //paddingTop: wp('1.5'),
                    height: wp("10"),
                    width: wp("10"),
                    backgroundColor: appcolor.Identifybackcolor,
                    borderRadius: wp("50"),
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: wp("5"),
                  }}>
                  <Image
                    source={profileImg}
                    style={{
                      height: wp("10"),
                      width: wp("10"),
                      //resizeMode: resizeMode,
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Profile")}
                  style={{
                    height: wp("10"),
                    width: wp("10"),
                    backgroundColor: appcolor.Identifybackcolor,
                    borderRadius: wp("50"),
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: wp("5"),
                    marginTop: wp("1.5"),
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.Brandonblk,
                      fontSize: wp("5"),
                      color: appcolor.black,
                    }}>
                    {profileImg}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
