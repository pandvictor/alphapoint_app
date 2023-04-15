import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  appcolor,
  fontFamily,
  Fontsize,
  GoogleAPIKey,
} from "../components/Constant";
import Geocoder from "react-native-geocoder";
import GetlocationfromLatLng from "./GetlocationfromLatLng";

Geocoder.fallbackToGoogle(GoogleAPIKey);
export default class Locationdata extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: "",
      searchResults: [],
      isShowingResults: false,
      currentlocation: true,
    };
  }
  searchLocation = async (text) => {
    this.setState({ searchKeyword: text });
    axios
      .request({
        method: "post",
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleAPIKey}&input=${this.state.searchKeyword}`,
      })
      .then((response) => {
        this.setState({
          searchResults: response.data.predictions,
          isShowingResults: true,
        });
      })
      .catch((e) => {});
  };
  getlocationcoords = async (address) => {
    const res = await Geocoder.geocodeAddress(address);

    this.setState({
      searchKeyword:
        address + (res[0]?.postalCode != null ? "," + res[0]?.postalCode : ""),
    });
    this.props.CallBackLocationData({
      location:
        address + (res[0]?.postalCode != null ? "," + res[0]?.postalCode : ""),
      lat: res[0].position.lat,
      lng: res[0].position.lng,
      postalCode: res[0].postalCode,
      locality: res[0].locality,
      country: res[0].country,
    });
  };

  _getcurrentdata = async () => {
    let res = await GetlocationfromLatLng();
    this.props.emptylocaion(false)

    this.setState({
      searchKeyword: res?.location,
      isShowingResults: false,
      currentlocation: true,
    });
    this.props.CallBackLocationData({
      location: res?.location,
      lat: res.lat,
      lng: res.lng,
      postalCode: res.postalCode,
      locality: res.locality,
      country: res.country,
    });
  };
  componentDidMount = () => {
    const { value } = this.props;

    if (value) {
      this.setState({ searchKeyword: value });
    }
  };
  render() {
    const { searchKeyword, currentlocation } = this.state;
    const {
      mainview,
      textinputview,
      value,
      placeholder = "Select location"
    } = this.props;
    const styles = StyleSheet.create({
      eventTypeImage: {
        height: hp("4"),
        width: hp("4"),
      },
      resultItem: {
        width: "100%",
        justifyContent: "center",
        borderBottomColor: "#ccc",
        borderBottomWidth: wp("0.3"),
        paddingVertical: wp("2"),
      },
      mainview: mainview,
      textinputview: textinputview,
    });
    return (
      <View style={[{}, styles.mainview]}>
        <View
          style={[
            {
              borderWidth: wp("0.3"),
              borderRadius: wp("3"),
              paddingHorizontal: wp("3"),
              marginBottom: wp("3"),
              paddingVertical: wp("1.5"),
              borderColor: appcolor.bordercolor,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor:appcolor.white
            },
            styles.textinputview,
          ]}
        >
          <TouchableOpacity onPress={() => this._getcurrentdata()}>
            <Image
              resizeMode="center"
              source={require("../Images/current_location.png")}
              style={{ ...styles.eventTypeImage }}
            />
          </TouchableOpacity>

          <TextInput
            style={{
              color: appcolor.placeholder,
              fontFamily: fontFamily.UbuntuRegular,
              fontSize: Fontsize.medium,
              marginLeft: wp("1"),
              width: "85%",
              padding: 0,
            }}
            value={
              value && searchKeyword == "" && currentlocation
                ? value
                : searchKeyword
            }
            onChangeText={(text) => {
              this.setState({ currentlocation: false });
              this.searchLocation(text);
              if( text == ""){
                this.props.emptylocaion(true)
              }else{
                this.props.emptylocaion(false)

              }
              
            }}
            placeholder={placeholder}
          />
        </View>
        <View style={{ position: "relative" }}>
          {this.state.isShowingResults && searchKeyword != "" && (
            <FlatList
              data={this.state.searchResults}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => {
                      this.getlocationcoords(item.description);
                      this.setState({
                        searchResults: [],
                        isShowingResults: false,
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: wp("4"),
                        fontFamily: fontFamily.UbuntuRegular,
                      }}
                    >
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    );
  }
}
