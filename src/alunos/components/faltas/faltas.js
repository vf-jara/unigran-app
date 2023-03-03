import React, {Component} from 'react'
import { ScrollView, Alert, StyleSheet, View, Text, SafeAreaView, RefreshControl, FlatList } from 'react-native'
import { getTodasFaltas, getTodosDias, getTodosDetalhes } from '../../servicesRequest/faltas.service'
import MaterialIcons from 'react-native-vector-icons/FontAwesome'
import Loading from '../compartilhados/loading.js'
import { LinearGradient } from "expo-linear-gradient";

export default class HomeHorario extends Component{
    constructor(props) {
        super(props);
        this.state = {
            disciplinas:[],
            loading: true,
        }
    }

    async UNSAFE_componentWillMount() {
        this.iniciar()
    }

    _onRefresh = () => {
        this.iniciar()
    }

    iniciar(){
        this.setState({ loading: true });
        this.setState({ disciplinas: [] });
        var dados={matriculas:[]}
        global.dadosUsuario.matriculas.forEach(element => {
            dados.matriculas.push(element.matricula.toString())
        });
        
        getTodasFaltas({'matriculas':dados}).then(function (res){
            //console.log(res.data)
            var meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
            var result = [] 
            if(res.data.length==0){
                this.setState({ loading: false });
                return
            }
            res.data.forEach(element => {
                //console.log(global.dadosUsuario.matriculas[0].cursoNome)
                var camada1 = { 
                    id:             element.mdc_id,
                    disciplina:     element.disciplina,
                    rgm:            '',
                    curso:          global.dadosUsuario.matriculas[0].cursoNome,
                    nome_aluno:     global.dadosUsuario.informacoes.nome,
                    total_aulas:    element.maximo_faltas,
                    porcentagem:    0,
                    total_faltas:   element.faltas_obtidas,    
                    faltas:         [],
                    color:          '',
                }

                var porcentagem = (element.faltas_obtidas*100)/element.maximo_faltas
                var porcentagem = (element.faltas_obtidas*100)/element.maximo_faltas
                
                element.porcentagem = `${porcentagem}%`
                
                if(porcentagem < 25){
                    //element.color = '#428bca'//79b279
                    camada1.color = '#79b279'//79b279
                }else if(porcentagem <= 50){
                    camada1.color = '#ffe8a4'
                }else if(porcentagem <= 100){
                    camada1.color = '#f8877f'
                }else{
                    camada1.color = '#7f8c8d'
                }
                
                camada1.porcentagem = `${porcentagem}%`
                result.push(camada1)
                getTodosDias(element.mdc_id).then(resDias=>{
                    resDias.data.forEach(elementDias => {
                        let data = elementDias.data_hora_registro_falta.split(' ')[0]
                        //console.log(elementDias)
                        getTodosDetalhes(element.mdc_id,data).then(resDetalhes=>{  
                            camada1.professor = resDetalhes.data[0].docente
                            let detalhes ={
                                data_falta:elementDias.data_hora_registro_falta.split(' ')[0],
                                conteudo:resDetalhes.data[0].descricao,
                            }
                            detalhes.data_falta = `${detalhes.data_falta.split('-')[2]} ${meses[detalhes.data_falta.split('-')[1] - 1]}`
                            camada1.faltas.push(detalhes)
                            this.setState({ loading: false });
                            this.setState({ disciplinas: result });
                        })
                    });
                })
            });
            
        }.bind(this)).catch(function (e){
            Alert.alert('Ops, houve um erro ao carregar suas faltas')
            console.log(e)
        })
    }

    falta(falta){
        return falta.map((falta, index) =>{
            return (
                <View key={index} style={styles.falta}>
                    <MaterialIcons name='calendar' style={styles.faltaIcone}/>
                    <View style={styles.faltaConteudo}>
                        <Text style={styles.faltaData}>{falta.data_falta}</Text>
                        <Text style={styles.faltaTexto}>{falta.conteudo}</Text>
                    </View>
                </View>
            )
        })
    }

