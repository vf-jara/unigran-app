import React, {Component } from 'react';
import { BackHandler, Platform, View, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLogin, getToken } from '../../servicesRequest/login.service'
import { useRoute } from '@react-navigation/native';

const imgLoad = {
    uri:'https://www.unigran.br/campogrande/appUnigran/imagens/load5.gif'
}

const styles = StyleSheet.create({
    containerHome:{
        zIndex:999,
        justifyContent:"center",
        alignItems:"center",
        position:'absolute',
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(45,45,45,.35)',
    },
    modal:{
        backgroundColor:'white',
        borderRadius:5,
        width:'90%',
        height:'50%',
        alignItems:'center',
        justifyContent:'center',
    },  
    loadingHome:{
        width:150,
        height:150,
        borderRadius:100,
    },
    foto:{
        width:120,
        height:120,
        borderRadius:100,
    },
    textHome:{
        position:'absolute',
        bottom:10,
        fontSize:16,
        color:'#222'
    },
    modalConfirm:{
        backgroundColor:'white',
        borderRadius:5,
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
        padding:25,
    },
    textConfirm:{
        marginBottom:10,
        textAlign:'center'
    },
    dados:{
        fontSize:16,
        color:'rgb(32,89,147)'
    },
    rgm:{
        fontSize:16,
        color:'rgb(32,89,147)',
        marginBottom:15,
    },
    botaoLogin:{
        width:'75%',
        alignItems: 'center', 
        backgroundColor:'#1e90ff',
        borderRadius:5,
        padding:5,
        marginBottom:10,
    },
    textBotaoLogin:{
        color:'#fff'
    },
    botaoVoltar:{
        width:'100%',
        alignItems: 'center', 
        borderRadius:5,
        padding:5,
    },
    textBotaoVoltar:{
        color:'#222'
    }
})


export class LoadingCache extends Component{
    constructor(props) {
        super(props);
        this.state = {
            logar:false,
            login:'',
            password:'',
            modal:true,
            nome:'',
            foto:'https://www.unigran.br/campogrande/appUnigran/imagens/user.png',
        }
    }
    
    async UNSAFE_componentWillMount() {
        let dados = {}
        try {
            dados.login = await AsyncStorage.getItem("@LOGIN_UNIGRAN")
            dados.password = await AsyncStorage.getItem("@PASSWORD_UNIGRAN")
            dados.nome = await AsyncStorage.getItem("@NOME_ALUNO_UNIGRAN")
            dados.foto = await AsyncStorage.getItem("@FOTO_ALUNO_UNIGRAN")
            //console.log(dados)
            if(dados.foto == 'nenhuma'){
                dados.foto = 'https://www.unigran.br/campogrande/appUnigran/imagens/user.png'
            }
            this.setState({ login: dados.login });
            this.setState({ password: dados.password });
            this.setState({ nome: dados.nome });
            this.setState({ foto: dados.foto });
            
        } catch (error) {}
    }

    async logar(navigation,route){
        this.setState({ logar: true });
        var dados = {login:this.state.login,password:this.state.password}
        getLogin(dados).then(function (res) {
            if(res.data == 'Nenhuma matrícula encontrada para o RGM informado' || res == 'error'){
                this.setState({ modal: false });
                Alert.alert('Nenhuma matrícula encontrada para o RGM informado');
            }else{
                dados.senha = res.data[0].informacoes.senha;
                dados.so = 'android';
                dados.versao = global.versaoApp;
                
                getToken(dados).then(resToken =>{
                    let nome = res.data[0].informacoes.nome.split(" ")
                    nome = `${nome[0]} ${nome[nome.length - 1]}`
                    res.data[0].informacoes.nome = nome
                    try {
                        this.setState({ logar: 'false' });
                        this.setState({ modal: false });

                        global.apiBase.defaults.headers.common['Authorization'] = `Bearer ${resToken.data.token.original.token}`;
                        global.header = `Bearer ${resToken.data.token.original.token}`;
                        
                        global.dadosUsuario = {}
                        global.dadosUsuario.informacoes = res.data[0].informacoes
                        global.dadosUsuario.informacoes.app = resToken.data.atualizar
                        global.dadosUsuario.matriculas = res.data[1].matriculas
                        
                        navigation.navigate('Home',{screen:'Home'})
                        
                        if(resToken.data.atualizar=='S'){
                            setTimeout(() => {
                                if(Platform.OS=='android'){
                                    Alert.alert('Há uma nova versão do aplicativo, vá até a Google Play e atualize seu App.')
                                }else{
                                    Alert.alert('Há uma nova versão do aplicativo, vá até a Apple Store e atualize seu App.')
                                }
                            }, 1000);
                        }
                        
                    } catch (error) {}
                })
            }
            return res
        }.bind(this))
        .catch(function (error) {
            //state.loading = 'false'
            this.setState({ modal: false });
            Alert.alert('Ops! verifique sua conexão com a Internet ou entre em contato conosco.');
            return 'error'
        });
    }

    voltar(navigation,route){
        this.setState({ modal: false });
        navigation.navigate('Login')
        if(route.name!='Login'){
            this.forceUpdate()
            BackHandler.exitApp();
        }
    }
    
    render(){
        if(!this.state.modal || this.state.login == null) return null
        if(this.state.logar){
            return (
                <View style={styles.containerHome}>
                    <View style={styles.modal}>
                        <Image source={imgLoad} style={styles.loadingHome}></Image>
                        <Text style={styles.textHome}>Aguarde um instante por favor!</Text>
                    </View>
                </View>
            )
        }
        return(
            <View style={styles.containerHome}>
                <View style={styles.modalConfirm}>
                    <Image source={{uri:this.state.foto}} style={styles.foto}></Image>
                    <Text style={styles.textConfirm}>Olá <Text style={styles.dados}>{this.state.nome}</Text>, bem vindo de volta, deseja logar com o RGM abaixo?</Text>
                    <Text style={styles.rgm}>{this.state.login}</Text>
                    
                    {/* BOTÃO DE LOGIN */}
                    <TouchableOpacity
                        style={styles.botaoLogin}
                        onPress={()=>{
                            this.logar(this.props.navigation,this.props.route)
                        }}
                    >
                        <Text style={styles.textBotaoLogin}>Acessar</Text>
                    </TouchableOpacity>

                    <Text>ou</Text>

                    {/* BOTÃO DE VOLTAR */}
                    <TouchableOpacity
                        style={styles.botaoVoltar}
                        onPress={()=>{
                            //this.props.navigation.navigate('Home',{screen:'Home'})
                            this.voltar(this.props.navigation,this.props.route)
                        }}
                    >
                        <Text style={styles.textBotaoVoltar}>{this.props.route.name=='Login'?'Acessar com outra conta':'Sair do Aplicativo'}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

export default function login(props){
    const route = useRoute();
    return <LoadingCache navigation={props.navigation} route={route}/>
}
