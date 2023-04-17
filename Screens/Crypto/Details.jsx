import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import {
  appcolor,
  fontFamily,
  Images,
  resizeMode,
  constants,
} from "../../Components/Constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CommonBtn from "../../Components/CommonBtn";
import Successmodal from "../../Components/Successmodal";
import Errormodal from "../../Components/Errormodal";

import Loder from "../../Components/Loder";
import * as authServices from "../../Apis/Services/UserAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showNotification from "../../Components/Popup";
import { setIsLoggedIn } from "../../redux/CommonStateSlice";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Details(props) {
  const [Showloder, setShowloder] = useState(true);
  const [podDetails, setPodDetails] = useState(null);
  const [openDoorMessage, setOpenDoorMessage] = useState(
    "Sorry Door cannot be open!"
  );

  const [successmodal, setsuccessmodal] = useState(false);
  const [errorModal, serErrModal] = useState(false);



  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      checkUserSession();
    });
    return unsubscribe;
  }, [props]);

  const checkUserSession = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token == null) {
      showNotification({
        type: "info",
        message: "Logout",
        description: "Session expired please login again.",
      });
      props.navigation.navigate("Landing");
    } else {
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ backgroundColor: appcolor.darkgray, paddingBottom: wp("7") }}>
        <Header
          textstyle
          color={appcolor.white}
          navigation={props.navigation}
          title={podDetails != null ? podDetails.name : ""}
        />
      </View>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{ flex: 1 }}
        contentInsetAdjustmentBehavior='automatic'>
        <View style={{ width: "100%", height: hp("25") }}>
          <Image
            source={
              props.route.params.photo != null
                ? { uri: props.route.params.photo }
                : Images.ic_img5
            }
            style={{ height: "100%", width: "100%", resizeMode: "stretch" }}
          />
        </View>
        <View style={{}}>
          <View style={{ flexDirection: "row" }}>
            {podDetails != null && podDetails.status == "A" && (
              <View
                style={{
                  backgroundColor: appcolor.Lightgreen,
                  flexDirection: "row",
                  alignItems: "center",
                  height: 33,
                  width: "100%",
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: appcolor.greendot,
                    fontFamily: fontFamily.verdanaRegular,
                  }}>
                  Available
                </Text>
              </View>
            )}

            {podDetails != null && podDetails.status == "O" && (
              <View
                style={{
                  backgroundColor: appcolor.lightyellow,
                  flexDirection: "row",
                  alignItems: "center",
                  height: 33,
                  width: "100%",
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: appcolor.offlineDot,
                    fontFamily: fontFamily.verdanaRegular,
                    marginLeft: wp("2"),
                  }}>
                  Offline
                </Text>
              </View>
            )}
            {podDetails != null && podDetails.status == "M" && (
              <View
                style={{
                  backgroundColor: appcolor.mentainaceDot,
                  flexDirection: "row",
                  alignItems: "center",
                  height: 33,
                  width: "100%",
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: appcolor.white,
                    fontFamily: fontFamily.verdanaRegular,
                    marginLeft: wp("1"),
                  }}>
                  Maintenance
                </Text>
              </View>
            )}

            {podDetails != null && podDetails.status == "C" && (
              <View
                style={{
                  backgroundColor: "grey",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 33,
                  width: "100%",
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: appcolor.white,
                    fontFamily: fontFamily.verdanaRegular,
                    marginLeft: wp("1"),
                  }}>
                  Coming Soon
                </Text>
              </View>
            )}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: wp("3"),
                width: "100%",
              }}>
              <View style={styles.scrollbutton}>
                <Text style={styles.propertyStyle}>Distance</Text>
                <Text style={styles.valueStyle}>
                  {props.route.params.distance + " mi"}
                </Text>
              </View>
              <View style={styles.scrollbutton}>
                <Text style={styles.propertyStyle}>Spaces</Text>
                <Text style={styles.valueStyle}>
                  {podDetails != null
                    ? podDetails.max_parking_spots -
                      podDetails.used_parking_spots
                    : ""}
                </Text>
              </View>
              <View style={styles.scrollbutton}>
                <Text style={styles.propertyStyle}>Open</Text>
                <Text style={styles.valueStyle}>24/7</Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 15,
            }}>
            <Text
              style={{
                fontSize: wp("4"),
                fontFamily: fontFamily.verdanaRegular,
                flex: 1,
                paddingHorizontal: 16,
              }}>
              {podDetails != null ? podDetails.address : ""}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }} />

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 20,
          }}>
          <View style={{ width: "90%", alignSelf: "center" }}>
            {podDetails != null && (
              <CommonBtn title='How to get there' onPress={() => {}} />
            )}
          </View>
          <View style={{ width: "90%", alignSelf: "center" }}>
            {podDetails != null && podDetails.status == "A" && (
              <CommonBtn title='Open Door' onPress={() => {}} />
            )}
          </View>
        </View>
      </ScrollView>

      {Showloder && <Loder />}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollbutton: {
    borderColor: appcolor.lightgray,
    justifyContent: "center",
    paddingVertical: wp("1"),
    marginLeft: 16,
    minWidth: wp("25"),
    // width: '25%',
  },
  valueStyle: {
    fontFamily: fontFamily.verdanaRegular,
    fontSize: 14,
    color: appcolor.black,
    fontWeight: "700",
    paddingTop: 4,
  },
  propertyStyle: {
    fontFamily: fontFamily.verdanaRegular,
    fontSize: 14,
    color: appcolor.darkgray,
    fontWeight: "400",
  },
});
