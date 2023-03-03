import React from 'react';
import {Dimensions } from 'react-native';
import axios from 'axios'
import 'react-native-gesture-handler';
// import * as ScreenOrientation from 'expo-screen-orientation';

import Unigran from './Unigran'

global.dadosUsuario = {informacoes:{nome:'',login:false}}
global.apiBase = axios.create({
    baseURL: 'https://apisapp.unigrancapital.com.br/index.php/',
});
global.versaoApp = '1.0'
global.header = { headers: {"Authorization" : ''}}

export default class App extends React.Component {
  state = {
    orientation:''
  };

  componentDidMount() {
    Dimensions.addEventListener('change',({window: {width, height}})=>{
      if(width < height){
        this.setState({orientation:'Portait'})
      }else{
        this.setState({orientation:'landscape'})
      }
    })
  };
  render(){
    return (
        <Unigran/>
    );
  }
}
