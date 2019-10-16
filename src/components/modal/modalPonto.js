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
            setChaves: [],
            ponto: this.props.ponto,
        };
    }

    InsereChave(componet){
        
        let setChaves = this.state.setChaves
        setChaves.push(componet)
        this.setState({setChaves})
    }

    ModalSet(estado) {
        this.setState({ isVisible: estado })
    }

    PresencaAluno(aluno, presenca) {
        this.props.PresencaAluno(this.state.ponto, aluno, presenca)
    }

    PresencaTodosAluno(){
        if (this.state.setChaves.length != 0){
            for (let x = 0 ; x < this.state.setChaves.length; x++ ){
            this.state.setChaves[x].AlteraPresenca(!this.state.presente)
            }
            this.setState({presente: !this.state.presente})
        }
    }

    FinalizarEmbarque(){
        this.props.FinalizarEmbarque(this.state.ponto)
    }

    render() {
        return (
            <View style={styles.conteiner}>
                <TouchableOpacity onPress={() => this.ModalSet(true)}>
                    <View style={stylesComponets.ponto}>
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
                            <View style = {{marginBottom: 10}}>
                                <PresencaAluno
                                    PresencaAluno={() => this.PresencaTodosAluno()}
                                    nome = "Todos os Alunos"
                                    aluno = {-1}
                                    presente = {this.state.presente}
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
                                                ref = {(Component) => this.InsereChave(Component)}
                                            />
                                        )
                                    }
                                }/>
                                <BotaoPonto
                                    FinalizarEmbarque={() => this.FinalizarEmbarque()}
                                    ModalSet = {(estado) => this.ModalSet(estado)}
                                />
                        </ScrollView>
                    </Modal>
                </View>
            </View>
        );
    }
}

export default modalAlunos;
