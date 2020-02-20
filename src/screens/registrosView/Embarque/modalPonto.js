import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Switch, ScrollView, FlatList } from 'react-native';

import PresencaAluno from './PresencaAluno';
import styles from '../../../styles/Modal'
import stylesText from '../../../styles/text';
import stylesComponets from '../../../styles/componets';
import BotaoPonto from '../../../components/modal/botaoPonto';


class modalAlunos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            data: this.props.data,
            ponto: this.props.ponto,
            backgColor: '#0279be',
            refresh: false,
        };
    }

    ModalSet(estado) {
        this.setState({ isVisible: estado })
        
    }

    PresencaAluno(aluno, presenca) {
        let data = this.state.data
        data.data[aluno].presenca = presenca
        this.setState({ data })
    }

    PresencaTodosAluno(aluno, presenca){
        if (this.state.data.data.length != 0){
            for (aluno = 0 ; aluno < this.state.data.data.length; aluno++ ){
                this.PresencaAluno(aluno,presenca)
            }
            this.setState({refresh: !this.state.refresh})    
        }
    }
    
    AdicionarAluno(nome, idade){
        let aluno = this.props.RetornaAluno(nome,idade)
        let data = this.state.data
        let lista = data.data
        let existe = false
        
        lista.map((item) => {
            item.id == aluno.id ? existe = true : null
        })
        
        if(!existe){
            lista.push(aluno)
            data.data = lista
            this.setState({ data })
            this.setState({refresh: !this.state.refresh})
        }else {
            alert("Não é possível adicionar esse aluno")
        }    
    }

    FinalizarEmbarque(){
        this.setState({backgColor: '#32CD32'})
        this.setState({isVisible: !this.state.isVisible})
        this.setState({refresh: !this.state.refresh})
        this.props.FinalizarEmbarque(this.state.ponto, this.state.data)
        
    }
    
    Cancelar(){
        let newdata = this.props.Cancelar(this.state.ponto)
        let data = this.state.data
        data.data = newdata.data
        this.setState({data})
        this.setState({refresh: !this.state.refresh})
        //this.props.Refresh()
    }

    render() {
        return (
            <View style={styles.conteiner}>
                <TouchableOpacity onPress={() => this.ModalSet(true)}>
                    <View style={[stylesComponets.ponto, {backgroundColor : this.state.backgColor}]}>
                        <Text style={stylesText.cabecalho}>
                            {this.state.data.value}
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
                                    PresencaAluno={(aluno, presenca) => this.PresencaTodosAluno(aluno, presenca)}
                                    nome = "Todos Alunos"
                                    aluno = {-1}
                                    presenca = {false}
                                />
                            </View>
                            <FlatList
                                keyExtractor={item => String(item.id)}
                                data={this.state.data.alunos}
                                extraData = {this.state.refresh}
                                renderItem={
                                    ({ item, index }) => {
                                        return (
                                            item.presenca ? null :
                                            <PresencaAluno
                                                PresencaAluno={(aluno, presenca) => this.PresencaAluno(aluno, presenca)}
                                                nome={item.nome}
                                                escola={item.escola}
                                                aluno={index}
                                                presenca = {item.presenca}
                                            />
                                        )
                                    }
                                }/>
                                <BotaoPonto
                                    FinalizarEmbarque={() => this.FinalizarEmbarque()}
                                    ModalSet = {(estado) => this.ModalSet(estado)}
                                    Cancelar = {() => this.Cancelar()}
                                    AdicionarAluno = {(nome, idade) => this.AdicionarAluno(nome,idade)}
                                />
                        </ScrollView>
                    </Modal>
                </View>
            </View>
        );
    }
}

export default modalAlunos;
