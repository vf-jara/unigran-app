import React, { Component } from 'react'
import { ScrollView, Alert, StyleSheet, View, Text, SafeAreaView, RefreshControl, TouchableOpacity, Linking } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/FontAwesome'
import { getBoletos } from '../../servicesRequest/boletos.service'
import Loading from '../compartilhados/loading.js'

//retirar props se nao funcionar para teste
export default class Boletos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boletos: [],
            refreshing: false
        }
    }

    async UNSAFE_componentWillMount() {
        this.iniciar()
    }

    _onRefresh = () => {
        this.iniciar()
    }

    iniciar() {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);

        let aux = global.dadosUsuario.matriculas.slice();
        let matriculas = aux[0].matricula;
        getBoletos(matriculas).then((res) => {
            this.setState({ boletos: res.data })
        });
    }

    Lista(boletos) {
        if (boletos.status == "D") {
            return (
                <View style={stylesBoletos.boletosContainer} key={boletos.dbt_id}>
                    <View style={stylesBoletos.boletoDados2}>
                        <View style={stylesBoletos.boletobox1}>
                            <Text style={stylesBoletos.boletoDadosTitulo}>ID</Text>
                            <Text style={stylesBoletos.boletoDadosText}>{boletos.dbt_id}</Text>
                        </View>
                        <View style={stylesBoletos.boletobox1}>
                            <Text style={stylesBoletos.boletoDadosTitulo}>Mes/Ano</Text>
                            <Text style={stylesBoletos.boletoDadosText}>{boletos.mes_ano}</Text>
                        </View>
                        <View style={stylesBoletos.boletobox1}>
                            <Text style={stylesBoletos.boletoDadosTitulo}>Status</Text>
                            <Text style={stylesBoletos.boletoDadosTextAberto}>Aberto</Text>
                        </View>
                        <View style={stylesBoletos.boletobox1}>
                            <Text style={stylesBoletos.boletoDadosTitulo}>Valor</Text>
                            <Text style={stylesBoletos.boletoDadosText}>{boletos.vlr}</Text>
                        </View>
                    </View>
                    {/*  <Button
                        color="rgb(50,108,165)"
                        title="Disponível para download"
                        onPress={() => Linking.openURL(`http://area.campogrande.unigran.br/boleto/sicredi/pos.php?data=${boletos.dbt_id}`)}
                    /> */}
                    <TouchableOpacity
                        style={stylesBoletos.button}
                        onPress={() => Linking.openURL(`http://area.campogrande.unigran.br/boleto/sicredi/?data=${boletos.dbt_id}`)}
                    >
                        <Text style={stylesBoletos.tituloButton}>Disponível para download</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={stylesBoletos.boletosContainer} key={boletos.dbt_id}>
                    <View style={stylesBoletos.boletoDados2}>
                        <View style={stylesBoletos.boletobox1}>
                            <Text style={stylesBoletos.boletoDadosTitulo}>ID</Text>
                            <Text style={stylesBoletos.boletoDadosText}>{boletos.dbt_id}</Text>
                        </View>
                        <View style={stylesBoletos.boletobox1}>
                            <Text style={stylesBoletos.boletoDadosTitulo}>Mes/Ano</Text>
                            <Text style={stylesBoletos.boletoDadosText}>{boletos.mes_ano}</Text>
                        </View>
                        <View style={stylesBoletos.boletobox1}>
                            <Text style={stylesBoletos.boletoDadosTitulo}>Status</Text>
                            <Text style={stylesBoletos.boletoDadosTextPago}>Pago</Text>
                        </View>
                        <View style={stylesBoletos.boletobox1}>
                            <Text style={stylesBoletos.boletoDadosTitulo}>Valor</Text>
                            <Text style={stylesBoletos.boletoDadosText}>{boletos.vlr}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }

    render() {
        if (this.state.boletos.length == 0) {
            return <Loading />
        } else {
            return (
                <SafeAreaView style={stylesBoletos.container}>
                    <View style={stylesBoletos.headerContent}>
                        <MaterialIcons style={stylesBoletos.headerIcon} name="barcode" />
                        <Text style={stylesBoletos.headerText}>Boletos Disponiveis</Text>
                    </View>

                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
                        {this.state.boletos.map(function (item, index) {
                            return (
                                <View key={index}>
                                    {this.Lista(item)}
                                </View>
                            )
                        }.bind(this))
                        }
                    </ScrollView>
                </SafeAreaView>
            )
        }
    }
}

const stylesBoletos = StyleSheet.create({
    container: {
        marginBottom: 50
    },
    //Cabeçalho da página
    headerContent: {
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: "#fff",
        padding: 2,
        justifyContent: 'center',
        elevation: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        color: '#222',
        fontSize: 20,
        marginRight: 10,
    },
    headerText: {
        color: '#222',
        fontSize: 20,
    },
    button: {
        alignItems: "center",
        backgroundColor: "rgb(0,109,206)",
        padding: 10
    },

    tituloButton: {
        color: "white",
    },

    //Grupo de boletos
    boletosContainer: {
        backgroundColor: '#fff',
        overflow: 'hidden',
        elevation: 3,
        borderColor: 'rgba(45,45,45,.25)',
        borderRadius: 5,
        margin: 10,
        marginBottom: 15,
    },
    //Boleto específica 
    boletoHeaderText: {
        color: '#fff',
    },
    boletoDados2: {
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
    },
    boletobox1: {
        paddingTop: 5,
        paddingBottom: 5,
        width: '25%',
        borderRightWidth: 1,
    },
    boletoboxvalor: {
        paddingTop: 5,
        paddingBottom: 5,
        width: '25%',

    },
    boletoDadosTextPago: {
        paddingTop: 5,
        paddingBottom: 5,
        color: 'rgb(45,180,45)',
        textAlign: 'center',
    },
    boletoDadosTextAberto: {
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        color: 'rgb(180,45,45)',
    },
    boletobox2: {
        paddingTop: 5,
        color: '#a0a0a0',
        paddingBottom: 5,
        width: '25%',
        borderRightWidth: 1,
        borderRightColor: '#aaa',
    },
    boletoDadosTitulo: {
        textAlign: 'center',
        paddingLeft: 5,
    },
    boletoDadosText: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
});