    Disciplinas(disciplina){
        return (
            <View key={disciplina.disciplina} style={styles.disciplinasContainer}>
                <View style={styles.disc} key={"disciplina-"+disciplina.disciplina}>
                    <View style={styles.discHeader}>
                        <Text style={styles.discHeaderText}>{disciplina.disciplina}</Text>
                    </View>
                    <View style={styles.discDados}>
                        <View style={styles.discDadosPessoais}>
                            <Text style={styles.discDadosPessoaisText}><Text style={styles.discDadosPessoaisLabel}>Professor(a):</Text> {disciplina.professor}</Text>
                            <Text style={styles.discDadosPessoaisText}><Text style={styles.discDadosPessoaisLabel}>Curso:</Text> {disciplina.curso.toUpperCase()}</Text>
                        </View>
                    </View>
                    <View style={styles.viewFaltas}>
                        <Text style={styles.discDadosPessoaisLabel}>Faltas</Text>
                        <LinearGradient
                            colors={['#ccc','#f2f2f2','#ccc']}
                            style={{ flex: 1, borderRadius:5 }}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 1, y: 0 }}
                        > 
                            <View style={styles.viewBarras}>
                                <View style={{
                                    height:20,
                                    width:disciplina.porcentagem,
                                    //backgroundColor:'#79b279',
                                    backgroundColor:disciplina.color,
                                    borderTopLeftRadius:5,
                                    borderBottomLeftRadius:5,
                                    borderTopRightRadius:3,
                                    borderBottomRightRadius:3,
                                }}>
                                    <Text style={disciplina.total_faltas>0?{color:'white',paddingLeft:5}:{color:'#222',paddingLeft:5}}>
                                        {disciplina.total_faltas}/{disciplina.total_aulas}
                                    </Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                    {this.falta(disciplina.faltas)}
                </View>
            </View>
        )
    }

    render(){
        if(this.state.loading){
            return <Loading/>
        }else if(this.state.disciplinas.length==0){
            return (
                <SafeAreaView style={styles.container}>

                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        <View style={styles.headerContent}>
                            <MaterialIcons name='list-alt' style={styles.headerIcon}/>
                            <Text style={styles.headerText}>Relatório de faltas</Text>
                        </View>
                        <Text style={styles.nenhumaFalta}>
                            Nenhuma falta localizada
                        </Text>
                    </ScrollView>
                </SafeAreaView>
            )
        }else{
            //if(this.state.disciplinas.length>0){
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.headerContent}>
                        <MaterialIcons style={styles.headerIcon} name="calendar-times-o"/>
                        <Text style={styles.headerText}>Relatório de faltas</Text>
                    </View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        data={
                            this.state.disciplinas
                        }
                        renderItem={({item}) => this.Disciplinas(item)}
                        keyExtractor={item => item.disciplina}
                    />
                </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        paddingBottom:0,
        marginBottom:50,
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

    //Grupo de disciplinas
    disciplinasContainer:{
        borderRadius:5,
        margin:10,
        marginBottom:5,
    },
    disciplinasHeader:{
        /* backgroundColor:'#007ae7',
        borderColor:'#222', */
    },
    disciplinasHeaderText:{
        color:'#fff',
        fontSize:18,
        padding:4,
        paddingLeft:15,
        letterSpacing:1,
    },
    disciplinasHeaderTextVazio:{
        textAlign:'center',
        padding:5,
    },
    disciplinas:{
    },

    //Disciplina específica
    disc:{
        elevation:3,
        marginBottom:5,
        borderRadius:5,
        //borderWidth:1,
        borderColor:'#aaa',
        backgroundColor:'#fff'
    },    
    discHeader:{    
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
        padding:3,
        paddingLeft:10,
        backgroundColor:'rgb(0,109,206)',
    },
    discHeaderText:{    
        color:'#fff',
        fontSize:15
    },
    discDados:{
        backgroundColor:'#f2f2f2',
        paddingTop:5,
    },

    discDadosPessoais:{
        backgroundColor:'rgba(200,200,200,1)',
        padding:5,
        paddingLeft:10,
        marginBottom:10,
    },
    discDadosPessoaisText:{
        color:'#222',
        fontSize:12,
    },
    discDadosPessoaisLabel:{
        letterSpacing:2,
        fontSize:13,
        fontWeight:'bold',
        textAlign:'center',
    },
    discFaltasLabel:{
        letterSpacing:2,
        fontSize:13,
        fontWeight:'bold',
    },

    viewFaltas:{
        paddingBottom:5,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#a5a5a5',
        marginBottom:5,
    },
    viewBarras:{
        height:20,
        width:'100%',
        borderRadius:5,
    },

    falta:{
        marginLeft:10,
        marginRight:10,
        marginBottom:5,
        paddingBottom:5,
        display:'flex',
        flexDirection:'row',
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        //flex:0.5,
    },
    faltaConteudo:{
        display:'flex',
        flex:0.95,
    },
    faltaTexto:{

    },
    faltaIcone:{
        fontSize:35,
        color:'#555',
        marginRight:5,
        paddingRight:5,
        borderRightColor:'#dcc',
        borderRightWidth:1,
    },
    faltaData:{
        color:'#c11'
    },
    nenhumaFalta:{
        textAlign:'center',
        marginTop:25
    }
});