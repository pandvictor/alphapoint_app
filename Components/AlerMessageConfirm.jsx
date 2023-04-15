import {Alert} from 'react-native';
export const AlertMessageConfirm = (
  titleAlert,
  descAlert,
  textCancel = 'Cancel',
  textOk = 'Ok',
  functionOk,
) => {
  return Alert.alert(titleAlert, descAlert, [
    {
      text: textCancel,

      style: 'cancel',
    },
    {
      text: textOk,
      onPress: functionOk,
    },
  ]);
};
