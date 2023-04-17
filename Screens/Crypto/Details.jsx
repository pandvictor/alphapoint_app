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
import { LineChart, Grid } from "react-native-svg-charts";

const screen = Dimensions.get("window");

export default function Details(props) {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  const [Showloder, setShowloder] = useState(true);
  const [item, setItem] = useState(null);

  const [successmodal, setsuccessmodal] = useState(false);
  const [errorModal, serErrModal] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      checkUserSession();
    });
    setItem(props.route.params);
    setShowloder(false);
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
          title={item?.name ? item.name : ""}
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
                : Images.ic_crypto
            }
            style={{ height: "100%", width: "100%", resizeMode: "stretch" }}
          />
        </View>
        <View style={{}}>
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
                <Text style={styles.propertyStyle}>Cryto</Text>
                <Text style={styles.valueStyle}>{props.route.params.name}</Text>
              </View>
              <View style={styles.scrollbutton}>
                <Text style={styles.propertyStyle}>TotalCap</Text>
                <Text style={styles.valueStyle}>0</Text>
              </View>
              <View style={styles.scrollbutton}>
                <Text style={styles.propertyStyle}>Symbol</Text>
                <Text style={styles.valueStyle}></Text>
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
              {item != null ? item.name : ""}
            </Text>
            <LineChart
              style={{ height: 200 }}
              data={data}
              svg={{ stroke: "rgb(134, 65, 244)" }}
              contentInset={{ top: 20, bottom: 20 }}>
              <Grid />
            </LineChart>
          </View>
        </View>
        <View style={{ flex: 1 }} />
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
