import React, {Component} from 'react';
import { Text, KeyboardAvoidingView, View, TextInput, Image, Alert, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLogin, getToken } from '../../servicesRequest/login.service'
import {LoadingHome} from '../compartilhados/loading'
import LoadingCache from '../compartilhados/login.cache'

const pic = {
    uri:'https://www.unigran.br/campogrande/appUnigran/imagens/logo-unigran-branco.png'
}
const bgImage = {
    uri:'https://www.unigran.br/campogrande/appUnigran/imagens/background-login.png'
}
const styles = StyleSheet.create({
    bgImage:{
        width:'100%', 
        height:'100%',
        position:'absolute',
    },
    viewlogoUnigran:{
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1, 
    },
    logoUnigran:{
        width:120, 
        height:120,
        opacity:0.95
    },
    viewForm:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-start',
    },
    input:{
        borderColor:'#fff',
        borderBottomWidth:1,
        width:'70%', 
        height:35, 
        marginBottom:35, 
        borderRadius:5,
        color:'white',
    },
    botaoLogin:{
        width:'75%',
        alignItems: 'center', 
    },
    textBotaoLogin:{
        backgroundColor:'#00519b',
        width:'75%',
        color:'white',
        borderRadius:5,
        marginTop:25,
        alignItems: 'center',
        textAlign:'center',
        padding:8, 
    },
    botaoRecuperarSenha:{
        marginTop:20
    },
    textBotaoRecuperarSenha:{
        color:'white',
    }
})

function recuperarSenha(navigation){
    navigation.navigate('RecuperarSenha')
}

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            logar:'false',
            login:'',
            password:'',
            loginSalvo:false,
        }
    }

    async UNSAFE_componentWillMount() {
        let dados = {}
        this.setState({ logar: 'false' });
        try {
            this.setState({ loginSalvo: true });
            
        } catch (error) {}
    }

    salvarDadosMemoria = async (dados,res) =>{
        try {
            await AsyncStorage.setItem("@LOGIN_UNIGRAN",dados.login)
            await AsyncStorage.setItem("@PASSWORD_UNIGRAN",dados.password)
            await AsyncStorage.setItem("@NOME_ALUNO_UNIGRAN",res.data[0].informacoes.nome)
            await AsyncStorage.setItem("@FOTO_ALUNO_UNIGRAN",res.data[0].informacoes.foto)
        } catch (error) {}
    }

    async logar(navigation){
        Keyboard.dismiss()
        if(this.state.login=='' || this.state.password==''){
            Alert.alert('Insira todos os dados para fazer Login')
            return
        }
        this.setState({ logar: 'true' });
        var rgm = this.state.login
        if(rgm.indexOf('.')>-1){

        }else{
            var stringExemplo = rgm;
            var resultado = stringExemplo.split("", 3);
            resultado = resultado[0] + resultado[1] + resultado[2] + '.' + stringExemplo.substring(3, stringExemplo.length)
            rgm = resultado
        }
        var dados = {login:rgm,password:this.state.password}
        getLogin(dados).then(function (res) {
            if(res.data == 'Nenhuma matrícula encontrada para o RGM informado' || res == 'error'){
                this.setState({ logar: 'false' });
                Alert.alert('Nenhuma matrícula encontrada para o RGM informado');
            }else{
                dados.senha = res.data[0].informacoes.senha
                dados.so = 'android';
                dados.versao = global.versaoApp;
                getToken(dados).then(resToken =>{
                    let nome = res.data[0].informacoes.nome.split(" ")
                    nome = `${nome[0]} ${nome[nome.length - 1]}`
                    res.data[0].informacoes.nome = nome
                    this.salvarDadosMemoria(dados,res)
                    try {
                        this.setState({ logar: 'false' });
                        
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
            this.setState({ logar: 'false' });
            Alert.alert('Ops! verifique sua conexão com a Internet ou entre em contato conosco.');
            return 'error'
        }.bind(this));
    }

    

    LoginCacheConfirm(navigation) {
        if(this.state.loginSalvo) return <LoadingCache navigation={navigation}/>
        else return null
    }

    Load() {
        if(this.state.logar=='false'){
            return null
        }
        return (
            <LoadingHome/>
        )
    }

    render(){
        return(

            <KeyboardAvoidingView style={{ flex: 1 }}>
                {/* LOADING */}
                {this.Load()}
                {this.LoginCacheConfirm(this.props.navigation)}

                {/* BACKGROUND IMAGE */}
                <Image source={bgImage} style={styles.bgImage}></Image>
                
                <View style={styles.viewlogoUnigran}>
                    {/* IMAGEM UNIGRAN CAPITAL */}
                    <Image source={pic} style={styles.logoUnigran} resizeMode="cover"></Image>
                </View>
                
                <View style={styles.viewForm}>
                    {/* INPUT LOGIN */}
                    <TextInput  
                        keyboardType={"numeric"}
                        style={styles.input}
                        autoCorrect={false}
                        onChangeText={(login) => this.setState({login: login}) }
                        placeholder="RGM"
                        placeholderTextColor="#fff"
                    ></TextInput>

                    {/* INPUT SENHA */}
                    <TextInput
                        //autoCompleteType="password" 
                        style={styles.input}
                        autoCorrect={false}
                        onChangeText={(password) => this.setState({password: password}) }
                        secureTextEntry={true}
                        placeholder="Senha"
                        placeholderTextColor="#fff"
                    />

                    {/* BOTÃO DE LOGIN */}
                    <TouchableOpacity
                        style={styles.botaoLogin}
                        onPress={()=>{
                            this.logar(this.props.navigation)
                        }}
                    >
                        <Text style={styles.textBotaoLogin}>Acessar</Text>
                    </TouchableOpacity>

                    {/* RECUPERAR SENHA */}
                    <TouchableOpacity
                        style={styles.botaoRecuperarSenha}
                        onPress={()=>{
                            recuperarSenha(this.props.navigation)
                        }}
                    >
                        <Text style={styles.textBotaoRecuperarSenha}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
       
}
