import React, {Component} from 'react'
import { Linking, TouchableOpacity, RefreshControl, ScrollView, StyleSheet, View, Text, SafeAreaView } from 'react-native'
import Loading from '../compartilhados/loading.js'
import { codigosClasssroom } from '../../servicesRequest/classroom.service'

export default class CodigosClassroom extends Component{
    constructor(props) {
        super(props);
        this.state = {
            codigosClassroom:[],
            loading: false,
            refreshing: false
        }
    }

    async UNSAFE_componentWillMount() {
        this.iniciar()
    }

    iniciar(){
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);

        var dados = {rgms:[]}
        this.setState({ codigosClassroom: [] });
        this.setState({ loading: true });
        global.dadosUsuario.matriculas.forEach(element => {
            dados.rgms.push(element.rgm.toString())
        });
        codigosClasssroom(dados).then(res=>{
            this.setState({ codigosClassroom: res.data });
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
        }else if(this.state.codigosClassroom.length==0){
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerText}>Códigos de acesso a sala do Classroom</Text>
                    </View>


                    <View style={styles.conteudoVazio}>
                        <View>
                            <Text style={styles.conteudoVazioText}>Não foram localizados turmas para este RGM.</Text>
                        </View>
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
                        <Text style={styles.headerText}>Códigos de acesso a sala do Classroom</Text>
                    </View>

                    {    
                        this.state.codigosClassroom.map((disc, index) =>{
                            return (
                                <View key={index} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.cardHeaderText}>{disc.disciplina} - {disc.serie}º {disc.turma}</Text>
                                    </View>
                                    <View style={styles.cardContent}>
                                        <TouchableOpacity style={styles.cardContentText}
                                            onPress={() => Linking.openURL(`https://classroom.google.com/u/0/h`)}
                                        >
                                            <Text style={styles.bold}>Código Classroom: </Text>
                                            <Text style={styles.cardContentTextCodigo}>{disc.classroom}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            )
        }

    }
}
const styles = StyleSheet.create({
    container:{
        paddingBottom:0,
        marginBottom:55,
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
        textAlign:'center'
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
        margin:10,
        marginBottom:0,
    },
    dadosContato:{
        textAlign:'left',
        padding:5,
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
        fontWeight:'600',
        paddingRight:10,
    },

    /* Icones */
    inline:{
        display:'flex',
        flexDirection:'row',
        marginBottom:10,
    },
    iconeContatoMail:{
        fontSize:20,
        marginRight:5,
        color:"#ef9e2a",
    },
    iconeContatoPhone:{
        fontSize:20,
        marginRight:5,
        color:"#444",
    },
    iconeContatoRelogio:{
        alignSelf:'flex-end',
        fontSize:20,
        marginRight:3,
        color:'#126ced',
        marginBottom:5,
    },
    
    /* Horarios */
    card:{
        backgroundColor:'#fff',
        position:'relative',
        elevation:5,
        borderRadius:5,
        marginLeft:15,
        marginRight:15,
        marginTop:10,
        marginBottom:10
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
    },
    cardContentTextCodigo:{
        color:'rgb(80,135,190)',
        textDecorationLine:'underline'
    }
});