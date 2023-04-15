import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Animated,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import {
  fontFamily,
  Images,
  appcolor,
  Fontsize,
  Width,
  resizeMode,
  constants,
  duration,
} from '../Components/Constant';

class Loder extends Component {
  constructor() {
    super();

    this.state = {
      dots: '.',
      valueget: 0,
    };
  }

  render() {
    const {
      backgroundColor = 'rgba(255,255,255,0.5)',
      marginTop = Platform.OS == 'ios' ? wp('10') : wp('13'),
    } = this.props;

    return (
      <SafeAreaView
        style={{
          flex: 1,

          backgroundColor: '#00000080',
          height: '100%',
          width: '100%',
          position: 'absolute',
          //    top: wp('10'),
          // paddingBottom: hp('5'),
          // marginTop:marginTop,
          justifyContent: 'center',
        }}>
        <View
          style={{
            //    justifyContent: 'center',
            flex: 1,
            backgroundColor: '#00000080',
            justifyContent: 'center',
            paddingBottom: wp('10'),
          }}>
          <ActivityIndicator size="large" color={appcolor.yellow} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
export default Loder;
