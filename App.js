import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Drawer from './src/screens/drawerNavigation'
import {useScreens} from 'react-native-screens'
useScreens();
global.URL_API = "http://192.168.1.160:8080/api/v1.0/"
//global.URL_API = "http://192.168.1.160:5000"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  
  render() {
    
    return (
      <Drawer/>
    );
  }
}

export default App;
