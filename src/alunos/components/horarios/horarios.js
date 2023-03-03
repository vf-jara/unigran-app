import React, {Component} from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet, RefreshControl } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialIconsFontAwesome from 'react-native-vector-icons/FontAwesome'
import Loading from '../compartilhados/loading.js'
import { getHorarioDaSemana } from '../../servicesRequest/horario.service'

export default class Horarios extends Component{
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            horarios:[],
            dias: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
        };
    }

    //FUNÇÕES
    //Ciclo de vida - Criação da página
    async UNSAFE_componentWillMount() {
        this.iniciar()
    }
    //Function para chamar reload dos dados
    _onRefresh = () => {
        this.iniciar()
    }
    //Carregamento dos dados da API
    iniciar(){
        this.setState({ horarios: [] });
        var dados={contratos:[]}
        global.dadosUsuario.matriculas.forEach(element => {
            dados.contratos.push(element.contrato.toString())
        });
        getHorarioDaSemana({'contratos':dados}).then(function (res){
            res.data.forEach(dias => {
                dias.horario.forEach(horario => {
                    let hora_aula = horario.hora_inicio_aula.split(' ')[1].split(':')
                    hora_aula = `${hora_aula[0]}:${hora_aula[1]}`
                    horario.hora_aula = hora_aula
                })
            });
            this.setState({ horarios: res.data });
        }.bind(this)).catch(function (e){
            Alert.alert('Ops, houve um erro ao carregar seus horários.')
            console.log(e)
        })
    }

    //RENDERIZAÇÃO DE COMPONENTES
    //Cards
    cardHorarios(horarios){
        return(
            <View style={stylesHorarios.card}>
                <View style={stylesHorarios.cardHeader}>
                    <MaterialIcons name='event-note' style={stylesHorarios.cardHeaderIcon}/>
                    <Text style={stylesHorarios.cardHeaderText}>{this.state.dias[horarios.dia - 1 ]}</Text>
                </View>
                <View style={stylesHorarios.cardHorarios}>
                    {this.horarios(horarios.horario)}
                </View>
            </View>
        )
    }
    //Horários dentro dos Cards
    horarios(horarios){
        if(horarios.length==0){
            return(     
                <View style={stylesHorarios.vazio}>
                    <Text>Não existem horários para este dia.</Text>
                </View>
            )
        }else{
            return (
                <View>
                    {
                        horarios.map((horario, index) =>{
                            return  <View style={stylesHorarios.containerHorario} key={"horario-"+index.toString()}>
                                        <View style={stylesHorarios.horario}>
                                            <MaterialIcons name="query-builder" style={stylesHorarios.iconeRelogio}/>
                                            <Text style={stylesHorarios.textHorario}>{horario.hora_aula}</Text>
                                        </View>

                                        <View style={stylesHorarios.viewInformacao}>
                                            <View>
                                                <Text style={stylesHorarios.disciplina}>{horario.disciplina}</Text>
                                            </View>
                                            <View style={stylesHorarios.viewInformacaoColaborador}>
                                                <MaterialIconsFontAwesome name="user-o" style={stylesHorarios.iconeColaborador}></MaterialIconsFontAwesome>
                                                <Text style={stylesHorarios.colaborador}>{horario.colaborador}</Text>
                                            </View>
                                        </View>
                                    </View>
                        })
                    }
                </View>
            );
        }
    }
    

    render(){
        if(this.state.horarios.length==0){
            return <Loading/>
        }else{
            return(
                <SafeAreaView style={stylesHorarios.container}>
                    <View style={stylesHorarios.headerContent}>
                        <MaterialIcons name='query-builder' style={stylesHorarios.headerIcon}/>
                        <Text style={stylesHorarios.headerText}>Seus Horários</Text>
                    </View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        data={this.state.horarios}
                        renderItem={({item}) => this.cardHorarios(item)}
                        keyExtractor={item => `${item.dia}`}
                    />
                </SafeAreaView>
            )
        }
    }
}

const stylesHorarios = StyleSheet.create({
    container:{
        paddingBottom:50
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

    //Cards
    card:{
        padding:10,
    },
    cardHeader:{
        backgroundColor:'rgb(0,109,190)',
        
        borderTopEndRadius:5,
        borderTopLeftRadius:5,
        flexDirection:'row',
        padding:2,
        elevation:5,
        alignItems:'center'
    },
    cardHeaderText:{
        color:'#fff',
        fontSize:20,
    },
    cardHeaderIcon:{
        color:'#fff',
        fontSize:20,
        marginRight:5,
        marginLeft:5,
    },

    cardHorarios:{
        backgroundColor:'#fff',
        padding:10,
        borderBottomEndRadius:5,
        borderBottomLeftRadius:5,
        elevation:5,
    },

    containerHorario:{
        marginBottom:10
    },

    //Row Relógio
    horario:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    iconeRelogio:{
        fontSize:17,
        color:'#ef9e2a',
        marginRight:5,
    },
    textHorario:{
        fontSize:18,
        color:'#888',
    },

    //View informações
    viewInformacao:{
        borderLeftWidth:2,
        borderColor:'#aaa',
        marginLeft:7,
        paddingLeft:10,
    },

    disciplina:{
        fontSize:17,
        color:'#444',
    },

    viewInformacaoColaborador:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    iconeColaborador:{
        fontSize:16,
        marginRight:5,
        color:'#007ae7',
    },
    colaborador:{
        fontSize:16,
        color:'#aaa',
    },
    vazio:{
        alignItems:'center',
    }
});