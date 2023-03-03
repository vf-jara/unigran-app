import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, RefreshControl, Linking } from 'react-native'
import { getParametros } from '../../servicesRequest/parametros';
import { getBiblioteca, getPermissao } from '../../servicesRequest/biblioteca.service'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
MaterialIcons.loadFont();
import FontAwesome from 'react-native-vector-icons/FontAwesome'
FontAwesome.loadFont();

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rematricula: '',
            biblioteca: '',
            refreshing: false
        }
    }

    async UNSAFE_componentWillMount() {
        this.iniciar();
    }

    _onRefresh = () => {
        this.iniciar();
    }

    iniciar() {
        this.setState({ refreshing: true });
        setTimeout(() => { this.setState({ refreshing: false }); }, 1000);
        let matricula = global.dadosUsuario.matriculas;
        getParametros().then((res) => {
            let periodo_rematricula = res.data;
            if (periodo_rematricula[0].periodo_rematricula == 'S') { this.setState({ rematricula: true }); }
            else { this.setState({ rematricula: false }); }
        })
        getPermissao(matricula[0].cursoId).then((res) => {
            if (res == true) {
                this.setState({ biblioteca: true });
            } else {
                this.setState({ biblioteca: false });
            }
        })
    }

    biblioteca() {
        let matricula = global.dadosUsuario.matriculas;
        let informacoes = global.dadosUsuario.informacoes;
        let permissao = { "rgm": matricula[0].rgm, "contrato": matricula[0].contrato, "nome": informacoes.nome }
        getBiblioteca(matricula[0].rgm, permissao).then((res) => {
            if (res.original) {
                Linking.openURL(res.original);
            }
        });
    }


    render() {

        const rematricula = this.state.rematricula;
        const biblioteca = this.state.biblioteca;

        function navigateTo(to, navigation) {
            navigation.navigate(`${to}`)
        }

        return (
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
                <View style={styles.containerView}>

                    {/* Home */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => navigateTo('Home', this.props.navigation)}
                    >
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeHome}>
                                    <MaterialIcons style={styles.iconeHome} name="home" size={30} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Home</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Faltas */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => navigateTo('Faltas', this.props.navigation)}
                    >
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeFaltas}>
                                    <FontAwesome style={styles.iconeFaltas} name="calendar-times-o" size={23} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Faltas</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Notas */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => navigateTo('Notas', this.props.navigation)}
                    >
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeNotas}>
                                    <FontAwesome style={styles.iconeNotas} name="bar-chart" size={21} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Notas</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Horários */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => navigateTo('Horarios', this.props.navigation)}
                    >
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeHorarios}>
                                    <MaterialIcons style={styles.iconeHorarios} name="query-builder" size={30} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Horários</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Códigos de turmas classroom */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => navigateTo('codigosClassroom', this.props.navigation)}
                    >
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeClassroom}>
                                    <FontAwesome style={styles.iconeClassroom} name="google" size={27} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Códigos Classroom</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Falar com a Unigran */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => navigateTo('menuUningran', this.props.navigation)}
                    >
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeFalar}>
                                    <MaterialIcons style={styles.iconeFalar} name="settings-phone" size={23} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Falar com a Unigran</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Boletos */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => navigateTo('Boletos', this.props.navigation)}
                    >
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeBoletos}>
                                    <FontAwesome style={styles.iconeBoletos} name="barcode" size={25} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Boletos</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Passaporte */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => navigateTo('Passaporte', this.props.navigation)}
                    >
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconePassaporte}>
                                    <FontAwesome style={styles.iconePassaporte} name="vcard" size={25} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Passaporte</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Rematricula */}
                    {rematricula ? (
                        <TouchableOpacity
                            style={styles.touch}
                            onPress={() => navigateTo('Rematricula', this.props.navigation)}
                        >
                            <View style={styles.cardContainer}>
                                <View style={styles.viewIcone}>
                                    <View style={styles.circleIconeRematricula}>
                                        <MaterialIcons style={styles.iconeRematricula} name="notifications-active" size={25} />
                                    </View>
                                </View>
                                <View style={styles.viewText}>
                                    <Text style={styles.cardText}>Rematrícula</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : false}

                    {/* Biblioteca */}
                    {biblioteca ? (
                        <TouchableOpacity
                            style={styles.touch}
                            onPress={this.biblioteca}
                        >
                            <View style={styles.cardContainer}>
                                <View style={styles.viewIcone}>
                                    <View style={styles.circleIconeBiblioteca}>
                                        <FontAwesome style={styles.iconeBiblioteca} name="book" size={25} color={'#222'} />
                                    </View>
                                </View>
                                <View style={styles.viewText}>
                                    <Text style={styles.cardText}>Biblioteca Virtual</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : false}

                    {/* Calendário Acadêmico */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => Linking.openURL(`https://www.unigran.br/campogrande/calendario/`)}
                    >

                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeCalendario}>
                                    <FontAwesome style={styles.iconeCalendario} name="calendar" size={25} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Calendário Acadêmico</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Manual do Aplicativo */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => Linking.openURL(`http://area.campogrande.unigran.br/manuais/Manual%20de%20Instru%C3%A7%C3%B5es%20Aplicativo.pdf`)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeManual}>
                                    <FontAwesome style={styles.iconeManual} name="address-book" size={25} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Manual Aplicativo</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Manual do academico */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => Linking.openURL(`http://area.campogrande.unigran.br/manuais/MANUAL%20DO%20ACAD%C3%8AMICO%202022.pdf`)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeManualAcademico}>
                                    <FontAwesome style={styles.iconeManualAcademico} name="address-book" size={25} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Manual Acadêmico</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Sair */}
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => navigateTo('Login', this.props.navigation)}
                    >
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeSair}>
                                    <FontAwesome style={styles.iconeSair} name="sign-out" size={24} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardTextSair}>Sair</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ddd',
    },
    containerView: {
        marginBottom: 15,
    },
    touch: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 2,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
    },
    cardContainer: {
        padding: 10,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
    },
    viewIcone: {
        flex: 1,
        justifyContent: "center",
        position: 'relative',
        alignItems: 'center'
    },
    circleIconeHome: {
        backgroundColor: 'rgb(0,73,124)',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeFaltas: {
        backgroundColor: '#962c21',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeNotas: {
        backgroundColor: '#229667',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeHorarios: {
        backgroundColor: '#751048',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeClassroom: {
        backgroundColor: '#006331',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeFalar: {
        backgroundColor: '#633681',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeBoletos: {
        backgroundColor: '#1d7881',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconePassaporte: {
        backgroundColor: '#006331',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeRematricula: {
        backgroundColor: 'rgb(0,73,124)',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeBiblioteca: {
        backgroundColor: '#229667',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeCalendario: {
        backgroundColor: '#f76c6a',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeManual: {
        backgroundColor: '#112031',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeManualAcademico: {
        backgroundColor: '#633681',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeSair: {
        backgroundColor: '#c0392b',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconeHome: {
        color: '#f2f2f2',
    },
    iconeFaltas: {
        color: '#f2f2f2',
    },
    iconeNotas: {
        color: '#f2f2f2',
    },
    iconeHorarios: {
        color: '#f2f2f2',
    },
    iconeClassroom: {
        color: '#f2f2f2',
    },
    iconeFalar: {
        color: '#f2f2f2',
    },
    iconeBoletos: {
        color: '#f2f2f2',
    },
    iconePassaporte: {
        color: '#f2f2f2',
    },
    iconeRematricula: {
        color: '#f2f2f2',
    },
    iconeBiblioteca: {
        color: '#f2f2f2',
    },
    iconeCalendario: {
        color: '#f2f2f2',
    },
    iconeManual: {
        color: '#f2f2f2',
    },
    iconeManualAcademico: {
        color: '#f2f2f2',
    },
    iconeSair: {
        color: '#f2f2f2',
    },
    viewText: {
        flex: 3,
        justifyContent: 'center',
    },
    cardText: {
        width: '90%',
        textAlign: 'left',
        fontSize: 18,
        letterSpacing: 1,
    },
    cardTextSair: {
        width: '90%',
        textAlign: 'left',
        fontSize: 22,
        letterSpacing: 1,
        color: '#c0392b'
    },
})