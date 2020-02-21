import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import styles from '../../../styles/Modal'
import stylesComponets from '../../../styles/componets';
import stylesText from '../../../styles/text';

import _ from "lodash";

export default class PresencaAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presenca: _.cloneDeep(this.props.presenca),
            nome: this.props.nome.split(' '),
            aluno_index : this.props.aluno
        };
    };

    alteraPresenca(presenca) {
        this.props.setListaPresenca(this.state.aluno_index, presenca)
        this.setState({ presenca })
    }

    todosAlunosStyle() {
        return (
            this.props.aluno == -1 ?
                { fontWeight: 'bold' } :
                { fontWeight: 'normal'}
        )
    }

    escolaStyle() {
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
            <View style={stylesText.view}>
                <View style={stylesComponets.switch}>
                    <Text style={[stylesText.text, this.todosAlunosStyle()]}>
                        {this.state.nome[0]} {this.state.nome.slice(-1)}
                    </Text>
                    {this.escolaStyle()}
                </View>
                <View>
                    <Switch
                        trackColor={{ true: stylesComponets.botao.backgroundColor }}
                        thumbColor={stylesComponets.botao.backgroundColor}
                        value={this.state.presenca}
                        onValueChange={() => this.alteraPresenca(!this.state.presenca)}
                    />
                </View>
            </View>
        )
    }
}
