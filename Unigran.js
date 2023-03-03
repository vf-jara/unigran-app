import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import Routes from './src/routes'
import { NavigationContainer } from '@react-navigation/native';

export default class Rotas extends Component{
  render(){
    return(
      <NavigationContainer>
        <StatusBar backgroundColor="rgb(32,89,147)"/>
        <Routes/>
      </NavigationContainer>
    )
  }
}