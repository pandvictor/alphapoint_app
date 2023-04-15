import Geolocationgetfun from './Geolocationgetfun';
import Geocoder from 'react-native-geocoder'
import { GoogleAPIKey } from '../components/Constant';
Geocoder.fallbackToGoogle(GoogleAPIKey)
const GetlocationfromLatLng = async () => {
  let coords = await Geolocationgetfun();
  let lat = coords.coords.latitude;
  let lng = coords.coords.longitude;
  let res = await Geocoder.geocodePosition({ lat, lng });
  return {
    location:
    res[0]?.formattedAddress,
    lat: res[0]?.position.lat,
    lng: res[0]?.position.lng,
    postalCode: res[0]?.postalCode,
    locality: res[0]?.locality,
    country: res[0]?.country,
  };
};
export default GetlocationfromLatLng;
