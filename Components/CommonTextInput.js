import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {appcolor, fontFamily, Images} from './Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CommonTextInput = props => {
  const {
    placeholder,
    onChangeText,
    keyboardType = 'default',
    value,
    eye,
    marginBottom = wp('4'),
    editable,
  } = props;
  const [Secure, setSecure] = useState(true);
  return (
    <View
      style={{
        height: 46,
        width: '100%',
        borderRadius: 4,
        backgroundColor: appcolor.textinputcolor,
        elevation: 0.6,
        alignSelf: 'center',
        marginBottom: marginBottom,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={appcolor.darkgray}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{
          color: appcolor.darkgray,
          fontSize: 14,
          fontFamily: fontFamily.verdanaRegular,
          marginLeft: wp('2'),
          width: '70%',
          height: 40,
        }}
        caretHidden={false}
        secureTextEntry={eye ? Secure : false}
        value={value}
        editable={editable ? editable : false}
      />
      {eye && (
        <TouchableOpacity
          style={{
            paddingRight: wp('2'),
            height: '100%',
            justifyContent: 'center',
          }}
          onPress={() => setSecure(!Secure)}>
          <Image
            source={Secure ? Images.eye : Images.hidden}
            style={{height: wp('5'), width: wp('5')}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommonTextInput;
