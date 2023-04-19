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

import Loder from "../../Components/Loder";

import AsyncStorage from "@react-native-async-storage/async-storage";
import showNotification from "../../Components/Popup";
import { LineChart, Grid, XAxis } from "react-native-svg-charts";

import { getCryptoInfo } from "../../Apis/Services/CoinsApi/CoinsApi";
import { times } from "lodash";
const screen = Dimensions.get("window");

const TIME_COUNTER = 30; // timer to do the refresh
const TIMES = 5; //COUNT HOW MANY TIMES IT HAVE TO DO IT
export default function Details(props) {
  const [dataList, setDataList] = useState([]);
  const [Showloder, setShowloder] = useState(true);
  const [item, setItem] = useState(null);
  const [counter, setCounter] = useState(0);
  const [price, setPrice] = useState(0);
  const [counterTime, setCounterTime] = useState(0);
  async function getCoinInfo(id) {
    await getCryptoInfo(id)
      .then((resp) => {
        const [info] = resp;

        let tempData = [...dataList];

        tempData.push({ price: Number(info.price_usd), date: new Date() });
        //console.log("items", tempData.length, tempData);
        setPrice(Number(info.price_usd));
        setDataList(tempData);
        setCounter(counter + 1);
      })
      .catch((err) => {
        showNotification({
          type: "danger",
          message: err.message ? err.message : "Connection Lost!",
        });
      });
  }
  useEffect(() => {
    if (counterTime === 0 && item?.id && !Showloder) {
      setShowloder(true);
      getCoinInfo(item.id).finally(() => setShowloder(false));
      setCounterTime(TIME_COUNTER);
    }
  }, [counterTime, item?.id, Showloder]);
  //TIME COUNTER
  useEffect(() => {
    const timer =
      counterTime > 0 &&
      counter <= TIMES &&
      setInterval(() => setCounterTime(counterTime - 1), 1000);

    return () => clearInterval(timer);
  }, [counterTime, counter]);

  useEffect(() => {
    if (checkUserSession()) {
      //if (item?.id) getCoinInfo(item.id);
      setShowloder(false);
    }
  }, [item]);
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
    }
  };

  return (
    <>
      {item && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: appcolor.darkgray,
              paddingBottom: wp("7"),
            }}>
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
            {/* <View style={{ width: "100%", height: hp("25") }}>
              <Image
                source={
                  props.route.params.photo != null
                    ? { uri: props.route.params.photo }
                    : Images.ic_crypto
                }
                style={{ height: "100%", width: "100%", resizeMode: "stretch" }}
              />
            </View> */}
            <View style={{}}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: wp("3"),
                    width: "100%",
                    marginBottom: "5",
                  }}>
                  <View style={styles.scrollbutton}>
                    <Text style={styles.propertyStyle}>Cryto</Text>
                    <Text style={styles.valueStyle}>{item.name}</Text>
                  </View>
                  <View style={styles.scrollbutton}>
                    <Text style={styles.propertyStyle}>TotalCap</Text>
                    <Text style={styles.valueStyle}>{item.market_cap_usd}</Text>
                  </View>
                  <View style={styles.scrollbutton}>
                    <Text style={styles.propertyStyle}>Symbol</Text>
                    <Text style={styles.valueStyle}>{item.symbol}</Text>
                  </View>
                </View>
              </ScrollView>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: wp("3"),
                  width: "100%",
                  marginBottom: "5",
                }}>
                <View style={styles.scrollbutton}>
                  <Text style={styles.propertyStyle}>Price</Text>
                  <Text style={styles.valueStyle}>{price}</Text>
                </View>
                <View style={styles.scrollbutton}>
                  <Text style={styles.propertyStyle}>Time to refresh</Text>
                  <Text style={styles.valueStyle}>{counterTime}</Text>
                </View>
              </View>
              {dataList && (
                <View
                  style={{
                    width: "200",
                    height: "200",
                    marginTop: 15,
                  }}>
                  <LineChart
                    style={{ height: 300 }}
                    data={dataList.map((e) => e.price)}
                    animate={true}
                    animationDuration={300}
                    svg={{ stroke: "rgb(134, 65, 244)" }}
                    contentInset={{ top: 20, bottom: 20 }}>
                    <Grid />
                  </LineChart>
                  <View style={styles.separeLine} />
                  <XAxis
                    // style={{ height: xAxisHeight, paddingTop: 10 }}
                    data={dataList.map((e) => e.date)}
                    // formatLabel={(value, index) => dataList[index].date}
                    contentInset={{ left: 10, right: 10 }}
                    // svg={axesSvg}
                  />
                </View>
              )}
            </View>
          </ScrollView>

          {Showloder && <Loder />}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollbutton: {
    borderColor: appcolor.lightgray,
    justifyContent: "center",
    paddingVertical: wp("1"),
    marginLeft: 16,
    minWidth: wp("25"),
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
