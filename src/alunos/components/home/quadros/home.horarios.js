import React, {Component} from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import {getHorarioDoDia} from '../../../servicesRequest/horario.service'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialIconsFontAwesome from 'react-native-vector-icons/FontAwesome'
import Loading from '../../compartilhados/loading.js'

export default class HomeHorario extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        horarios:[],
    }
    
    

    async UNSAFE_componentWillMount() {
        let dia = new Date().getDay()+1
        var dados={contratos:[]}
        global.dadosUsuario.matriculas.forEach(element => {
            dados.contratos.push(element.contrato.toString())
        });
        getHorarioDoDia({'contratos':dados},`${dia}`).then(function (res){
            let dados = res.data
            dados.forEach(element => {
                let hora_aula = element.hora_inicio_aula.split(' ')[1].split(':')
                hora_aula = `${hora_aula[0]}:${hora_aula[1]}`
                element.hora_aula = hora_aula
            });
            if(dados.length==0){
                this.setState({ horarios: 'vazio' });
            }else{
                this.setState({ horarios: dados });
            }
            
        }.bind(this)).catch(function (e){
            Alert.alert('Ops, houve um erro ao carregar seus horários')
            console.log(e)
        })
    }

    render(){
        if(this.state.horarios.length==0){
            return <Loading/>
        }else if(this.state.horarios == 'vazio'){
            return(
                <View style={stylesHorarios.vazio}>
                    <Text>Nenhum horário localizado para o dia de hoje.</Text>
                </View>
            )
        }else{
            return (
                <View>
                    {
                        this.state.horarios.map((horario, index) =>{
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
                                                {/* <MaterialIcons name="adjust" style={stylesHorarios.iconeColaborador}/> */}
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
}

const stylesHorarios = StyleSheet.create({
    //Container global Horário
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