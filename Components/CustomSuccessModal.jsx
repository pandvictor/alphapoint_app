import {View, Text, Modal, Image} from 'react-native';
import React from 'react';
import {appcolor, fontFamily, Images} from './Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CommonBtn from './CommonBtn';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default CustomSuccessModal = props => {
  const {visible = false, onPress, buttontext = 'ok', title, iconName} = props;
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.2)',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: appcolor.white,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: wp('4'),
            marginHorizontal: wp('4'),
            borderRadius: 4,
          }}>
          {iconName ? (
            <Icons name={iconName} size={100}></Icons>
          ) : (
            <Image
              source={Images.ic_right}
              style={{
                height: wp('20'),
                width: wp('20'),
                marginBottom: wp('2'),
              }}
            />
          )}
          <Text
            style={{
              fontSize: 22,
              fontFamily: fontFamily.verdanaSemiBold,
              color: appcolor.darkgray,
              paddingHorizontal: wp('16'),
            }}>
            {title}
          </Text>
          <View
            style={{
              width: '90%',
              shadowColor: 'black',
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.5,
              elevation: 3,
              paddingTop: 30,
            }}>
            <CommonBtn title={buttontext} onPress={onPress} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
