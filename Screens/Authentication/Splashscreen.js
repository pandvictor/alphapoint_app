import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { appcolor, Images } from "../../Components/Constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Splashscreen(props) {
  useEffect(() => {
    globalVerficaton();
    setTimeout(() => {
      // props.navigation.navigate('Getstarted');
    }, 2000);
  }, []);

  const globalVerficaton = async () => {
    try {
      const value = await AsyncStorage.getItem("verification");
      if (value !== null) {
      } else {
        try {
          await AsyncStorage.setItem("verification", "0");
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {}
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle={"default"}
      />
      <ImageBackground
        source={Images.launch_screen}
        style={{
          flex: 1,

          // paddingHorizontal: wp('3'),
          paddingBottom: hp("8"),
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        imageStyle={{}}>
        <View>
          <ActivityIndicator size='large' color={appcolor.yellow} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({});
