import React, {Component} from 'react'
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {getTodasFaltas} from '../../../servicesRequest/faltas.service'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Loading from '../../compartilhados/loading.js'
import { LinearGradient } from "expo-linear-gradient";

MaterialIcons.loadFont();

export default class HomeHorario extends Component{
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        navigation:'',
    };

    state = {
        disciplinas:[],
        loading:true,
    }

    async UNSAFE_componentWillMount() {
        var dados={matriculas:[]}
        this.setState({ loading: true });
        global.dadosUsuario.matriculas.forEach(element => {
            dados.matriculas.push(element.matricula.toString())
        });
        getTodasFaltas({'matriculas':dados}).then(function (res){
            
            res.data.forEach(element => {
                var porcentagem = (element.faltas_obtidas*100)/element.maximo_faltas
                element.porcentagem = `${porcentagem}%`
                if(porcentagem < 25){
                    element.color = '#79b279'
                }else if(porcentagem <= 50){
                    element.color = '#ffe8a4'
                }else if(porcentagem <= 100){
                    element.color = '#f8877f'
                }else{
                    element.color = '#7f8c8d'
                }
            });
            this.setState({ disciplinas: res.data });
            this.setState({ loading: false });
        }.bind(this)).catch(function (e){
            this.setState({ loading: false });
            Alert.alert('Ops, houve um erro ao carregar suas faltas')
            console.log(e)
        })
    }

    render(){
        if(this.state.loading){
            return <Loading/>
        }else{
            if(this.state.disciplinas.length>0){
                return (
                    <View style={stylesdisciplina.viewContainer}>
                        {
                            this.state.disciplinas.map((disciplina, index) =>{
                                return  <View style={stylesdisciplina.viewDisciplina} key={"disciplina-"+index.toString()}>
                                            <View style={stylesdisciplina.viewTexto}>
                                                <Text style={stylesdisciplina.viewTextoDisciplina}>{disciplina.disciplina}</Text>
                                            </View>
                                            <LinearGradient
                                                colors={['#d8d8d8','#f2f2f2','#d8d8d8']}
                                                style={{ flex: 1, borderRadius:5 }}
                                                start={{ x: 1, y: 1 }}
                                                end={{ x: 1, y: 0 }}
                                            > 
                                                <View style={stylesdisciplina.viewBarras}>
                                                    <View style={{
                                                                    height:20,
                                                                    //marginTop:-1,
                                                                    width:disciplina.porcentagem,
                                                                    backgroundColor:disciplina.color,
                                                                    borderTopLeftRadius:5,
                                                                    borderBottomLeftRadius:5,
                                                                    borderTopRightRadius:3,
                                                                    borderBottomRightRadius:3,
                                                                }}>
                                                    </View>
                                                    <TouchableOpacity
                                                        style={{marginLeft:10,position:'absolute'}}
                                                        onPress={() => this.props.navigation.navigate('Faltas')}
                                                    >
                                                        <Text style={stylesdisciplina.viewTextoFaltas}>{disciplina.faltas_obtidas}/{disciplina.maximo_faltas}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </LinearGradient>
                                        </View>
                            })
                        }
                    </View>
                );
            }else{
                return(
                    <View>
                        <Text style={{textAlign:'center'}}>Nenhuma falta localizada</Text>
                    </View>
                )
            }
        }
    }
}

const stylesdisciplina = StyleSheet.create({
    viewContainer:{
        borderLeftWidth:2,
        borderBottomWidth:2,
        borderColor:'#aaa',
        padding:5,
        paddingLeft:3,
    },

    //Conteudo de uma disciplina
    viewDisciplina:{
        marginBottom:15,
    },

    //Row definida para texto
    viewTexto:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-end'
    },
    viewTextoDisciplina:{
        width:'85%',
        fontSize:16,
        color:'#444',
        paddingLeft:3,
    },
    viewTextoFaltas:{
        fontSize:16,
        color:'#fff',
    },
    //Row definida para as barras
    viewBarras:{
        display:'flex',
        flexDirection:'row',
        position:"relative",
        height:20,
        width:'100%',
        borderRadius:5,
        borderColor:'#aaa',
    },

});