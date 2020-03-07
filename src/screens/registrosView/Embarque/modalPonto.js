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
        /*this.setState({listaPresenca : []})
        let i
        if (this.state.alunos.length != 0){
                        
            this.setListaPresenca(0,presenca)
            this.setListaPresenca(1,presenca)
            this.setListaPresenca(2,presenca)

        }
        */
       return null
    }

    finalizarEmbarque(){

        if (this.props.titulo != 'default'){
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
        else{
            alert("Não é permitido enviar para o servidor")
        }
    }

    //Operações especiais
    delStudent(id,ponto){
        let aluno = this.props.delStudent(id,ponto)
        return aluno
    }

    searchStudent(id){
        let alunos = _.clone(this.state.alunos)

        let aluno = alunos.find(element => element.id == id)
        if (aluno == undefined){
            return false
        }else{
            return true
        }
    }

    addStudent(id, oldPonto){
        let exist = this.searchStudent(id)
        if (!exist){
            let aluno = this.delStudent(id, oldPonto)

            if(aluno != undefined){
                let alunos_add = this.state.alunos_add + 1

                let alunos = _.clone(this.state.alunos)
                alunos.push(aluno)
                this.setState({ alunos })
                this.setState({alunos_add})
                this.onRefreshFlat()
            }else{
                alert("O aluno não foi encontrado")
            }   
        }else{
            alert("Esse aluno já existe nessa lista")
        }
    }

    componentWillUpdate(newProps){
        try {
            if (newProps.data.length + this.state.alunos_add < this.state.alunos.length){
                this.setState({alunos : newProps.data})
                
            }    
        } catch (error) {
            console.log("Erro modalPonto ");
            
        }
        
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
                                    addStudent = {(id, oldPonto) => this.addStudent(id, oldPonto)}
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
