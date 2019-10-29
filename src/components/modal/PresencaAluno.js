import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import styles from '../../styles/Modal'
import stylesComponets from '../../styles/componets';
import stylesText from '../../styles/text';

export default class PresencaAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presenca: this.props.presenca,
            nome: this.props.nome.split(' '),
        };
    };

    AlteraPresenca(presenca) {
        this.props.PresencaAluno(this.props.aluno, presenca)
        this.setState({ presenca })
    }

    TodosAlunos() {
        return (
            this.props.aluno == -1 ?
                { fontWeight: 'bold' } :
                { fontWeight: 'normal'}
        )
    }

    Escola() {
        return (
            this.props.aluno == -1 ? null :
            <View>    
                <Text style={stylesText.text}>
                    <Text style={{fontWeight: 'bold'}}>Escola: </Text> {this.props.escola} 
                </Text>
            </View>
        )
    }
    render() {
        return (
            <View style={[stylesText.view, this.TodosAlunos()]}>
                <View style={stylesComponets.switch}>
                    <Text style={[stylesText.text, this.TodosAlunos()]}>
                        {this.state.nome[0]} {this.state.nome.slice(-1)}
                    </Text>
                    {this.Escola()}
                </View>
                <View>
                    <Switch
                        trackColor={{ true: stylesComponets.botao.backgroundColor }}
                        thumbColor={stylesComponets.botao.backgroundColor}
                        value={this.state.presenca}
                        onValueChange={() => this.AlteraPresenca(!this.state.presenca)}
                    />
                </View>
            </View>
        )
    }
}
