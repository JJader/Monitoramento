import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Switch, ScrollView, FlatList } from 'react-native';
import PresencaAluno from './PresencaAluno';

import styles from '../../styles/Modal'
import stylesText from '../../styles/text';
import stylesComponets from '../../styles/componets';
import BotaoPonto from './botaoPonto';


class modalAlunos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            data: this.props.data,
            presente: false,
            ca: null
        };
    }

    ModalSet(estado) {
        this.setState({ isVisible: estado })
    }

    PresencaAluno(aluno, presenca) {
        this.props.PresencaAluno(this.props.ponto, aluno, presenca)
    }

    PresencaTodosAluno(){
        if (this.state.ca != null){
            this.state.ca.AlteraPresenca(!this.state.presente)
        }
    }

    render() {
        return (
            <View style={styles.conteiner}>
                <TouchableOpacity onPress={() => this.ModalSet(true)}>
                    <View style={stylesComponets.botao}>
                        <Text style={stylesText.cabecalho}>
                            {this.state.data.title}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View >
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.isVisible}
                        onRequestClose={() => this.ModalSet(false)}>

                        <ScrollView style={{ backgroundColor: 'white' }}>
                            <View style={stylesText.viewCabecalho}>
                                <Text style={stylesText.cabecalho}>Embarque</Text>
                            </View>
                            <View>
                                <PresencaAluno
                                    PresencaAluno={() => this.PresencaTodosAluno()}
                                    nome = "Todos os Alunos"
                                    aluno = {-1}
                                />
                            </View>
                            <FlatList
                                keyExtractor={item => String(item.id)}
                                data={this.state.data.data}
                                renderItem={
                                    ({ item, index }) => {
                                        return (
                                            <PresencaAluno
                                                PresencaAluno={(aluno, presenca) => this.PresencaAluno(aluno, presenca)}
                                                nome={item.nome}
                                                aluno={index}
                                                presente = {this.state.presente}
                                                ref = {(Component) => this.setState({ca: Component})}
                                            />
                                        )
                                    }
                                }/>
                            <BotaoPonto
                                ModalSet={(estado) => this.ModalSet(estado)}
                            />
                        </ScrollView>
                    </Modal>
                </View>
            </View>
        );
    }
}

export default modalAlunos;
