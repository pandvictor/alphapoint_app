import {View, Text, TextInput, Image, Platform} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appcolor, fontFamily, Images, resizeMode} from './Constant';
export default function Search(props) {
  const {onChangeText,value} = props
  return (
    <View
      style={{
        borderRadius: wp('1'),
        borderWidth: wp(0.3),
        borderColor: appcolor.lightgray,
        width: '100%',
        flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:wp('5')
      }}>
      <TextInput
        placeholder="What are you looking for?"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={appcolor.lightgray}
        style={{
          fontSize: 18, 
          fontFamily: fontFamily.verdanaRegular,flex:1, 
          height:Platform.OS == 'ios' ? wp('10'): wp('0')
        }}
      />
      <Image
        source={Images.ic_search3}
        style={{height: wp('6'), width: wp('5'), resizeMode: resizeMode}}
      />
    </View>
  );
}
        