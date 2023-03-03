import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, UIManager, LayoutAnimation, Platform, Linking, RefreshControl } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
MaterialIcons.loadFont();
import FontAwesome from 'react-native-vector-icons/FontAwesome'
FontAwesome.loadFont();
import { getParametros } from '../../servicesRequest/parametros';

export default class MenuServicos extends Component {
    constructor() {
        super();
        this.state = {
            parametro: [],
            filtro: '',
            refreshing: false,
            cead: false,
            direx: false,
            escritoriomodelo: false,
            laboratorio: false,
            emajuc: false,
            academia: false,
            clinicaestica: false,
            clinicanutricao: false,
            nempi: false,
            npu: false
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    changeLayout = (id) => {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        if (id == 1) {
            this.setState({ cead: !this.state.cead });
            this.setState({ direx: false });
            this.setState({ escritoriomodelo: false });
            this.setState({ laboratorio: false });
            this.setState({ emajuc: false });
            this.setState({ academia: false });
            this.setState({ clinicaestica: false });
            this.setState({ clinicanutricao: false });
            this.setState({ nempi: false });
            this.setState({ npu: false });
        }
        if (id == 2) {
            this.setState({ cead: false });
            this.setState({ direx: !this.state.direx });
            this.setState({ escritoriomodelo: false });
            this.setState({ laboratorio: false });
            this.setState({ emajuc: false });
            this.setState({ academia: false });
            this.setState({ clinicaestica: false });
            this.setState({ clinicanutricao: false });
            this.setState({ nempi: false });
            this.setState({ npu: false });
        }
        if (id == 3) {
            this.setState({ cead: false });
            this.setState({ direx: false });
            this.setState({ escritoriomodelo: !this.state.escritoriomodelo });
            this.setState({ laboratorio: false });
            this.setState({ emajuc: false });
            this.setState({ academia: false });
            this.setState({ clinicaestica: false });
            this.setState({ clinicanutricao: false });
            this.setState({ nempi: false });
            this.setState({ npu: false });
        }
        if (id == 4) {
            this.setState({ cead: false });
            this.setState({ direx: false });
            this.setState({ escritoriomodelo: false });
            this.setState({ laboratorio: !this.state.laboratorio });
            this.setState({ emajuc: false });
            this.setState({ academia: false });
            this.setState({ clinicaestica: false });
            this.setState({ clinicanutricao: false });
            this.setState({ nempi: false });
            this.setState({ npu: false });
        }
        if (id == 5) {
            this.setState({ cead: false });
            this.setState({ direx: false });
            this.setState({ escritoriomodelo: false });
            this.setState({ laboratorio: false });
            this.setState({ emajuc: !this.state.emajuc });
            this.setState({ academia: false });
            this.setState({ clinicaestica: false });
            this.setState({ clinicanutricao: false });
            this.setState({ nempi: false });
            this.setState({ npu: false });
        }
        if (id == 6) {
            this.setState({ cead: false });
            this.setState({ direx: false });
            this.setState({ escritoriomodelo: false });
            this.setState({ laboratorio: false });
            this.setState({ emajuc: false });
            this.setState({ academia: !this.state.academia });
            this.setState({ clinicaestica: false });
            this.setState({ clinicanutricao: false });
            this.setState({ nempi: false });
            this.setState({ npu: false });
        }
        if (id == 7) {
            this.setState({ cead: false });
            this.setState({ direx: false });
            this.setState({ escritoriomodelo: false });
            this.setState({ laboratorio: false });
            this.setState({ emajuc: false });
            this.setState({ academia: false });
            this.setState({ clinicaestica: !this.state.clinicaestica });
            this.setState({ clinicanutricao: false });
            this.setState({ nempi: false });
            this.setState({ npu: false });
        }
        if (id == 8) {
            this.setState({ cead: false });
            this.setState({ direx: false });
            this.setState({ escritoriomodelo: false });
            this.setState({ laboratorio: false });
            this.setState({ emajuc: false });
            this.setState({ academia: false });
            this.setState({ clinicaestica: false });
            this.setState({ clinicanutricao: !this.state.clinicanutricao });
            this.setState({ nempi: false });
            this.setState({ npu: false });
        }
        if (id == 9) {
            this.setState({ cead: false });
            this.setState({ direx: false });
            this.setState({ escritoriomodelo: false });
            this.setState({ laboratorio: false });
            this.setState({ emajuc: false });
            this.setState({ academia: false });
            this.setState({ clinicaestica: false });
            this.setState({ clinicanutricao: false });
            this.setState({ nempi: !this.state.nempi });
            this.setState({ npu: false });
        }
        if (id == 10) {
            this.setState({ cead: false });
            this.setState({ direx: false });
            this.setState({ escritoriomodelo: false });
            this.setState({ laboratorio: false });
            this.setState({ emajuc: false });
            this.setState({ academia: false });
            this.setState({ clinicaestica: false });
            this.setState({ clinicanutricao: false });
            this.setState({ nempi: false });
            this.setState({ npu: !this.state.npu });
        }
    }

    async UNSAFE_componentWillMount() {
        this.iniciar()
    }

    _onRefresh = () => {
        this.iniciar()
    }

    iniciar() {

        this.setState({ cead: false });
        this.setState({ direx: false });
        this.setState({ escritoriomodelo: false });
        this.setState({ laboratorio: false });
        this.setState({ emajuc: false });
        this.setState({ academia: false });
        this.setState({ clinicaestica: false });
        this.setState({ clinicanutricao: false });
        this.setState({ nempi: false });
        this.setState({ npu: false });

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

        return (
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
                <View style={styles.containerView}>

                    {/* CEAD-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(1)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeCead}>
                                    <MaterialIcons style={styles.iconeGeral} name="desktop-mac" size={30} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>CEAD</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.cead ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.cead_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.cead_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.cead_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.cead_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.cead_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.cead_whats}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL('http://cead.unigrancapital.com.br/view/')}>
                                    <FontAwesome name='globe' style={styles.iconePublic} />
                                    <Text style={styles.cardTextAtivo}>Acesse aqui</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* CEAD-fim */}

                    {/* DIREX-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(2)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeDirex}>
                                    <MaterialIcons style={styles.iconeGeral} name="emoji-people" size={30} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>DIREX</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.direx ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.direx_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.direx_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.direx_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.direx_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.direx_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.direx_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* DIREX-fim */}

                    {/* Escritório Modelo-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(3)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeEscritorio}>
                                    <MaterialIcons style={styles.iconeGeral} name="brush" size={30} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Escritório Modelo</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.escritoriomodelo ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.arquitetura_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.arquitetura_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.arquitetura_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.arquitetura_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.arquitetura_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.arquitetura_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Escritório Modelo-fim */}

                    {/* Laboratório de Análises Clínicas-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(4)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeLaboratorio}>
                                    <FontAwesome style={styles.iconeGeral} name="stethoscope" size={23} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Laboratório de Análises Clínicas</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.laboratorio ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.biomedicina_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.biomedicina_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.biomedicina_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.biomedicina_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.biomedicina_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.biomedicina_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Laboratório de Análises Clínicas-fim */}

                    {/* Direito-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(5)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeEmaju}>
                                    <MaterialIcons style={styles.iconeGeral} name="account-balance" size={22} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>EMAJUC - Direito</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.emajuc ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.direito_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.direito_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.direito_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.direito_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.direito_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.direito_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Direito-fim */}

                    {/* Educação Fisica-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(6)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeAcademia}>
                                    <MaterialIcons style={styles.iconeGeral} name="fitness-center" size={27} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Academia Escola</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.academia ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.edfisica_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivoAcademia}>{this.state.filtro.edfisica_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.edfisica_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.edfisica_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.edfisica_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.edfisica_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Educação Fisica-fim */}

                    {/* Estética e Cosmética-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(7)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeClinica}>
                                    <MaterialIcons style={styles.iconeGeral} name="science" size={23} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Clínica Integrada de Estética</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.clinicaestica ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.estetica_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.estetica_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.estetica_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.estetica_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.estetica_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.estetica_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Estética e Cosmética-fim */}

                    {/* Nutrição-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(8)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeClinicaNutricao}>
                                    <MaterialIcons style={styles.iconeGeral} name="local-dining" size={23} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>Clínica de Nutrição</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.clinicanutricao ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.nutricao_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.nutricao_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.nutricao_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.nutricao_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.nutricao_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.nutricao_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Nutrição-fim */}

                    {/* NEMPI-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(9)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeNempi}>
                                    <MaterialIcons style={styles.iconeGeral} name="timeline" size={23} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>NEMPI</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.nempi ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.nempi_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.nempi_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.nempi_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.nempi_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.nempi_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.nempi_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* NEMPI-fim */}

                    {/* NPU-inicio */}
                    <TouchableOpacity style={styles.touch} onPress={(e) => this.changeLayout(10)}>
                        <View style={styles.cardContainer}>
                            <View style={styles.viewIcone}>
                                <View style={styles.circleIconeNpu}>
                                    <MaterialIcons style={styles.iconeGeral} name="mode-edit" size={23} color={'#222'} />
                                </View>
                            </View>
                            <View style={styles.viewText}>
                                <Text style={styles.cardText}>NPU</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.npu ? null : 0, overflow: 'hidden' }}>
                        <View style={styles.touchAtivo}>
                            <View style={styles.cardContainerAtivo}>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`mailto:` + `${this.state.filtro.npu_email}`)}>
                                    <FontAwesome name='envelope-o' style={styles.iconeContatoMail} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.npu_email}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`tel:` + `${this.state.filtro.npu_fone}`)}>
                                    <FontAwesome name='phone' style={styles.iconeContatoPhone} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.npu_fone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inline} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55` + `${this.state.filtro.npu_whats}`)}>
                                    <FontAwesome name='whatsapp' style={styles.iconeContatoWhatsapp} />
                                    <Text style={styles.cardTextAtivo}>{this.state.filtro.npu_whats}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* NPU-fim */}
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
    cardContainerAtivo: {
        paddingLeft: 47,
        paddingRight: 20,
        paddingTop: 10
    },
    cardTextAtivo: {
        fontSize: 16
    },
    cardTextAtivoAcademia: {
        fontSize: 14
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
    iconePublic: {
        fontSize: 20,
        marginRight: 5,
        paddingRight: 1,
        color: "rgb(5, 91, 34)",
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
    //Conteudo da Página
    conteudo: {
        borderRadius: 5,
        margin: 15,
        marginBottom: 0,
    },
    circleIconeCead: {
        backgroundColor: 'rgb(0,73,124)',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeDirex: {
        backgroundColor: '#962c21',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeEscritorio: {
        backgroundColor: '#229667',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeLaboratorio: {
        backgroundColor: '#229667',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeEmaju: {
        backgroundColor: '#633681',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeAcademia: {
        backgroundColor: '#006331',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeClinica: {
        backgroundColor: '#1d7881',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeClinicaNutricao: {
        backgroundColor: 'rgb(0,73,124)',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeNempi: {
        backgroundColor: '#c0392b',
        width: 48,
        height: 48,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleIconeNpu: {
        backgroundColor: 'rgb(0,73,124)',
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
    //#c0392b
})