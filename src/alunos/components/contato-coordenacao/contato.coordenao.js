import React, {Component} from 'react'
import { Linking, TouchableOpacity, RefreshControl, ScrollView, StyleSheet, View, Text, SafeAreaView } from 'react-native'
import MaterialIconsFont from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Loading from '../compartilhados/loading.js'
import { informacoesContato } from '../../servicesRequest/coordenacao.service'

export default class CodigosClassroom extends Component{
    constructor(props) {
        super(props);
        this.state = {
            coordenacao:'',
            loading: false,
            refreshing: false,
            diaSemana:['Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-feira','Sábado']
        }
    }

    async UNSAFE_componentWillMount() {
        this.iniciar()
    }

    iniciar(){
        this.setState({ coordenacao: '' });
        this.setState({ loading: true });
        informacoesContato().then(res=>{
            var horarios = {
                segunda:[],
                terca:[],
                quarta:[],
                quinta:[],
                sexta:[],
                sabado:[]
            }
            Object.keys(res.data[0].horariosCoordenacao).forEach(element => {
                if(res.data[0].horariosCoordenacao[element].diaSemana=='Segunda-Feira'){
                    horarios.segunda.push(res.data[0].horariosCoordenacao[element])
                }
                else if(res.data[0].horariosCoordenacao[element].diaSemana=='Terça-Feira'){
                    horarios.terca.push(res.data[0].horariosCoordenacao[element])
                }
                else if(res.data[0].horariosCoordenacao[element].diaSemana=='Quarta-Feira'){
                    horarios.quarta.push(res.data[0].horariosCoordenacao[element])
                }
                else if(res.data[0].horariosCoordenacao[element].diaSemana=='Quinta-Feira'){
                    horarios.quinta.push(res.data[0].horariosCoordenacao[element])
                }
                else if(res.data[0].horariosCoordenacao[element].diaSemana=='Sexta-Feira'){
                    horarios.sexta.push(res.data[0].horariosCoordenacao[element])
                }
                else if(res.data[0].horariosCoordenacao[element].diaSemana=='Sábado'){
                    horarios.sabado.push(res.data[0].horariosCoordenacao[element])
                }
            });

            res.data[0].horariosCoordenacao = []
            Object.keys(horarios).forEach(element => {
                res.data[0].horariosCoordenacao.push(horarios[element])
            })
            this.setState({ coordenacao: res.data[0] });
            this.setState({ loading: false });
        }).catch(e=>{
            this.setState({ loading: false });
            console.log(e)
        })
    }

    _onRefresh = () => {
        this.iniciar()
    }

