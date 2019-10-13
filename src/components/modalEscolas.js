import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/Modal'
class modalAlunos extends Component {
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
                <TouchableOpacity style={styles.textView} onPress={() => { this.setState({ isVisible: true }) }}>
                    <Text style={styles.item}>{this.state.data.nome}</Text>
                </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isVisible}
                        onRequestClose={() => this.setState({ isVisible: false })}
                    >
                        <TouchableOpacity onPress={() => this.setState({ isVisible: false })}>
                            <View style={styles.modalBackground}>

                                <View style={styles.modalItem}>
                                    <View style={styles.itemCabecalho}>
                                        <Text style={styles.textCabecalho}>{this.state.data.nome}</Text>
                                    </View>

                                    <View style={styles.titleText}>

                                        <Text style={styles.textInfo}>
                                            <Text style={styles.textTitle}>Endereço: </Text>
                                            {this.state.data.endereco}
                                        </Text>

                                        <Text style={styles.textInfo}>
                                            <Text style={styles.textTitle}>Numero: </Text>
                                            {this.state.data.numero}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
        );
    }
}

export default modalAlunos;
