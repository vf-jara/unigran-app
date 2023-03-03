import React, { Component } from 'react'
import { TouchableOpacity, Linking, StyleSheet, View, Text, ScrollView } from 'react-native'
import MaterialIconsFont from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class InformacoesAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        //console.log(global.dadosUsuario)
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerContent}>
                    <MaterialIconsFont name='info' style={styles.headerIcon} />
                    <Text style={styles.headerText}>Dados para suporte</Text>
                </View>
                <View style={styles.conteudo}>
                    <View>
                        {/* Observacao */}
                        <View>
                            <Text style={styles.disciplinasInformativo}>
                                Caso o aplicativo esteja apresentando algum problema, instabilidade ou inconsistência das
                                informações apresentadas, contate-nos através do e-mail ou telefone informados abaixo,
                                descrevendo, se possível, detalhes sobre o problema e
                                também sobre qual parte do aplicativo apresentou erro.
                            </Text>
                        </View>

                        {/* Informações de contato */}
                        <View>
                            <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:web2.di.capital@unigran.br`)}>
                                <MaterialIconsFont name='envelope-o' style={styles.iconeContatoMail} />
                                <Text style={styles.dadosContatoUnderline}>web2.di.capital@unigran.br</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:web5.di.capital@unigran.br`)}>
                                <MaterialIconsFont name='envelope-o' style={styles.iconeContatoMail} />
                                <Text style={styles.dadosContatoUnderline}>web5.di.capital@unigran.br</Text>
                            </TouchableOpacity>

                            <View style={styles.inline}>
                                <MaterialIcons name="query-builder" style={styles.iconeContatoRelogio} />
                                <Text style={styles.dadosContato}><Text style={styles.bold}>Horários de atendimento:</Text></Text>
                            </View>
                        </View>

                        {/* Horários */}
                        <View>
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardHeaderText}>Segunda-feira á Sexta-feira</Text>
                                </View>
                                <View style={styles.cardContent}>
                                    <View style={styles.cardContentText}>
                                        <Text>08:00 Hs.</Text>
                                        <Text>ás</Text>
                                        <Text>12:00 Hs.</Text>
                                    </View>
                                    <View style={styles.cardContentText}>
                                        <Text>13:00 Hs.</Text>
                                        <Text>ás</Text>
                                        <Text>17:00 Hs.</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Versão do App */}
                        {/*   <View>
                            <Text style={styles.versaoApp}>
                                <Text style={styles.bold}>Versão: </Text>
                                {global.versaoApp}
                            </Text>

                            {global.dadosUsuario.informacoes.app == "S" ?
                                <Text style={styles.infoAtualizarVersao}>
                                    <Text style={styles.bold}>* Atenção</Text>, há uma nova versão do App.
                                </Text>

                                : <Text style={styles.infoAtualizado}>* Seu aplicativo está atualizado</Text>
                            }
                        </View> */}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
    },
    //Cabeçalho da página
    headerContent: {
        marginTop: 10,
        marginBottom: 5,
        padding: 2,
        justifyContent: 'center',
        elevation: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
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
    disciplinasInformativo: {
        color: '#444',
        backgroundColor: '#fff',
        fontSize: 15,
        marginBottom: 15,
        padding: 5,
        borderRadius: 5
    },

    //Conteudo da Página
    conteudo: {
        borderRadius: 5,
        margin: 15,
        marginBottom: 0,
    },
    dadosContato: {
        textAlign: 'left',
        padding: 5,
    },
    dadosContatoUnderline: {
        textAlign: 'left',
        padding: 5,
        textDecorationLine: 'underline'
    },

    /* Versãok do App */
    versaoApp: {
        textAlign: 'left',
        padding: 5,
        marginTop: 10,
    },
    infoAtualizarVersao: {
        textAlign: 'left',
        padding: 5,
        marginTop: 0,
        color: '#c44',
    },
    infoAtualizado: {
        textAlign: 'left',
        paddingLeft: 5,
    },

    /* Globais */
    bold: {
        fontWeight: '700',
        paddingRight: 15,
    },

    /* Icones */
    inline: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    iconeContatoMail: {
        fontSize: 20,
        marginRight: 5,
        color: "#D93025",
    },
    iconeContatoPhone: {
        fontSize: 20,
        marginRight: 5,
        color: "#ef9e2a",
    },
    iconeContatoRelogio: {
        alignSelf: 'flex-end',
        fontSize: 20,
        marginRight: 3,
        color: '#126ced',
        marginBottom: 5,
    },

    /* Horarios */
    card: {
        backgroundColor: '#fff',
        position: 'relative',
        borderRadius: 5,
        marginBottom: 15,
        marginTop: -10,
    },
    cardHeader: {
        backgroundColor: 'rgb(50,108,165)',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        padding: 2,
        paddingLeft: 5,
    },
    cardHeaderText: {
        color: '#fff'
    },
    cardContent: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopWidth: 0,
    },
    cardContentText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderColor: '#ddd'
    }
});