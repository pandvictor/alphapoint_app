import {showMessage, hideMessage} from 'react-native-flash-message';
import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const showNotification = body => {
  // console.log('body', body);

  showMessage({
    duration: body.duration ? body.duration : 2500,
    message: body.message ? body.message : '',
    description: body.description ? body.description : '',
    type: body.type,
    floating: true,
    icon: body.type,
    position: {top: Platform.OS == 'ios' ? hp('3') : hp('3')},
  });
};

export default showNotification;
