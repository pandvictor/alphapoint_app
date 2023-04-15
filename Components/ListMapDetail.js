import React, {useCallback, useMemo, useState, useRef} from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {appcolor, fontFamily, Images, resizeMode} from './Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomSheet from '@gorhom/bottom-sheet';
import CommonBtn from './CommonBtn';

const ListMapDetail = ({data, lat, lng, navigation}) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const bottomSheetRef = useRef(null);
  const positionUserLatitude = Number(lat);
  const positionUserLongitude = Number(lng);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    // console.log('handleSheetChanges', index);
  }, []);

  const listMarkers = data.map(currentItem => {
    let coords = currentItem?.location_point
      ?.replace('(', ' ')
      .replace(')', ' ')
      .split('  ')[1]
      .split(' ');
    let lat = parseFloat(coords[1]);
    let long = parseFloat(coords[0]);
    return {
      ...currentItem,
      lat,
      long,
    };
  });
  // console.log('listMarkers', listMarkers);
  // console.log('lat 0 -> ', listMarkers[0].lat);
  // console.log('long 0 -> ', listMarkers[0].long);
  // console.log('lat', lat);
  // console.log('long', lng);

  const currentRegion = {
    latitude:
      selectedMarker != null ? selectedMarker.lat : positionUserLatitude,
    longitude:
      selectedMarker != null ? selectedMarker.long : positionUserLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const openDetail = marker => {
    setSelectedMarker(marker);
    bottomSheetRef.current.expand();
  };

  const goDetail = () => {
    navigation.navigate('Details', {
      uuid: selectedMarker.uuid,
      distance: selectedMarker.distance,
      photo: selectedMarker?.photo,
    });
  };
  return (
    <View style={{flex: 1}}>
      <MapView region={currentRegion} style={{flex: 1}}>
        {listMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{latitude: marker.lat, longitude: marker.long}}
            title={marker.name}
            onPress={() => openDetail(marker)}>
            <Image
              source={Images.ic_onelogo}
              style={{
                height: wp('15'),
                width: wp('15'),
                resizeMode: resizeMode,
              }}
            />
          </Marker>
        ))}
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enableOverDrag
        enablePanDownToClose>
        {selectedMarker != null && (
          <View style={styles.contentContainer}>
            <View style={styles.detailContainer}>
              <View style={{width: '40%'}}>
                <Image
                  source={
                    selectedMarker.photo
                      ? {uri: selectedMarker.photo}
                      : require('../Images/ic_img1.png')
                  }
                  style={{
                    maxHeight: 120,
                    height: '100%',
                    width: '100%',
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: wp('4'),
                  paddingVertical: wp('2'),
                  position: 'relative',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    borderRadius: wp('50'),
                    height: wp('3'),
                    width: wp('3'),
                    backgroundColor:
                      selectedMarker.status == 'M'
                        ? appcolor.mentainaceDot
                        : selectedMarker.status == 'A'
                        ? appcolor.greendot
                        : selectedMarker.status == 'C'
                        ? 'grey'
                        : appcolor.offlineDot,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      fontFamily: fontFamily.Brandonblk,
                      lineHeight: 20,
                      fontSize: 16,
                      color: appcolor.darkgray,
                      width: '80%',
                    }}>
                    {selectedMarker.name}
                  </Text>
                </View>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    fontFamily: fontFamily.verdanaRegular,
                    fontSize: 14,
                    color: appcolor.darkgray,
                  }}>
                  {selectedMarker.address}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 5,
                    alignItems: 'center',
                  }}>
                  <Icon name="location" size={20} />
                  <Text
                    style={{
                      fontFamily: fontFamily.verdanaRegular,
                      fontSize: 14,
                      color: appcolor.darkgray,
                      marginLeft: 5,
                    }}>
                    {selectedMarker.distance + ' Miles'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor:
                      Number(selectedMarker.max_parking_spots) -
                        Number(selectedMarker.used_parking_spots) ==
                      0
                        ? appcolor.lightgray
                        : appcolor.greendot,
                    alignSelf: 'flex-start',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}>
                  <IconFontAwesome
                    name="ticket"
                    size={20}
                    color={
                      Number(selectedMarker.max_parking_spots) -
                        Number(selectedMarker.used_parking_spots) ==
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
                        Number(selectedMarker.max_parking_spots) -
                          Number(selectedMarker.used_parking_spots) ==
                        0
                          ? appcolor.lightgray
                          : appcolor.darkgray,
                      marginLeft: 5,
                    }}>
                    {Number(selectedMarker.max_parking_spots) -
                      Number(selectedMarker.used_parking_spots) +
                      ' Spaces'}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 2,
                paddingHorizontal: 20,
                justifyContent: 'center',
              }}>
              <CommonBtn title="Go Detail" onPress={goDetail} />
            </View>
          </View>
        )}
        {selectedMarker == null && <Text>No data found</Text>}
      </BottomSheet>
    </View>
  );
};
export default ListMapDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
  },
  detailContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginHorizontal: wp('2'),
    //alignItems: 'center',
    flex: 1,
    minHeight: 120,
    padding: 20,
  },
});
