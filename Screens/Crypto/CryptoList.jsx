import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
  PermissionsAndroid,
  Dimensions,
  Platform,
  TextInput,
  StyleSheet,
  Linking,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Header from "../../Components/Header";
import {
  appcolor,
  fontFamily,
  Images,
  resizeMode,
  constants,
} from "../../Components/Constant";
// import Search from "../../Components/Search";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Loder from "../../Components/Loder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocationgetfun from "../../Components/LocationData/Geolocationgetfun";
import RNLocation from "react-native-location";
import Geolocation from "react-native-geolocation-service";
import * as authServices from "../../Apis/Services/UserAuth";
import showNotification from "../../Components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../../redux/CommonStateSlice";
import { checkSession, clearSession } from "../../Apis/Utils/Session";
import Icon from "react-native-vector-icons/EvilIcons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome5";
import ListViewDetail from "../../Components/ListViewDetail";
import ListMapDetail from "../../Components/ListMapDetail";

export default function CryptoList(props) {
  const childRef = useRef();
  const lastSearch = useRef("");
  const [Showloder, setShowloder] = useState(true);
  const [allList, setAllList] = useState(null);
  const [searchList, setSearchList] = useState([]);
  // const [searchInput, setSearchInput] = useState('');
  const [userDetailsApi, setUserDetailsApi] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [latitudecurrent, setlatitudecurrent] = useState(null);
  const [longitudecurrent, setlongitudecurrent] = useState(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [exitApp, setExitApp] = useState(0);
  const is_logged_in = useSelector((state) => state.CommonState.is_logged_in);
  const [serachText, setSerachText] = useState("");
  const dispatch = useDispatch();
  const [focusSearch, setFocusSearch] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      checkUserSession();
      BackHandler.addEventListener("hardwareBackPress", backAction);
    });

    const unsubscribe1 = props.navigation.addListener("blur", () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    });
    return unsubscribe, unsubscribe1;
  }, [props.navigation]);

  const backAction = () => {
    if (props.navigation.isFocused()) {
      BackHandler.exitApp();
    }
  };

  const checkUserSession = async () => {
    setRefresh(true);
    const check_session = await checkSession();

    if (!check_session) {
      setRefresh(false);
      showNotification({
        type: "info",
        message: "Logout",
        description: "Session expired please login again.",
      });
      await clearSession();
      dispatch(setIsLoggedIn(false));
    } else {
      await requestLocationPermission();
      await getData();
      setRefresh(false);
    }
  };

  const requestLocationPermission = async () => {
    try {
      permission = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel",
          },
        },
      });
      // console.log('permission', permission);
      if (!permission) {
        permission = await RNLocation.requestPermission({
          ios: "whenInUse",
          android: {
            detail: "coarse",
            rationale: {
              title: "We need to access your location",
              message: "We use your location to show where you are on the map",
              buttonPositive: "OK",
              buttonNegative: "Cancel",
            },
          },
        });
        getOneTimeLocation();
      } else {
        getOneTimeLocation();
      }
    } catch (error) {
      console.warn("this is ", error);
    }
  };

  const info = (message) => {
    showNotification({
      type: "info",
      message: "Home",
      description: message,
    });
  };

  const getData = async () => {
    const userData = await AsyncStorage.getItem("Userdata");
    let userInfo = JSON.parse(userData);
    getUserProfile(userInfo.uuid);
  };

  const getAllList = async (lat, long) => {
    const Location = await AsyncStorage.getItem("location");
    const latlng = JSON.parse(Location);

    let body = {
      user_lat: lat ? lat : latlng.coords.latitude,
      user_long: long ? long : latlng.coords.longitude,
    };

    await authServices
      .podsList(body)
      .then((resp) => {
        setShowloder(false);
        setRefresh(false);
        if (resp?.data?.status == constants.Fourhundred) {
          showNotification({
            type: "danger",
            message: "Home",
            description: resp?.data ? resp?.data?.message : "",
          });
        } else if (resp?.status == constants.TwoHundred) {
          setRefresh(false);
          setSearchList(resp.data);
          // setAllList(resp.data);
          if (resp.data.length > 0) {
            setAllList(
              lastSearch.current == ""
                ? resp.data
                : resp.data.filter((item) =>
                    item?.name
                      .toLowerCase()
                      .includes(lastSearch.current.toLowerCase())
                  )
            );
          }
          // setAllList([...resp.data, ...resp.data]);
          // setSearchList([...resp.data, ...resp.data]);
        }
      })
      .catch((err) => {
        setShowloder(false);
        setRefresh(false);
        showNotification({
          type: "danger",
          message: err.message ? err.message : "Something wrong at signup",
        });
      });
  };

  const getUserProfile = async (body) => {
    await authServices
      .getUserProfileRoute(body)
      .then((resp) => {
        setShowloder(false);
        try {
          const res = resp?.text();
          if (res.indexOf("502 Bad Gateway") !== -1) {
            showNotification({
              type: "danger",
              message: "Server Error",
              description: "Please try again later",
            });
          }
        } catch (e) {
          console.log(e);
        }
        if (resp?.data?.status == constants.Fourhundred) {
          showNotification({
            type: "danger",
            message: "Get Profile",
            description: resp?.data ? resp?.data?.message : "",
          });
        } else if (resp?.status == constants.TwoHundred) {
          setUserDetailsApi(resp.data);
        }
      })
      .catch((err) => {
        showNotification({
          type: "danger",
          message: err.message ? err.message : "Something wrong at signup",
        });
      });
  };

  const locationdata = async () => {
    if (Platform.OS === "ios") {
      getOneTimeLocation();
    } else {
      const res = await Geolocationgetfun();

      res && AsyncStorage.setItem("location", JSON.stringify(res));
      setlatitudecurrent(res.coords.latitude);
      setlongitudecurrent(res.coords.longitude);
      getAllList(res.coords.latitude, res.coords.longitude);
    }
  };

  const getOneTimeLocationWithFalse = () => {
    setLocationStatus("Getting Location ...");
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus("You are Here");
        AsyncStorage.setItem("location", JSON.stringify(position));
        getAllList(position.coords.latitude, position.coords.longitude);

        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        setlatitudecurrent(currentLongitude);
        setlongitudecurrent(currentLatitude);
      },
      (error) => {
        console.log("thiis is ", error);
        setLocationStatus(error.message);
        setRefresh(false);
        info("One error ocurred fetching your location");
      },
      { enableHighAccuracy: false, timeout: 2000 }
    );
  };

  const getOneTimeLocation = () => {
    console.log("location called");
    setLocationStatus("Getting Location ...");
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus("You are Here");
        AsyncStorage.setItem("location", JSON.stringify(position));
        getAllList(position.coords.latitude, position.coords.longitude);

        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        setlatitudecurrent(currentLongitude);
        setlongitudecurrent(currentLatitude);
      },
      (error) => {
        console.log("this is it", error);
        setLocationStatus(error.message);
        setRefresh(false);
        info("One error ocurred fetching your location");
        getOneTimeLocationWithFalse();
      },
      { enableHighAccuracy: false, timeout: 2000 }
    );
  };

  const handleSearch = (text) => {
    setSerachText(text);
    lastSearch.current = text;
    let data = searchList;
    if (data.length > 0) {
      setAllList(
        text == ""
          ? searchList
          : data.filter((item) =>
              item?.name.toLowerCase().includes(text.toLowerCase())
            )
      );
    }
  };

  const _handleRefresh = async () => {
    setRefresh(true);
    await checkUserSession();
  };
  const [showMap, setShowMap] = useState(false);

  const changeView = async () => {
    if (longitudecurrent == null && latitudecurrent == null) {
      await requestLocationPermission();
    }
    if (longitudecurrent != null && latitudecurrent != null) {
      setShowMap(!showMap);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: appcolor.darkgray }}>
        <Header
          headertype='home'
          navigation={props.navigation}
          title='Home'
          //onPress={() => childRef.current.openControlPanel()} TODO: REMOVE openControlPanel Screen
          profileImg={
            userDetailsApi?.profile_image != null
              ? { uri: userDetailsApi?.profile_image }
              : userDetailsApi?.first_name?.charAt(0).toUpperCase()
          }
          type={
            userDetailsApi?.profile_image == null ? "TextType" : "ImageType"
          }
        />
      </View>
      <View style={{ flex: 1, position: "relative" }}>
        {showMap == false && (
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 21,
                paddingHorizontal: 10,
                position: "relative",
                flex: 1,
              }}>
              <TextInput
                placeholder='Search Location'
                placeholderTextColor={appcolor.darkgray}
                style={[
                  styles.textInputContainer,
                  focusSearch
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "transparent" },
                ]}
                cursorColor='black'
                value={serachText}
                onFocus={() => setFocusSearch(true)}
                onBlur={() => setFocusSearch(false)}
                onChangeText={(text) => handleSearch(text)}
              />
              <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  right: 10,
                  paddingHorizontal: 10,
                }}>
                {serachText.length > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      handleSearch("");
                      setFocusSearch(false);
                      setAllList(searchList);
                    }}>
                    <Icon name='close' color={"black"} size={20} />
                  </TouchableOpacity>
                ) : (
                  <Icon name='search' color={"black"} size={20} />
                )}
              </View>
            </View>
          </View>
        )}

        {showMap && (
          <ListMapDetail
            data={allList}
            lat={longitudecurrent}
            lng={latitudecurrent}
            navigation={props.navigation}
          />
        )}
        {showMap == false && (
          <ListViewDetail
            data={allList}
            refresh={refresh}
            onRefresh={_handleRefresh}
            navigation={props.navigation}
          />
        )}

        <TouchableOpacity
          style={[
            styles.containerButtonMap,
            {
              backgroundColor: appcolor.white,
            },
          ]}
          onPress={changeView}>
          <IconFontAwesome
            name={showMap ? "list" : "map-marked-alt"}
            size={20}
            color={appcolor.lightgray}
          />
        </TouchableOpacity>
      </View>
      {Showloder && <Loder />}
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: "white",
    height: 43,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 4,
    width: "100%",
    paddingHorizontal: 10,
  },
  containerButtonMap: {
    position: "absolute",
    right: 20,
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  containerButtonBackList: {
    position: "absolute",
    left: 20,
    top: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
