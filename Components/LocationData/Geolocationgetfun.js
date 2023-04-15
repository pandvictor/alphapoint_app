import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {PermissionsAndroid, Alert, Platform} from 'react-native';

const Geolocationgetfun = async () => {
  const recall = async () => {
    if(Platform.OS === "android") {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            resolve,
            ({code, message}) =>
              reject(
                Object.assign(new Error(message), {name: 'PositionError', code}),
              ),
            {
              enableHighAccuracy: true, timeout: 2000
            },
          );
        });
      } else {
        alert('Location permission required ');
      }
    }
    }
  return await recall();
};
export default Geolocationgetfun;
