import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

//Routes
import Login from './alunos/components/login/login'
import Tabs from './alunos/components/routes.tab'
import RecuperarSenha from './alunos/components/recuperar-senha/recuperar.senha'
import contatoCoordenacao from './alunos/components/contato-coordenacao/contato.coordenao'
import codigosClassroom from './alunos/components/codigos-classroom/codigos.classroom'
import Boletos from './alunos/components/boletos/boletos'
import informacoesAlunos from './alunos/components/informacoes-alunos/informacoes.alunos'
import LoadingCache from './alunos/components/compartilhados/login.cache'
import { LoadingHome } from './alunos/components/compartilhados/loading'
import { getValidaManutencao } from './alunos/servicesRequest/login.service'
import MenuUnigran from './alunos/components/menu-unigran/menu.unigran'
import MenuServicos from './alunos/components/menu-servicos/menu.servicos'
import Rematricula from './alunos/components/rematricula/rematricula'
import Passaporte from './alunos/components/passaporte/passaporte'

const bgImage = {
    uri: 'https://www.unigran.br/campogrande/appUnigran/imagens/img-manutencao.png'
}

export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            manutencao: '',
            token: '',
            validaToken: false,
        }
    }

    async UNSAFE_componentWillMount() {
        this.iniciar()
    }

    _onRefresh = () => {
        this.iniciar()
    }

    iniciar() {
        getValidaManutencao().then(function (res) {
            this.setState({ manutencao: res.data });
        }.bind(this)).catch(function (e) {
            console.log(e)
        })
    }

    validarSessao() {
        if (this.state.token != '' && !this.state.validaToken) return false
        return true
    }

    render() {
        global.apiBase.interceptors.response.use(function (response) {
            if (response.data == 'Token invalido') {
                this.setState({ validaToken: false });
                return response;
            } else {
                if (response.config.url.indexOf('token') > -1) {
                    this.setState({ token: `${response.data.token.original.token}` });
                    this.setState({ validaToken: true });
                    return response;
                }
                return response;
            }
        }.bind(this), function (error) {
            return Promise.reject(error);
        });

        function LogoTitle() {
            const logo = {
                uri: 'https://www.unigran.br/campogrande/appUnigran/imagens/logo_mobile.png'
            }

            return (
                <View style={{ marginLeft: 15, padding: 5, backgroundColor: '#f8f8f8', borderRadius: 50 }}>
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={logo}
                    />
                </View>
            );
        }

        if (this.state.manutencao == '') {
            return <LoadingHome />
        } else if (this.state.manutencao == 'S') {
            return (
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f1fb' }}>
                    <Image source={bgImage} style={{ height: 300, width: 275 }}></Image>
                </View>
            )
        } else {
            return (
                <Stack.Navigator
                    initialRouteName="Login"
                    headerMode="screen"
                    screenOptions={{ headerStyle: { backgroundColor: 'rgb(0,73,124)' }, headerTintColor: '#fff', headerTitleStyle: { fontSize: 18 } }}
                >
                    <Stack.Screen
                        options={{
                            headerTitleAlign: 'left',
                            headerBackAllowFontScaling: true,
                            headerTitle: '',
                            headerLeft: () => <LogoTitle />,
                            headerBackTitleVisible: false
                        }}
                        name='Home'
                        //validarSessao
                        component={this.validarSessao() == true ? Tabs : LoadingCache}
                    />

                    <Stack.Screen
                        options={{ title: "Tela de Login", headerShown: false }}
                        name="Login"
                        //component={Login}
                        component={Login}
                    />

                    <Stack.Screen
                        options={{
                            title: "Recuperar Senha",
                        }}
                        name="RecuperarSenha"
                        //component={RecuperarSenha}
                        component={this.validarSessao() ? RecuperarSenha : LoadingCache}
                    />

                    <Stack.Screen
                        options={{
                            title: "Coordenação de curso",
                        }}
                        name="contatoCoordenacao"
                        //component={contatoCoordenacao}
                        component={this.validarSessao() ? contatoCoordenacao : LoadingCache}
                    />

                    <Stack.Screen
                        options={{
                            title: "Falar com a Unigran",
                        }}
                        name="menuUningran"
                        //component={contatoCoordenacao}
                        component={this.validarSessao() ? MenuUnigran : LoadingCache}
                    />

                    <Stack.Screen
                        options={{
                            title: "Serviços",
                        }}
                        name="menuServicos"
                        //component={contatoCoordenacao}
                        component={this.validarSessao() ? MenuServicos : LoadingCache}
                    />
                    <Stack.Screen
                        options={{
                            title: "Códigos Classroom",
                        }}
                        name="codigosClassroom"
                        //component={codigosClassroom}
                        component={this.validarSessao() ? codigosClassroom : LoadingCache}
                    />

                    <Stack.Screen
                        options={{
                            title: "Boletos",
                        }}
                        name="Boletos"
                        component={this.validarSessao() ? Boletos : LoadingCache}
                    />
                    <Stack.Screen
                        options={{
                            title: "Passaporte",
                        }}
                        name="Passaporte"
                        component={this.validarSessao() ? Passaporte : LoadingCache}
                    />

                    <Stack.Screen
                        options={{
                            title: "Rematrícula",
                        }}
                        name="Rematricula"
                        component={this.validarSessao() ? Rematricula : LoadingCache}
                    />

                    <Stack.Screen
                        options={{
                            title: "Dados para suporte",
                        }}
                        name="informacoesAlunos"
                        //component={informacoesAlunos}
                        component={this.validarSessao() ? informacoesAlunos : LoadingCache}
                    />

                </Stack.Navigator>
            )
        }
    }
}

