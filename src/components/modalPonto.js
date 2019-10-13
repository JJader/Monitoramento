import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Switch } from 'react-native';
import styles from '../styles/Modal'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import PresencaAluno from './PresencaAluno';

class modalAlunos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            data: this.props.data
        };
    }

    ModalSet(estado) {
        this.setState({ isVisible: estado })
    }

    setPresencaAluno(pres) {
        this.props.PresencaAluno(pres)
    }

    render() {
        return (
            <View style={styles.conteiner}>
                <TouchableOpacity onPress={() => this.ModalSet(true)}>
                    <View style={styles.myBotao}>
                        <Text style={styles.textCabecalho}>
                            {this.state.data.title}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View >
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.isVisible}
                        onRequestClose={() => this.ModalSet(false)}
                    >
                        <ScrollView style={{ backgroundColor: 'white'}}>
                            <View style={styles.itemCabecalho}>
                                <Text style={styles.textCabecalho}>Embarque</Text>
                            </View>
                            <FlatList
                                keyExtractor={item => String(item.id)}
                                data={this.state.data.data}
                                renderItem={
                                    ({ item }) => {
                                        return (
                                            <PresencaAluno
                                                setPresencaAluno={(pres) => this.setPresencaAluno(pres)}
                                                nome={item.nome}
                                            />)
                                    }
                                }
                            />
                            <TouchableOpacity onPress={() => this.ModalSet(false)}>

                                <View style={styles.myBotao}>
                                    <Text style={styles.textCabecalho}>Finalizar</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.ModalSet(false)}>
                                <View style={styles.myBotao}>
                                    <Text style={styles.textCabecalho}>Buscar aluno</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </Modal>
                </View>
            </View>
        );
    }
}

export default modalAlunos;
