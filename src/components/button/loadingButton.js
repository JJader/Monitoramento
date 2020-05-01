import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

import stylesContainer from '../../styles/Modal'
import stylesComponets from '../../styles/componets';
import stylesText from '../../styles/text';

class loadingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
    };
  }

  onPress(parameter) {
    this.props.onPress(parameter)
  }

  componentWillUpdate(newProps){
    
    if (newProps.loading != this.state.loading){
      this.updateLoading(newProps.loading)
    }
  }

  updateLoading = (loading) => {
    this.setState({ loading })
  }

  noIsLoding(){
    return(
      <TouchableOpacity onPress={() => {this.onPress(); this.updateLoading(true)}}>

          <View style = {stylesComponets.botao}>
            <Text style = {styles.text}>
              {this.props.text}
            </Text>
          </View>

      </TouchableOpacity>
    )
  }

  isLoding(){
    return(
    <ActivityIndicator size="large" color="blue" animating={true}/>
   ) 
  }

  render() {
    return (
      <View>
        {this.state.loading ? 
          this.isLoding()
          :
          this.noIsLoding()
        }
      </View>
    );
  }
}

export default loadingButton;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    flex: 1
},
});