import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import styles from '../../styles/Modal'
import stylesText from '../../styles/text'
import stylesComponent from '../../styles/componets'
class itemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            data: this.props.data
        };
    }

    render() {
        return (
            <View style={styles.conteiner}>
                <TouchableOpacity style={stylesText.view} 
                    onPress={() => { this.setState({ isVisible: true }) }}>
                    <Text style={stylesText.text}>{this.state.data[0][1]}</Text>
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
