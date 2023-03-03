import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
MaterialIcons.loadFont();

export default class Cards extends Component{
    static defaultProps = {
        icon:'',
        title:'',
        subtitle:'',
        componente:'',
        headerStyle:'',
        navigation:'',
        to:'',
    };
    
    navigateTo(){
        if(!this.props.to)return
        this.props.navigation.navigate(this.props.to)
    }

    render(){
        return (
            <View style={stylesCard.card}>
                {/* CABEÇALHO */}
                <View style={stylesCard.header}>
                    <View style={this.props.headerStyle}>
                        <LinearGradient
                            colors={[this.props.headerStyle.backgroundColor,this.props.headerStyle.backgroundColor2]}
                            style={{ flex: 1 }}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 1, y: 0 }}
                        >
                                <View style={stylesCard.viewHeader}>
                                    <TouchableOpacity
                                        style={{width:'100%',flexDirection:'row',alignItems:'center'}}
                                        onPress={() => this.navigateTo()}
                                    >
                                        <MaterialIcons name={this.props.icon} style={this.props.headerStyle.backgroundColor!='#ebb317'?stylesCard.iconesHeader:stylesCard.iconesHeaderFalta}/>
                                        <Text style={this.props.headerStyle.backgroundColor!='#ebb317'?stylesCard.title:stylesCard.titleFalta}>{this.props.title}</Text>    
                                        <Text style={stylesCard.subtitle}>{this.props.subtitle}</Text>
                                    </TouchableOpacity>
                                </View>
                        </LinearGradient>
                    </View>
                </View>
                <View style={stylesCard.contentCard}>
                    {this.props.componente}
                </View>
            </View>
        );
    }
}

const stylesCard = StyleSheet.create({
    //Card completo
    card:{
        backgroundColor: 'white',
        paddingTop: 0,
        elevation:5,
        borderRadius:7,
        marginHorizontal:10,
        marginVertical:12,
        borderWidth:1,
        borderColor:'#ccc'
    },

    //Cabeçalho
    header:{
        borderTopEndRadius:5,
        borderTopLeftRadius:5,
        overflow:'hidden',
        //borderBottomWidth:1,
        borderColor:'rgba(100,100,100,.8)'
    },
    viewHeader:{
        borderTopEndRadius:5,
        borderTopLeftRadius:5,
        padding:2,
        alignItems:'center',
        display: 'flex',
        flexDirection:'row',
    },
    iconesHeader:{
        color:'#fff',
        fontSize:20,
        width:'7%',
        marginLeft:5,
    },
    title:{
        fontSize:18,
        width:'60%',
        textAlign:'left',
        color:'#fff',
    },
    iconesHeaderFalta:{
        color:'#444',
        fontSize:20,
        width:'7%',
        marginLeft:5,
    },
    titleFalta:{
        fontSize:18,
        width:'60%',
        textAlign:'left',
        color:'#444',
    },
    subtitle:{
        textAlign:'right',
        color:'#fff',
        width:'30%',
    },

    //Cabeçalho background color
    viewHeaderAvisos:{
        borderTopEndRadius:5,
        borderTopLeftRadius:5,
        backgroundColor:'#ff881b'
    },
    viewHeaderHorario:{
        borderTopEndRadius:5,
        borderTopLeftRadius:5,
        backgroundColor:'#007ae7'
    },
    viewHeaderFaltas:{
        borderTopEndRadius:5,
        borderTopLeftRadius:5,
        backgroundColor:'#e7bb00'
    },

    //Conteudo do Card
    contentCard:{
        padding:10,
    },
})