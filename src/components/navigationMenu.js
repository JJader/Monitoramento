import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class NavigationMenu extends Component{
    render(){
      return(
        <View style={{flexDirection: 'row', alignItems: "center", backgroundColor: '#0279be', paddingTop: 20}}>
          <TouchableOpacity onPress={this.props.navigationProps.bind(this)} style = {{marginLeft: 5}}>
            <Ionicons name="md-reorder" size={50} color="white" style={{marginLeft: 10,}} />
          </TouchableOpacity>
          <Text style = {{flex: 1, color:'white', fontSize:20, marginLeft: 20, fontWeight: 'bold'}}>
            {this.props.title}
          </Text>
        </View>
      )
    }
  }