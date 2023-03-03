import React, {Component} from 'react';
import { View, Image, StyleSheet, Text } from 'react-native'

const img = {
    uri:'https://www.unigran.br/campogrande/appUnigran/imagens/load5.gif'
}

const styles = StyleSheet.create({
    container:{
        zIndex:999,
        justifyContent:"center",
        alignItems:"center",
        flex:1,
        height:'100%',
    },
    loading:{
        width:50,
        height:50,
    },

    containerHome:{
        zIndex:999,
        justifyContent:"center",
        alignItems:"center",
        position:'absolute',
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(45,45,45,.35)',
    },
    modalHome:{
        backgroundColor:'white',
        borderRadius:5,
        width:'90%',
        height:'35%',
        alignItems:'center',
        justifyContent:'center',
    },  
    loadingHome:{
        width:150,
        height:150,
    },
    textHome:{
        position:'absolute',
        bottom:10,
        fontSize:16,
        color:'#222'
    }
})

export default class Loading extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Image source={img} style={styles.loading}></Image>
            </View>
        )
    }
}

export class LoadingHome extends Component{
    render(){
        return(
            <View style={styles.containerHome}>
                <View style={styles.modalHome}>
                    <Image source={img} style={styles.loadingHome}></Image>
                    <Text style={styles.textHome}>Aguarde um instante por favor!</Text>
                </View>
            </View>
        )
    }
}
