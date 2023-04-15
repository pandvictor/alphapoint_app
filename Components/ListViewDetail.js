import { View, Text, Image, Animated, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { appcolor, fontFamily } from "./Constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/EvilIcons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

const ITEM_SIZE = 120 + 70;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const emptyListComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Icon name='close-o' size={40} color={"grey"} />
      <Text
        style={{
          fontFamily: fontFamily.verdanaSemiBold,
          color: "grey",
          fontSize: 20,
          marginTop: hp("2"),
          textAlign: "center",
        }}>
        No Spots Founds
      </Text>
    </View>
  );
};
export default ListViewDetail = ({ data, refresh, onRefresh, navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1 }}>
      {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: wp('2'),
              marginVertical: wp('5'),
            }}>
            <Text
              style={{
                fontSize: wp('4'),
                fontFamily: fontFamily.verdanaRegular,
              }}>
              Oonee Locations  {is_logged_in}
            </Text>
            <Image
              source={Images.ic_location}
              style={{
                height: wp('5'),
                width: wp('5'),
                resizeMode: resizeMode,
                marginHorizontal: wp('2'),
              }}
            />
          </View> */}
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          data={data}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          showsVerticalScrollIndicator={false}
          refreshing={refresh}
          onRefresh={onRefresh}
          ListEmptyComponent={emptyListComponent}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2.9),
            ];
            const opacityInputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 0.9),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });
            let coords = item?.location_point
              ?.replace("(", " ")
              .replace(")", " ")
              .split("  ")[1]
              .split(" ");
            let lat = Number(coords[0]);
            let long = Number(coords[1]);

            return (
              <AnimatedTouchable
                onPress={async () =>
                  navigation.navigate("Details", {
                    uuid: item.uuid,
                    distance: item.distance,
                    photo: item?.photo,
                  })
                }
                style={{
                  elevation: 3,
                  backgroundColor: appcolor.white,
                  borderRadius: wp("2"),
                  overflow: "hidden",
                  marginBottom: wp("3"),
                  marginHorizontal: wp("2"),
                  flexDirection: "row",
                  //alignItems: 'center',
                  flex: 1,
                  minHeight: 120,
                  padding: 20,
                  opacity,
                  transform: [{ scale }],
                }}>
                <View style={{ width: "40%" }}>
                  <Image
                    source={
                      item.photo
                        ? { uri: item.photo }
                        : require("../Images/ic_img1.png")
                    }
                    style={{
                      maxHeight: 120,
                      height: "100%",
                      width: "100%",
                      resizeMode: "cover",
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: wp("4"),
                    paddingVertical: wp("2"),
                    position: "relative",
                  }}>
                  <View
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      borderRadius: wp("50"),
                      height: wp("3"),
                      width: wp("3"),
                      backgroundColor:
                        item.status == "M"
                          ? appcolor.mentainaceDot
                          : item.status == "A"
                          ? appcolor.greendot
                          : item.status == "C"
                          ? "grey"
                          : appcolor.offlineDot,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode='tail'
                      style={{
                        fontFamily: fontFamily.Brandonblk,
                        lineHeight: 20,
                        fontSize: 16,
                        color: appcolor.darkgray,
                        width: "80%",
                      }}>
                      {item.name}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={{
                      fontFamily: fontFamily.verdanaRegular,
                      fontSize: 14,
                      color: appcolor.darkgray,
                    }}>
                    {item.address}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginBottom: 5,
                      alignItems: "center",
                    }}>
                    <Icon name='location' size={20} />
                    <Text
                      style={{
                        fontFamily: fontFamily.verdanaRegular,
                        fontSize: 14,
                        color: appcolor.darkgray,
                        marginLeft: 5,
                      }}>
                      {item.distance + " Miles"}
                    </Text>
                  </View>
                  {/* <Distancetag
                        latitudecurrent={latitudecurrent}
                        longitudecurrent={longitudecurrent}
                        dlat={lat}
                        dlang={long}
                      /> */}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor:
                        Number(item.max_parking_spots) -
                          Number(item.used_parking_spots) ==
                        0
                          ? appcolor.lightgray
                          : appcolor.greendot,
                      alignSelf: "flex-start",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}>
                    <IconFontAwesome
                      name='ticket'
                      size={20}
                      color={
                        Number(item.max_parking_spots) -
                          Number(item.used_parking_spots) ==
                        0
                          ? appcolor.lightgray
                          : appcolor.greendot
                      }
                    />
                    <Text
                      style={{
                        fontFamily: fontFamily.verdanaRegular,
                        fontSize: 14,
                        color:
                          Number(item.max_parking_spots) -
                            Number(item.used_parking_spots) ==
                          0
                            ? appcolor.lightgray
                            : appcolor.darkgray,
                        marginLeft: 5,
                      }}>
                      {Number(item.max_parking_spots) -
                        Number(item.used_parking_spots) +
                        " Spaces"}
                    </Text>
                  </View>
                </View>
              </AnimatedTouchable>
            );
          }}
        />
      </View>
    </View>
  );
};
