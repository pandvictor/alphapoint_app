import {
  View,
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
import { appcolor, constants } from "../../Components/Constant";
// import Search from "../../Components/Search";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Loder from "../../Components/Loder";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authServices from "../../Apis/Services/UserAuth";
import { get50Crypto } from "../../Apis/Services/CoinsApi/CoinsApi";
import showNotification from "../../Components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../../redux/CommonStateSlice";
import { checkSession, clearSession } from "../../Apis/Utils/Session";
import Icon from "react-native-vector-icons/EvilIcons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome5";
import ListViewDetail from "../../Components/ListViewDetail";

export default function CryptoList(props) {
  const childRef = useRef();
  const lastSearch = useRef("");
  const [Showloder, setShowloder] = useState(true);
  const [allList, setAllList] = useState(null);
  const [searchList, setSearchList] = useState([]);
  // const [searchInput, setSearchInput] = useState('');
  const [userDetailsApi, setUserDetailsApi] = useState(null);
  const [refresh, setRefresh] = useState(false);
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

  useEffect(() => {
    getAllList();
  }, []);
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
      setRefresh(false);
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

  const getAllList = async () => {
    await get50Crypto()
      .then((resp) => {
        setShowloder(false);
        setRefresh(false);
        if (resp?.data?.status == constants.Fourhundred) {
          showNotification({
            type: "danger",
            message: "Home",
            description: resp?.data ? resp?.data?.message : "",
          });
        } else if (resp?.data) {
          setRefresh(false);
          setSearchList(resp.data);

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

  const handleSearch = (text) => {
    // setSerachText(text);
    // lastSearch.current = text;
    // let data = searchList;
    // if (data.length > 0) {
    //   setAllList(
    //     text == ""
    //       ? searchList
    //       : data.filter((item) =>
    //           item?.name.toLowerCase().includes(text.toLowerCase())
    //         )
    //   );
    // }
  };

  const _handleRefresh = async () => {
    setRefresh(true);
    await checkUserSession();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: appcolor.darkgray }}>
        <Header
          headertype='home'
          navigation={props.navigation}
          title='Crypto List'
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
                    //setAllList(searchList);
                  }}>
                  <Icon name='close' color={"black"} size={20} />
                </TouchableOpacity>
              ) : (
                <Icon name='search' color={"black"} size={20} />
              )}
            </View>
          </View>
        </View>

        <ListViewDetail
          data={allList}
          refresh={refresh}
          onRefresh={_handleRefresh}
          navigation={props.navigation}
        />

        <TouchableOpacity
          style={[
            styles.containerButtonMap,
            {
              backgroundColor: appcolor.white,
            },
          ]}
          onPress={() => {}}>
          <IconFontAwesome name={"list"} size={20} color={appcolor.lightgray} />
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
