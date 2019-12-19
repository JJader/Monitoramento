import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class NavigationMenu extends Component{
    render(){
      return(
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.props.navigationProps.bind(this)} style = {{marginLeft: 5}}>
            <Ionicons name="md-reorder" size={50} color="white" style={{marginLeft: 10,}} />
          </TouchableOpacity>
        </View>
      )
    }
  }