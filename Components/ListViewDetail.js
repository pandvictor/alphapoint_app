import { View, Text, Image, Animated, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { appcolor, fontFamily } from "./Constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/EvilIcons";


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
        No Crypto Coins Founds
      </Text>
    </View>
  );
};
export default ListViewDetail = ({ data, refresh, onRefresh, navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1 }}>
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
                      item?.photo
                        ? { uri: item.photo }
                        : require("../Images/crypto_symbol.png")
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
                      backgroundColor: appcolor.offlineDot,
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
                    {item.symbol}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginBottom: 5,
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        fontFamily: fontFamily.verdanaRegular,
                        fontSize: 14,
                        color: appcolor.darkgray,
                        marginLeft: 5,
                      }}>
                      {"$" + item.price_usd}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: appcolor.greendot,
                      alignSelf: "flex-start",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: fontFamily.verdanaRegular,
                        fontSize: 14,
                        color: appcolor.darkgray,
                        marginLeft: 5,
                      }}>
                      {item.volume24 + " volume24"}
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
