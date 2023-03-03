import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, UIManager, LayoutAnimation, Platform, Linking, RefreshControl } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
MaterialIcons.loadFont();
import FontAwesome from 'react-native-vector-icons/FontAwesome'
FontAwesome.loadFont();
import { getParametros } from '../../servicesRequest/parametros';

export default class MenuUnigran extends Component {
    constructor() {
        super();
        this.state = {
            parametro: [],
            filtro: '',
            refreshing: false,
            secretaria: false,
            tesouraria: false,
            nad: false,
            biblioteca: false,
            balcao: false,
            ouvidoria: false
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    changeLayout = (id) => {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        if (id == 1) {
            this.setState({ secretaria: !this.state.secretaria });
            this.setState({ tesouraria: false });
            this.setState({ nad: false });
            this.setState({ biblioteca: false });
            this.setState({ balcao: false });
            this.setState({ ouvidoria: false });
        }
        if (id == 2) {
            this.setState({ secretaria: false });
            this.setState({ tesouraria: !this.state.tesouraria });
            this.setState({ nad: false });
            this.setState({ biblioteca: false });
            this.setState({ balcao: false });
            this.setState({ ouvidoria: false });
        }
        if (id == 3) {
            this.setState({ secretaria: false });
            this.setState({ tesouraria: false });
            this.setState({ nad: !this.state.nad });
            this.setState({ biblioteca: false });
            this.setState({ balcao: false });
            this.setState({ ouvidoria: false });
        }
        if (id == 4) {
            this.setState({ secretaria: false });
            this.setState({ tesouraria: false });
            this.setState({ nad: false });
            this.setState({ biblioteca: !this.state.biblioteca });
            this.setState({ balcao: false });
            this.setState({ ouvidoria: false });
        }
        if (id == 5) {
            this.setState({ secretaria: false });
            this.setState({ tesouraria: false });
            this.setState({ nad: false });
            this.setState({ biblioteca: false });
            this.setState({ balcao: !this.state.balcao });
            this.setState({ ouvidoria: false });
        }
        if (id == 6) {
            this.setState({ secretaria: false });
            this.setState({ tesouraria: false });
            this.setState({ nad: false });
            this.setState({ biblioteca: false });
            this.setState({ balcao: false });
            this.setState({ ouvidoria: !this.state.ouvidoria });
        }
    }
    async UNSAFE_componentWillMount() {
        this.iniciar()
    }

    _onRefresh = () => {
        this.iniciar()
    }

    iniciar() {

        this.setState({ secretaria: false });
        this.setState({ tesouraria: false });
        this.setState({ nad: false });
        this.setState({ biblioteca: false });
        this.setState({ balcao: false });
        this.setState({ ouvidoria: false });

        this.setState({ refreshing: true });
        setTimeout(() => { this.setState({ refreshing: false }); }, 1000);

        getParametros().then((res) => {
            this.setState({ parametro: res.data })
            this.state.parametro.forEach((res) => {
                this.setState({ filtro: res });
            })
        });
    }

    render() {
        function navigateTo(to, navigation) {
            navigation.navigate(`${to}`)
        }

        return (
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
                <View style={styles.containerView}>

                    {/* Coordenação */}
                    <TouchableOpacity style={styles.touch} onPress={() => navigateTo('contatoCoordenacao', this.props.navigation)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeCoordenacao}>
                                    <MaterialIcons style={styles.iconeGeral} name="people" size={30} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Coordenação</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Secretaria-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(1)} >
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeSecretaria}>
                                    <FontAwesome style={styles.iconeGeral} name="graduation-cap" size={23} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Secretaria</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.secretaria ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.sec_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.sec_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.sec_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.sec_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.sec_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.sec_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Secretaria-fim */}

                    {/* Tesouraria-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(2)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeTesourararia}>
                                    <MaterialIcons style={styles.iconeGeral} name="attach-money" size={30} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Tesouraria</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.tesouraria ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.tes_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.tes_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.tes_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.tes_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.tes_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.tes_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Tesouraria-fim */}


                    {/* Nad-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(3)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeNAD}>
                                    <FontAwesome style={styles.iconeGeral} name="percent" size={22} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>NAD</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.nad ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline}>
                                    <Text style={styles.cardTextAtivoNad}>Seja estagiário Unigran com bolsa de 100%</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.nad_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.nad_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.nad_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.nad_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.nad_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.nad_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Nad-fim */}

                    {/* Biblioteca-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(4)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeBiblioteca}>
                                    <FontAwesome style={styles.iconeGeral} name="book" size={27} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Biblioteca</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.biblioteca ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.biblioteca_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.biblioteca_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.biblioteca_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.biblioteca_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.biblioteca_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.biblioteca_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Biblioteca-fim */}

                    {/* Balcão-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(5)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeBalcao}>
                                    <FontAwesome style={styles.iconeGeral} name="id-card-o" size={23} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Balcão</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.balcao ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.balcao_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.balcao_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.balcao_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.balcao_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.balcao_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.balcao_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Balcão-fim */}


                    {/* Serviços-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={() => navigateTo('menuServicos', this.props.navigation)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeServicos}>
                                    <MaterialIcons style={styles.iconeGeral} name="settings" size={32} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Serviços</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* Serviços-fim */}


                    {/* Ouvidoria */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(6)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeOuvidoria}>
                                    <MaterialIcons style={styles.iconeGeral} name="phone-in-talk" size={23} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Ouvidoria</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.ouvidoria ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.ouvidoria_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.ouvidoria_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.ouvidoria_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.ouvidoria_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.ouvidoria_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.ouvidoria_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Suporte Aplicativo */}
                    <TouchableOpacity style={styles.touch} onPress={() => navigateTo('informacoesAlunos', this.props.navigation)} >
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeAplicativo}>
                                    <FontAwesome style={styles.iconeGeral} name="info" size={25} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Suporte Aplicativo</Text>
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
    touchAtivo: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 15,
    },
    cardContainer: {
        padding: 10,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
    },
    cardContainerAtivo: {
        paddingLeft: 47,
        paddingRight: 20,
        paddingTop: 10
    },
    cardTextAtivo: {
        fontSize: 16
    },
    cardTextAtivoNad: {
        fontSize: 18
    },
    viewIcone: {
        flex: 1,
        justifyContent: "center",
        position: 'relative',
        alignItems: 'center'
    },
    circleIconeCoordenacao: {
        backgroundColor: 'rgb(0,73,124)',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeSecretaria: {
        backgroundColor: '#962c21',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeTesourararia: {
        backgroundColor: '#229667',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeNAD: {
        backgroundColor: '#751048',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeBiblioteca: {
        backgroundColor: '#633681',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeBalcao: {
        backgroundColor: '#006331',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeServicos: {
        backgroundColor: '#1d7881',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeOuvidoria: {
        backgroundColor: 'rgb(0,73,124)',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeAplicativo: {
        backgroundColor: '#c0392b',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconeGeral: {
        color: '#f2f2f2',
    },
    inline: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    iconeContatoMail: {
        fontSize: 20,
        marginRight: 5,
        paddingRight: 1,
        color: "#D93025",
    },
    iconeContatoPhone: {
        fontSize: 20,
        marginRight: 5,
        paddingRight: 1,
        color: "#ef9e2a",
    },
    iconeContatoWhatsapp: {
        fontSize: 20,
        marginRight: 5,
        paddingRight: 1,
        color: "#009042",
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
    }
})