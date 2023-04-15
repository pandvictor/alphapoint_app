
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {appcolor, fontFamily} from './Constant';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function CommonBtn(props) {
  const{title,buttonstyle,textcolor,onPress}=props
  return (
    <SafeAreaView style={{alignItems: 'center'}}>
    <TouchableOpacity
    onPress={onPress}
      style={[{
        backgroundColor: appcolor.darkgray,
        alignItems: 'center',
        justifyContent: 'center',
        height: 43,
        width:"100%",
        borderRadius: 4,
        elevation: 0.8,
        marginBottom: wp('3'),
        paddingHorizontal:wp('2')
      
      },buttonstyle]}>
      <Text
        style={[{
          fontSize: 14,
          color: appcolor.btnTextColor,
          fontFamily: fontFamily.verdanaSemiBold,
     
        },textcolor]}>
        {title}
      </Text>
    </TouchableOpacity>
  </SafeAreaView>
  )
}