    render(){
        if(this.state.loading){
            return <Loading/>
        }else if(this.state.coordenacao==''){
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.headerContent}>
                        <MaterialIcons name="people" size={30} color={'#222'} />
                        <Text style={styles.headerText}>Coordenação de curso</Text>
                    </View>

                    <View style={styles.conteudoVazio}>
                        <Text style={styles.conteudoVazioText}>Não foram localizadas as informações da coordenação do curso.</Text>
                    </View>
                </SafeAreaView>
            )
        }else{
            return(
                <ScrollView style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <View style={styles.headerContent}>
                        <MaterialIcons name="people" size={30} color={'#222'} />
                        <Text style={styles.headerText}>Coordenação de curso</Text>
                    </View>
                    
                    <View style={styles.content}>
                        {/* Informações de contato */}
                        <View>

                            <View style={styles.inline}>
                                <MaterialIconsFont name='user-o' style={styles.iconeContatoUser}/>
                                <Text style={styles.dadosContato}>{this.state.coordenacao.coordenador}</Text>
                            </View>

                            <TouchableOpacity style={styles.inline}
                                onPress={() => Linking.openURL(`tel:+55673389${this.state.coordenacao.ramal}`)}
                            >
                                <MaterialIconsFont name='phone' style={styles.iconeContatoPhone}/>
                                <Text style={styles.dadosContatoUnderline}>(67) 3389-{this.state.coordenacao.ramal}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.inline}
                                onPress={() => Linking.openURL(`mailto:${this.state.coordenacao.email}`)}
                            >
                                <MaterialIconsFont name='envelope-o' style={styles.iconeContatoMail}/>
                                <Text style={styles.dadosContatoUnderline}>{this.state.coordenacao.email}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.inline}
                                onPress={() => Linking.openURL(`${this.state.coordenacao.linkLattes}`)}
                            >
                                <MaterialIconsFont name='vcard-o' style={styles.iconeContatoLattes}/>
                                <Text style={styles.dadosContatoUnderline}>{this.state.coordenacao.linkLattes}</Text>
                            </TouchableOpacity>

                            <View style={styles.inlineHorarios}>
                                <MaterialIcons name="query-builder" style={styles.iconeContatoRelogio}/> 
                                <Text style={styles.dadosContato}><Text style={styles.bold}>Horários de atendimento:</Text></Text>
                                
                            </View>
                            <View style={styles.inlineHorarios}>
                                <Text style={styles.dadosContatoConfirmar}><Text style={styles.danger}>* </Text>Confirmar disponibilidade de atendimento da coordenação via telefone ou e-mail.</Text>
                            </View>
                        </View>


                        {/* Horários de atendimento */}
                    
                        {    
                            this.state.coordenacao.horariosCoordenacao.map((dia, index) =>{
                                //console.log(dia)
                                return (
                                    <View key={index} style={styles.card}>
                                        <View style={styles.cardHeader}>
                                            <Text style={styles.cardHeaderText}>{this.state.diaSemana[index]}</Text>
                                        </View>
                                        <View style={styles.cardContent}>
                                            {
                                                dia.map((horarios,index) =>{
                                                    return (
                                                        <View key={'horario-'+index} style={styles.cardContentText}>
                                                            <Text>{horarios.horaInicio} Hs.</Text>
                                                            <Text>ás</Text>
                                                            <Text>{horarios.horaFim} Hs.</Text>
                                                        </View>
                                                    )
                                                })

                                            }
                                        </View>
                                    </View>
                                )
                            })
                        }
                    
                    </View>

                </ScrollView>
            )
        }

    }
}
const styles = StyleSheet.create({
    container:{
        paddingBottom:0,
        marginBottom:0,
    },
    content:{
        padding:15,
    },  
    //Cabeçalho da página
    headerContent:{
        marginTop:10,
        marginBottom:5,
        padding:2,
        justifyContent:'center',
        elevation:3,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff'
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

    //Conteudo da Página
    conteudoVazio:{
        borderRadius:5,
        margin:15,
        marginBottom:0,
    },
    conteudoVazioText:{
        textAlign:'center',
        padding:5,
    },

    //Conteudo da Página
    conteudo:{
        borderRadius:5,
        margin:15,
        marginBottom:0,
    },
    dadosContato:{
        textAlign:'left',
        padding:5,
    },
    dadosContatoUnderline:{
        textAlign:'left',
        padding:5,
        textDecorationLine:'underline'
    },
    dadosContatoConfirmar:{
        marginBottom:5,
        paddingLeft:5,
        paddingRight:5,
        fontSize:12,
    },

    /* Versãok do App */
    versaoApp:{
        textAlign:'left',
        padding:5,
    },
    infoAtualizarVersao:{
        textAlign:'left',
        padding:5,
        marginTop:0,
        color:'#c44',
    },
    infoAtualizado:{
        textAlign:'left',
        paddingLeft:5,
    },

    /* Globais */
    bold:{
        fontWeight:'700',
        paddingRight:10,
    },

    /* Icones */
    inline:{
        display:'flex',
        flexDirection:'row',
        marginBottom:8,
    },
    inlineHorarios:{
        display:'flex',
        flexDirection:'row',
        marginBottom:0,
    },
    iconeContatoMail:{
        fontSize:20,
        marginRight:5,
        marginTop:5,
        color:"#ef9e2a",
    },
    iconeContatoLattes:{
        fontSize:20,
        marginRight:5,
        color:'#222',
        marginTop:5
    },
    iconeContatoUser:{
        fontSize:20,
        marginRight:5,
        color:'#007ae7',
    },
    iconeContatoPhone:{
        fontSize:20,
        marginRight:5,
        color:'#222',
        marginTop:5
    },
    iconeContatoRelogio:{
        alignSelf:'flex-end',
        fontSize:20,
        marginRight:3,
        color:'green',
        marginBottom:5,
    },
    iconeContatoLattes:{
        alignSelf:'flex-end',
        fontSize:20,
        marginRight:3,
        color:'#222',
        marginBottom:5,
    },
    
    /* Horarios */
    card:{
        backgroundColor:'#fff',
        position:'relative',
        elevation:5,
        borderRadius:5,
        marginTop:0,
        marginBottom:15,
    },
    cardHeader:{
        backgroundColor:'rgb(50,108,165)',
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
        padding:2,
        paddingLeft:5,
    },
    cardHeaderText:{
        color:'#fff',
        fontWeight:'700'
    },
    cardContent:{
        padding:5,
    },
    cardContentText:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        borderBottomWidth:1,
        borderColor:'#ccc'
    },
    cardContentTextCodigo:{
        color:'rgb(80,135,190)',
        textDecorationLine:'underline'
    },
    danger:{
        color:'rgb(150,45,45)'
    }
});