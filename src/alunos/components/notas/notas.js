import React, {Component} from 'react'
import { ScrollView, Alert, StyleSheet, View, Text, SafeAreaView, RefreshControl } from 'react-native'
import {getNotasSemestre} from '../../servicesRequest/notas.service'
import MaterialIcons from 'react-native-vector-icons/FontAwesome'
import Loading from '../compartilhados/loading.js'

export default class HomeHorario extends Component{
    constructor(props) {
        super(props);
        this.state = {
            notas:[],
        }
    }
    
    async UNSAFE_componentWillMount() {
        this.iniciar()
    }

    _onRefresh = () => {
        this.iniciar()
    }

    iniciar(){
        this.setState({ notas: [] });
        let dia = new Date().getDay()
        var dados={matriculas:[]}
        global.dadosUsuario.matriculas.forEach(element => {
            dados.matriculas.push(element.matricula.toString())
        });
        getNotasSemestre({'matriculas':dados},`${dia}`).then(function (res){
            try {
                var todas = []
                res.data.normais.forEach(element => {
                    todas.push(element)
                });
                res.data.outras.forEach(element => {
                    todas.push(element)
                });
                res.data.normais = todas
                this.setState({ notas: res.data });
            } catch (error) {
                Alert.alert('Ops, houve um erro ao carregar suas notas')
                console.log(error)
            }
        }.bind(this)).catch(function (e){
            Alert.alert('Ops, houve um erro ao carregar suas notas')
            console.log(e)
        })
    }

    Disciplinas(disciplina){
        return(
            <View style={stylesNotas.disciplinasContainer} key={"disciplina-"+disciplina.disciplina}>
                <View style={stylesNotas.discHeader2}>
                    <Text style={stylesNotas.discHeaderText}>{disciplina.disciplina}</Text>
                </View>
                <View style={stylesNotas.discDados2}>
                    <View style={stylesNotas.discbox1}>
                        <Text style={stylesNotas.discDadosTitulo}>P1</Text>
                        <Text style={stylesNotas.discDadosText}>{disciplina.p1?disciplina.p1:'-'}</Text>
                    </View>
                    <View style={stylesNotas.discbox1}>
                        <Text style={stylesNotas.discDadosTitulo}>P2</Text>
                        <Text style={stylesNotas.discDadosText}>{disciplina.p2?disciplina.p2:'-'}</Text>
                    </View>
                    <View style={stylesNotas.discbox1}>
                        <Text style={stylesNotas.discDadosTitulo}>SUB.</Text>
                        <Text style={stylesNotas.discDadosText}>{disciplina.subst?disciplina.subst:'-'}</Text>
                    </View>
                    <View style={stylesNotas.discbox1}>
                        <Text style={stylesNotas.discDadosTitulo}>EX.</Text>
                        <Text style={stylesNotas.discDadosText}>{disciplina.exame?disciplina.exame:'-'}</Text>
                    </View>
                    <View style={stylesNotas.discbox2}>
                        <Text style={stylesNotas.discDadosTitulo}>SITUAÇÃO</Text>
                        <Text style={disciplina.resultado=='R'?stylesNotas.discDadosTextRep:stylesNotas.discDadosTextAp}>{disciplina.resultado=='R'?'Reprovado':'Aprovado'}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render(){
        if(this.state.notas.length==0){
            return <Loading/>
        }else{
            return (
                <SafeAreaView style={stylesNotas.container}>
                    <View style={stylesNotas.headerContent}>
                        {/* <MaterialIcons name='list-alt' style={stylesNotas.headerIcon}/> */}
                        <MaterialIcons style={stylesNotas.headerIcon} name="bar-chart" />
                        <Text style={stylesNotas.headerText}>Suas notas</Text>
                    </View>

                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        {
                            this.state.notas.normais.map(function(item,index){
                                return (
                                    <View key={index}>
                                        {this.Disciplinas(item)}
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

const stylesNotas = StyleSheet.create({
    container:{
        marginBottom:50
    },
    //Cabeçalho da página
    headerContent:{
        marginTop:10,
        marginBottom:5,
        backgroundColor:"#fff",
        padding:2,
        justifyContent:'center',
        elevation:3,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    headerIcon:{
        color:'#222',
        fontSize:20,
        marginRight:10,
    },
    headerText:{
        color:'#222',
        fontSize:20,
    },

    //Grupo de disciplinas
    disciplinasContainer:{
        backgroundColor:'#fff',
        overflow:'hidden',
        elevation:3,
        borderColor:'rgba(45,45,45,.25)',
        borderRadius:5,
        margin:10,
        marginBottom:15,
    },
    disciplinasHeader:{
        backgroundColor:'#007ae7',
        borderColor:'#222',
    },
    disciplinasHeaderText:{
        color:'#fff',
        fontSize:18,
        padding:3,
        paddingLeft:15,
        letterSpacing:1,
    },
    disciplinasHeaderTextVazio:{
        textAlign:'center',
        padding:2,
    },
    disciplinas:{
        padding:15,
        paddingBottom:0,
    },

    //Disciplina específica
    disc:{
        borderWidth:1,
        borderColor:'#aaa'
    },
    disc2:{
        borderWidth:1,
        borderColor:'#aaa'
    },    
    discHeader:{    
        padding:5,
        paddingLeft:10,
        backgroundColor:'#330066',
    },
    discHeader2:{    
        padding:4,
        paddingLeft:10,
        backgroundColor:'rgb(0,109,206)',
    },
    discHeaderText:{    
        color:'#fff',
    },
    discDados:{
        backgroundColor:'#ddd',
        display:'flex',
        flexDirection:'row',
    },
    discDados2:{
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'row',
    },
    discbox1:{
        paddingTop:5,
        paddingBottom:5,
        width:'18%',
        borderRightWidth:1,
        borderRightColor:'#aaa',
    },
    discbox2:{
        paddingTop:5,
        paddingBottom:5,
        width:'28%',
    },
    discDadosTitulo:{
        textAlign:'center',
        paddingLeft:5,
        color:'#656565'
    },
    discDadosText:{
        textAlign:'center',
        marginTop:5,
        marginBottom:5,
    },
    discDadosTextRep:{
        marginTop:5,
        marginBottom:5,
        textAlign:'center',
        color:'rgb(180,45,45)',
    },
    discDadosTextAp:{
        marginTop:5,
        marginBottom:5,
        textAlign:'center',
        color:'rgb(45,180,45)',
    }
});