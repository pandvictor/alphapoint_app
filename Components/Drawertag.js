import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';

import Drawer from 'react-native-drawer';

import {appcolor, fontFamily, Images, resizeMode} from './Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Drawerdesign from './Drawerdesign';
export default class Drawertag extends Component {
  constructor(){
    super();
    this.state={
      currentroute:'Home'
    }
  }
  componentDidMount = () => { 
   
  };
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  
  render() {
    const{currentroute}=this.props
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.3} // 20% gap on the right side of drawer
        useInteractionManager={true}
        content={
          <Drawerdesign
          currentroute={currentroute}
          navigation={this.props.navigation}
          closeControlPanel={this.closeControlPanel.bind(this)}/>
        }>
        {this.props.children}
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({});
