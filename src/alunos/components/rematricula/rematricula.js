import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Linking, Alert } from 'react-native'
import { getRematricula, getVerificaRematricula, getValidaRematricula } from '../../servicesRequest/rematricula.service';

export default class Rematricula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rematricula: '',
            permissao: false,
            mensagem1: false,
            mensagem2: false
        }
    }

    async UNSAFE_componentWillMount() {
        this.iniciar()
    }

    iniciar() {
        let dadosUsuario = global.dadosUsuario.matriculas.slice();
        let rgm = dadosUsuario[0].rgm;
        getValidaRematricula().then((valida) => {
            getVerificaRematricula(rgm).then((verifica) => {
                if (verifica.data.length == 0) {
                    this.setState({ permissao: true });
                    this.setState({ mensagem1: true });
                    this.setState({ mensagem2: false });
                }
                if (valida.data[0].ano_atual_mtr == verifica.data[0].ano && valida.data[0].semestre_atual_mtr == verifica.data[0].sem) {
                    this.setState({ permissao: false });
                    this.setState({ mensagem1: false });
                    this.setState({ mensagem2: true });
                }
                if (valida.data[0].ano_atual_mtr != verifica.data[0].ano && valida.data[0].semestre_atual_mtr != verifica.data[0].sem) {
                    this.setState({ permissao: true });
                    this.setState({ mensagem1: true });
                    this.setState({ mensagem2: false });
                }
            });
        });
    }

    rematricula() {
        let dadosUsuario = global.dadosUsuario.matriculas.slice();
        let rgm = dadosUsuario[0].rgm;
        getRematricula(rgm).then((res) => {
            let debito_pendente = '13';
            let mtr_nao_normal = '14';
            if (res.status == 200) {
                if (res.data[0].dbt_id) {
                    Linking.openURL(`http://area.campogrande.unigran.br/boleto/sicredi/?data=${res.data[0].dbt_id}`);
                    return;
                }
            }
            if (res.status == 500) {
                if (res.data.message.indexOf(debito_pendente) > -1) {
                    Alert.alert('Atenção', 'Possui débitos pendentes, procure a secretaria.');
                    return
                }
                if (res.data.message.indexOf(mtr_nao_normal) > -1) {
                    Alert.alert('Atenção', 'Matrícula Transitória, procure a secretaria.');
                    return
                }
                return
            }
        });
    }

    render() {
        const permissao = this.state.permissao;
        const mensagem1 = this.state.mensagem1;
        const mensagem2 = this.state.mensagem2;

        return (
            <View style={stylesRematricula.container}>
                <View>
                    {permissao ? (
                        <TouchableOpacity
                            style={stylesRematricula.button}
                            onPress={() => this.rematricula()}>
                            <Text style={stylesRematricula.tituloButton}>Efetuar Rematrícula Agora</Text>
                        </TouchableOpacity>
                    ) : false}
                </View>
                {mensagem1 ? (
                    <View style={stylesRematricula.caixaMensagemAviso}>
                        <Text style={stylesRematricula.mensagemAviso}>Após a rematrícula, retire seu contrato na secretaria</Text>
                    </View>
                ) : false}
                {mensagem2 ? (
                    <View style={stylesRematricula.caixaMensagemAviso}>
                        <Text style={stylesRematricula.mensagemAviso}>Rematrícula efetuada, acesse sua Área Acadêmica para mais informações</Text>
                    </View>
                ) : false}
            </View>
        )
    }

}

const stylesRematricula = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: "rgb(0,73,124)",
        padding: 20,
        elevation: 3,
        borderRadius: 10,
        marginBottom: 20,
    },
    tituloButton: {
        color: "white",
        textTransform: 'uppercase',
        fontSize: 16
    },
    caixaMensagemAviso: {
        width: '90%',
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightColor: '#c0392b',
        borderLeftColor: '#c0392b',
        borderTopColor: '#c0392b',
        borderBottomColor: '#c0392b',
        borderRadius: 10
    },
    mensagemAviso: {
        textAlign: 'center',
        textTransform: 'uppercase',
        alignItems: "center",
        color: '#c0392b',
        fontSize: 17,
        padding: 30,
    },
});
