import React, {Component} from 'react';
import { Keyboard, Text, KeyboardAvoidingView, View, TextInput, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import {LoadingHome} from '../compartilhados/loading'
import {getRecuperarSenha} from '../../servicesRequest/recuperar.senha.service'

const pic = {
    uri:'https://www.unigran.br/campogrande/appUnigran/imagens/logo-unigran.png'
}

const styles = StyleSheet.create({
    
    viewlogoUnigran:{
        flex:1,
        marginTop: 50, 
        alignItems: 'center', 
        justifyContent: 'flex-start' 
    },
    logoUnigran:{
        width:120, 
        height:120,
    },
    viewForm:{
        flex: 2, 
        alignItems: 'center', 
        justifyContent: 'flex-start',
    },
    input:{
        borderBottomWidth:1,
        width:'70%', 
        height:35, 
        marginBottom:35, 
        borderRadius:5,
    },
    botaoLogin:{
        width:'75%',
        alignItems: 'center', 
    },
    textBotaoLogin:{
        backgroundColor:'rgb(0,73,124)',
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

export default class Login extends Component{    
    
    constructor(props) {
        super(props);
        this.state = {
            carregamento: false,
            cpf: '',
            rgm: '',
        }
    }


    render(){
        return(
            <KeyboardAvoidingView style={{ flex: 1 }}>
                {this.loading()}
                <View style={styles.viewlogoUnigran}>
                    {/* IMAGEM UNIGRAN CAPITAL */}
                    <Image source={pic} style={styles.logoUnigran}></Image>
                </View>

                <View style={styles.viewForm}>
                    {/* INPUT LOGIN */}
                    <TextInput  
                        keyboardType={"numeric"}
                        style={styles.input}
                        autoCorrect={false}
                        onChangeText={(rgm) => this.setState({rgm: rgm})}
                        placeholder="RGM"

                    ></TextInput>

                    {/* INPUT CPF */}
                    <TextInput
                        keyboardType={"numeric"}
                        style={styles.input}
                        autoCorrect={false}
                        onChangeText={(cpf) => this.setState({cpf: cpf})}
                        placeholder="CPF"
                    />

                    {/* BOTÃO DE LOGIN */}
                    <TouchableOpacity
                        style={styles.botaoLogin}
                        onPress={()=>{
                            this.recuperarSenha(this.props.navigation)
                        }}
                    >
                        <Text style={styles.textBotaoLogin}>Solicitar nova senha</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
    recuperarSenha(navigation){
        Keyboard.dismiss()
        if(this.state.rgm.length<4){
            Alert.alert('RGM incorreto')
        }else if(this.state.cpf.length<9){
            Alert.alert('CPF incorreto')
        }else{
            var rgm = this.state.rgm
            if(rgm.indexOf('.')>-1){

            }else{
                var stringExemplo = rgm;
                var resultado = stringExemplo.split("", 3);
                resultado = resultado[0] + resultado[1] + resultado[2] + '.' + stringExemplo.substring(3, stringExemplo.length)
                rgm = resultado
            }
            this.setState({carregamento: true})
            let parametros = {
                cpf:this.state.cpf,
                rgm:rgm,
            }
            getRecuperarSenha(parametros).then(res=>{
                Alert.alert('Senha enviada para o seu celular')
                navigation.navigate('Login')    
                this.setState({carregamento: false})
            }).catch(e=>{
                this.setState({carregamento: false})
                Alert.alert('Ops.. Ocorreu um erro, tente novamente.')
            })
        }
    }

    loading(){
        if(this.state.carregamento){
            return <LoadingHome/>
        }else{
            return null
        }
    }
}
