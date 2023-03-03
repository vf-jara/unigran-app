import React, {Component} from 'react'
import { StyleSheet, View, Image, Linking, TouchableOpacity  } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Swiper from 'react-native-swiper'
import {getTodosBanners} from '../../../servicesRequest/banners.service'

MaterialIcons.loadFont();

export default class HomeHorario extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        banners:[],
        img:{uri:'https://www.unigran.br/campogrande/appUnigran/imagens/load5.gif'},
    }
    

    async UNSAFE_componentWillMount() {
        getTodosBanners().then(function (res){
            var dados = res.data
            if(dados.length!=0){
                this.setState({ banners: dados });
            }
            
        }.bind(this)).catch(function (e){
            console.log(e)
        })
    }

    Banners(banner,index){
        if(banner.linkAbrir){
            return(
                <View key={index} >
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(`${banner.linkAbrir}`);
                        }}
                    >
                        <Image 
                            style={stylesBanners.banner} 
                            source={{uri:banner.imagem}}
                        >
                        </Image>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return(
                <View key={index} >
                    <View>
                        <Image    
                            style={stylesBanners.banner} 
                            source={{uri:banner.imagem}}
                        >
                        </Image>
                    </View>
                </View>
            )
        }
    }

    render(){
        if(this.state.banners.length!=0 && Object.keys(this.state.banners).length !== 0){
            return (
                <View style={stylesBanners.containerBanners}>
                    {/* Slide Banners */}
                    <Swiper 
                        paginationStyle={{bottom:2}}
                        showsButtons={true}
                        autoplay={true}
                        height={170}
                        autoplayTimeout={3}
                        showsButtons={true}
                    >
                        {
                            this.state.banners.map((banner, index) =>{
                                return this.Banners(banner,index)
                            })
                        }
                    </Swiper>
                </View>
            );
        }else{
            return null
        }
    }
}

const stylesBanners = StyleSheet.create({

    banner:{
        width:"100%",
        height:150,
        borderTopRightRadius:2,
        borderTopLeftRadius:2,
        resizeMode:"contain",
        top:0,
        left:0,
    },
    containerBanners:{
        margin:10,
        marginBottom:10,
        position:'relative',
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:5,
        backgroundColor:'#fff',
        elevation:5,
    },

});