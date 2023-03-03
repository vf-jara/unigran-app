import React, {Component} from 'react'
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native'

import Banners from './quadros/home.banners'
import Avisos from './quadros/home.avisos'
import AvisosGeral from './quadros/home.avisos.geral'
import Horario from './quadros/home.horarios'
import Faltas from './quadros/home.faltas'
import Loading from '../compartilhados/loading'
import Card from './quadros/cards'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
MaterialIcons.loadFont();

export default class Home extends Component{
    state={
        dias: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
        dia: new Date().getDay(),
        refreshing:false,
    }
    async UNSAFE_componentWillMount() {
        this.iniciar()
    }

    _onRefresh = () => {
        this.iniciar()
    }

    iniciar(){
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    }

    render(){
        if(!this.state.refreshing){
            return(
                <SafeAreaView>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        
                        {/* Banners */}
                        <Banners/>                   

                        {/* Horário */}
                        <Card 
                            icon='query-builder'
                            title='Horário de aula'
                            subtitle={this.state.dias[this.state.dia]}
                            navigation={this.props.navigation}
                            to='Horarios'
                            componente={<Horario/>}
                            headerStyle={{
                                backgroundColor:'rgb(32,89,147)',
                                backgroundColor2:'rgb(32,89,147)',
                            }}
                        />

                        {/* Faltas */}
                        <Card 
                            icon='event-busy'
                            title='Quadro de faltas'
                            subtitle=''
                            navigation={this.props.navigation}
                            to='Faltas'
                            componente={<Faltas navigation={this.props.navigation}/>}
                            headerStyle={{
                                backgroundColor:'rgb(50,108,165)',
                                backgroundColor2:'rgb(50,108,165)',
                            }}
                        />

                        {/* Avisos */}
                        <Card 
                            icon='notifications'
                            title='Quadro geral'
                            subtitle=''
                            componente={<AvisosGeral/>}
                            headerStyle={{
                                backgroundColor:'rgb(0,73,124)',
                                backgroundColor2:'rgb(0,73,124)',
                            }}
                        />

                        {/* Avisos */}
                        <Card 
                            icon='notifications'
                            title='Quadro de avisos'
                            subtitle=''
                            componente={<Avisos/>}
                            headerStyle={{
                                backgroundColor:'rgb(0,73,124)',
                                backgroundColor2:'rgb(0,73,124)',
                            }}
                        />
                    </ScrollView>
                </SafeAreaView>
            )
        }else{
            return <Loading></Loading>
        }
    }
}