import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {PermissionsAndroid, Alert} from 'react-native';

const useGeolocation = Refresh => {
  const [latitude, setlatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [timestamp, settimestamp] = useState(null);
  const [locationerror, setlocationerror] = useState(false);

  React.useEffect(() => {
    getlocation().next();
  }, [Refresh]);
  React.useEffect(() => {
    getlocation().next();
  }, []);

  async function* getlocation() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      yield Geolocation.getCurrentPosition(info => {
        setlatitude(info.coords.latitude);
        setlongitude(info.coords.longitude);
        settimestamp(info.timestamp);
        setlocationerror(false);
      });
    } else {
      yield setlocationerror('ACCESS_FINE_LOCATION permission denied');
    }
  }

  return {latitude, longitude, timestamp, locationerror};
};
export default useGeolocation;
