import React, {Component} from 'react'
import { SafeAreaView , ScrollView, StyleSheet, View, Text } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Swiper from 'react-native-swiper'
import {getTodosAvisosGeral} from '../../../servicesRequest/avisos.service'
import Loading from '../../compartilhados/loading.js'

MaterialIcons.loadFont();

export default class HomeHorario extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        avisos:[],
        avisoSelect:1,
        img:{uri:'https://www.unigran.br/campogrande/appUnigran/imagens/load5.gif'},
    }
    
    async UNSAFE_componentWillMount() {
        var parametros = {
            grds:'',
            turmas:'',
            series:'',
            crss:'',
        }
        global.dadosUsuario.matriculas.forEach(element => {
            parametros.grds = parametros.grds + `#${element.gradeId}`
            parametros.turmas = parametros.turmas + `#${element.turma}`
            parametros.series = parametros.series + `#${element.serie}`
            parametros.crss = parametros.crss + `#${element.cursoId}`
        });
        let idAluno = global.dadosUsuario.informacoes.idAluno
        
        parametros.grds = parametros.grds.replace('#','')
        parametros.turmas = parametros.turmas.replace('#','')
        parametros.series = parametros.series.replace('#','')
        parametros.crss = parametros.crss.replace('#','')
        var meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
        getTodosAvisosGeral().then(function (res){
            var dados = res.data
            dados.forEach(element => {
                element.id = element.codigo
                element.nomeProfessor = element.professor
                let minuto = element.minuto_cadastro<10?`0${element.minuto_cadastro}`:`${element.minuto_cadastro}`
                element.dataHora = `${element.dia_cadastro} ${meses[element.mes_cadastro - 1]}, ${element.hora_cadastro}:${minuto}h`
                
                if(element.aviso.length>500){
                    element.aviso = element.aviso.substring(0, 500);
                    element.aviso = element.aviso + '...'
                }
                element.informacao = element.aviso
            });
            if(dados.length!=0){
                this.setState({ avisos: dados });
            }else{
                this.setState({ avisos: 'vazio' });
            }
            
        }.bind(this)).catch(function (e){
            console.log(e)
        })
    }

    Avisos(aviso,index){
        return(
            <View key={index} style={stylesAvisos.aviso}>
                <View style={stylesAvisos.remetente}>
                    <View style={stylesAvisos.remetenteTextos}>
                        <Text style={stylesAvisos.destinatarioEncaminhados}><Text style={stylesAvisos.encaminhado}>Professor(a):</Text> {aviso.nomeProfessor}</Text>
                        <Text style={stylesAvisos.destinatarioEncaminhados}><Text style={stylesAvisos.encaminhado}>Destinado:</Text> {aviso.destino}</Text>
                    </View>
                </View>
                <SafeAreaView>
                    <ScrollView style={stylesAvisos.destinatario}>
                        <Text style={stylesAvisos.destinatarioTitulo}>{aviso.titulo}</Text>
                        <Text style={stylesAvisos.destinatariodataHora}>{aviso.dataHora}</Text>
                        <Text style={stylesAvisos.destinatarioInformacao}><Text style={stylesAvisos.encaminhado}>Aviso:</Text> {aviso.informacao}</Text>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }

    render(){
        if(this.state.avisos=='vazio'){
            return(
                <View style={stylesAvisos.vazio}>
                    <Text>Nenhum aviso localizado.</Text>
                </View>
            )
        }else if(this.state.avisos.length==0){
            return <Loading/>
        }else{
            return (
                <View style={stylesAvisos.containerAvisos}>
                    {/* Avisos */}
                    <View style={stylesAvisos.relative}>
                        <Swiper 
                            paginationStyle={{bottom:0}}
                            showsButtons={true}
                            autoplay={true}
                            height={300}
                            autoplayTimeout={10}
                            showsButtons={true}
                            buttonWrapperStyle={{width:'110%',left:'-5%', paddingHorizontal: 0}}
                            nextButton={
                                <View style={stylesAvisos.botaoRight}>
                                    <View style={stylesAvisos.bordaIcone}>
                                        <MaterialIcons style={stylesAvisos.icone} name="forward"/>
                                    </View>
                                </View>
                            }
                            prevButton={
                                <View style={stylesAvisos.botaoLeft}>
                                    <View style={stylesAvisos.bordaIcone}>
                                        <MaterialIcons style={stylesAvisos.icone} name="forward"/>
                                    </View>
                                </View>
                            }
                        >
                            {
                                this.state.avisos.map((aviso, index) =>{
                                    return this.Avisos(aviso,index)
                                })
                            }
                        </Swiper>
                    </View>
                </View>
            );
        }
    }
}

const stylesAvisos = StyleSheet.create({
    //Container global Horário
    relative:{
        display:'flex',
        flexDirection:'row',
    },
    containerAvisos:{
        margin:0,
        marginBottom:0,
        position:'relative',
    },
    botaoRight:{
        right:10,
        backgroundColor:'rgb(109,161,212)',
        width:30,
        height:30,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center',
        elevation:5,
    },
    botaoLeft:{
        left:10,
        backgroundColor:'rgb(109,161,212)',
        width:30,
        height:30,
        transform: [{ rotate: "180deg" }],
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center',
        elevation:5,
    },
    bordaIcone:{
        backgroundColor:'#fff',
        width:20,
        height:20,
        borderRadius:50,
    },
    icone:{
        color:'rgb(109,161,212)',
        fontSize:20,
    },

    //Card de aviso individual
    aviso:{
        backgroundColor:'#f2f2f2',
        borderColor:'rgba(45,45,45,.5)',
        borderRadius:5,
        borderWidth:1,
        height:'95%',
        padding:10,
        paddingLeft:10,
        paddingRight:10,
        margin:2,
    },

    //Remetente
    remetente:{
        display:'flex',
        flexDirection:'row',
        borderBottomColor:'#bbb',
        //borderBottomWidth:1,
        paddingBottom:0,
    },
    remetenteImagem:{
        width:75,
        height:75,
        borderRadius:50,
        marginRight:15,
    },
    remetenteTextos:{
        justifyContent:'flex-end',
        marginBottom:0,
    },
    nomeProfessor:{
        fontSize:16,
        color:'#222'
    },
    nomeMateria:{
        fontSize:16,
        color:'#777'
    },

    //Destinatario
    destinatario:{
        padding:10,
        paddingBottom:5,
        backgroundColor:'#fff',
    },
    destinatarioTitulo:{
        fontSize:17,
        color:'#222',
        borderRadius:5,
        textAlign:'center',
        backgroundColor:'rgba(150,150,180,.5)'
    },
    destinatarioEncaminhados:{
        fontSize:16,
        color:'#777',
        marginBottom:8,
    },
    destinatarioInformacao:{
        fontSize:15,
        color:'#777',
        marginLeft:5,
        marginRight:5,
        marginBottom:5,
    },
    destinatariodataHora:{
        fontSize:14,
        color:'#444',
        marginBottom:5,
        textAlign:'center'
    },
    encaminhado:{
        color:'#222',
    },
    vazio:{
        alignItems:'center',
    } 
});