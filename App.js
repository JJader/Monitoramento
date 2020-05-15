import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Drawer from './src/screens/drawerNavigation'
import {useScreens} from 'react-native-screens'
useScreens();
//globalThis.URL_API = "http://192.168.1.160:8080/api/v1.0/"
globalThis.URL_API = "http://192.168.1.160:5000"
globalThis.token = ""

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
