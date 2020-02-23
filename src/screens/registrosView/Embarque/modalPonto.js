import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Switch, ScrollView, FlatList } from 'react-native';

import PresencaAluno from './PresencaAluno';
import styles from '../../../styles/Modal'
import stylesText from '../../../styles/text';
import stylesComponets from '../../../styles/componets';
import BotaoPonto from '../../../components/modal/botaoPonto';

import _ from "lodash";

class ModalAlunos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            alunos: _.cloneDeep(this.props.data),
            ponto: this.props.ponto,
            backgColor: '#0279be',
            refresh: false,

            listaPresenca : [],

            alunos_add : 0,
        };
    }

    //Refresh
    modalSet(estado) {
        this.setState({ isVisible: estado })
        this.onRefreshFlat() 
    }

    onRefreshFlat(){
        this.setState({refresh: !this.state.refresh})
      }

    cancelar(){
        this.setState({listaPresenca : []})
        let i = this.state.alunos_add
        let alunos = _.clone(this.state.alunos)

        for (i; i > 0 ; i--){
            alunos.pop()
        }
        this.setState({alunos})
        this.setState({alunos_add : 0})
      }

    
    // Embarque
    presencaAluno(aluno, presenca) {
        let alunos = _.clone(this.state.alunos)
        alunos[aluno].presenca = presenca
        this.setState({ alunos })
    }

    setListaPresenca(aluno, presenca){
        let listaPresenca = _.clone(this.state.listaPresenca)
        let elem = {
            aluno : aluno,
            presenca: presenca
        }
        listaPresenca.push(elem)
        console.log(this.state.listaPresenca.length);
        this.setState({listaPresenca})
    }

    presencaTodosAluno(aluno, presenca){
        // não funciona, funciona so com o último
        this.setState({listaPresenca : []})
        let i
        if (this.state.alunos.length != 0){
                        
            this.setListaPresenca(0,presenca)
            this.setListaPresenca(1,presenca)
            this.setListaPresenca(2,presenca)
                
                        
        }
    }

    finalizarEmbarque(){
        let listaPresenca = this.state.listaPresenca.slice()
        
        
        let aluno, presenca
        let elem
            
        while (listaPresenca.length != 0){
            elem = listaPresenca.pop()
            aluno = elem.aluno
            presenca = elem.presenca
            console.log(elem);
            
            this.presencaAluno(aluno,presenca)
        }
        this.onRefreshFlat()  
        
        this.setState({backgColor: '#32CD32'})
        this.setState({isVisible: !this.state.isVisible})

        this.setState({listaPresenca : []})
        this.setState({alunos_add : 0})

        this.props.finalizarEmbarque(this.state.ponto, this.state.alunos)
    }

    //Operações especiais
    adicionarAluno(nome, idade){
        let aluno = this.props.retornaAluno(nome,idade)
        let lista = _.clone(this.state.alunos)
        let alunos_add = this.state.alunos_add + 1
        
        lista.map((item) => {
            if(item.id == aluno.id){ 
                alert("Não é possível adicionar esse aluno")
                return
            } 
        })
        
        lista.push(aluno)
        this.setState({ alunos: lista })
        this.setState({alunos_add})
        this.onRefreshFlat()
    }

    render() {
        return (
            <View style={styles.conteiner}>
                <TouchableOpacity onPress={() => this.modalSet(true)}>
                    <View style={[stylesComponets.ponto, {backgroundColor : this.state.backgColor}]}>
                        <Text style={stylesText.cabecalho}>
                            {this.props.titulo}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View >
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.isVisible}
                        onRequestClose={() => this.modalSet(false)}>

                        <ScrollView style={{ backgroundColor: 'white' }}>
                            <View style={stylesText.viewCabecalho}>
                                <Text style={stylesText.cabecalho}>Embarque</Text>
                            </View>
                            <View style = {{marginBottom: 10}}>
                                <PresencaAluno
                                    setListaPresenca={(aluno, presenca) => this.presencaTodosAluno(aluno, presenca)}
                                    nome = "Todos Alunos"
                                    aluno = {-1}
                                    presenca = {false}
                                />
                            </View>
                            <FlatList
                                keyExtractor={item => String(item.id)}
                                data={this.state.alunos}
                                extraData = {this.state.refresh}
                                renderItem={
                                    ({ item, index }) => {
                                        
                                        return (
                                            //item.presenca ? null :
                                            <PresencaAluno
                                                setListaPresenca={(aluno, presenca) => this.setListaPresenca(aluno, presenca)}
                                                nome={item.nome}
                                                escola={item.escola}
                                                aluno={index}
                                                presenca = {item.presenca}
                                            />
                                        )
                                    }
                                }/>
                                <BotaoPonto
                                    finalizarEmbarque={() => this.finalizarEmbarque()}
                                    modalSet = {(estado) => this.modalSet(estado)}
                                    adicionarAluno = {(nome, idade) => this.adicionarAluno(nome,idade)}
                                    cancelar = {() => this.cancelar()}
                                />
                        </ScrollView>
                    </Modal>
                </View>
            </View>
        );
    }
}

export default ModalAlunos;
