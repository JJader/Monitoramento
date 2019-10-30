import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import styles from '../../styles/Modal'
import stylesText from '../../styles/text'
import stylesComponent from '../../styles/componets'

const WIDTH = Dimensions.get('screen').width/10
class itemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            data: this.props.data.data,
            nome: this.props.data.data[0][1], //[0] nome [1] idade [2] escola [3] turno
        };
    }
    
    StringCorte(str){
      return(
        str.length <= WIDTH ? 
          str:
          str.substring(0, WIDTH) + " ..."
      )     
    }

    render() {
        return (
            <View style={styles.conteiner}>
                <TouchableOpacity style={stylesText.view} 
                    onPress={() => { this.setState({ isVisible: true }) }}>
                    <Text style={stylesText.text}>{this.StringCorte(this.state.nome)}</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => this.setState({ isVisible: false })}
                    >
                    <TouchableOpacity onPress={() => this.setState({ isVisible: false })}>
                        <View style={stylesComponent.modalBackground}>
                            <View style={stylesComponent.modalItem}>
                                <View style={stylesText.viewCabecalho}>
                                    <Text style={stylesText.cabecalho}>{this.state.data[0][1]}</Text>
                                </View>
                                <View style = {{flex: 3}}>
                                <FlatList
                                    data = {this.state.data}
                                    keyExtractor = {item => item[0]}
                                    renderItem = {
                                        ({item})=>{
                                            return (
                                                <View style = {stylesText.view}>
                                                <Text style={stylesText.text}>
                                                    <Text style={[stylesText.text, {fontWeight:'bold'}]}>{item[0]}</Text> {item[1]}
                                                </Text>
                                                </View>
                                                )
                                        }
                                    }
                                />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
                
            </View>
        );
    }
}
export default itemModal;
