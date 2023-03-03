import React, { useLayoutEffect } from 'react'
import { Text, Image, View, Dimensions, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
const Tab = createMaterialTopTabNavigator();

//IMPORTES DAS ROTAS EM TABS
import Home from './home/home'
import Faltas from './faltas/faltas'
import Menu from './menu/menu'
import Notas from './notas/notas'
import Horarios from './horarios/horarios'
// import Testes from './testes/testes'
import Loading from './compartilhados/loading'

//ICONES
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
MaterialIcons.loadFont();
import FontAwesome from 'react-native-vector-icons/FontAwesome'
FontAwesome.loadFont();

/*  Imagens - Vão ficar junto com as Tabs, pois as tabs tem acesso direto a routes*/
const pic = {
    uri:'https://www.unigran.br/campogrande/appUnigran/imagens/user.png'
}

const logo = {
    uri:'https://www.unigran.br/campogrande/appUnigran/imagens/UN.jpg'
}

export default function Tabs({navigation, route}){
    useLayoutEffect(() => {
        if(route.state) {
            if(route.state.routeNames[route.state.index] != 'Menu'){
                navigation.setOptions({
                    headerLeft: () =>(
                        <View style={{paddingLeft:15}}>
                            <View style={{width:45,height:45,borderRadius:50,backgroundColor:'#f1f1f1',justifyContent:"center",alignItems:"center"}}>
                                <Image 
                                    source={global.dadosUsuario.informacoes.foto != 'nenhuma'?{uri:global.dadosUsuario.informacoes.foto}:pic} 
                                    style={{width:35,height:35,borderRadius:50}}
                                />
                            </View>
                        </View>
                    ),
                    headerRight: () => (
                        <View>
                            <Text style={{color:'white',paddingRight:15,fontSize:16}}>{global.dadosUsuario.informacoes.nome}</Text>
                        </View>
                    ),
                });
            }else{
                navigation.setOptions({
                    headerRight: () => (
                        <View>
                            <Text style={{color:'white',paddingRight:15,fontSize:18}}>{route.state.routeNames[route.state.index]}</Text>
                        </View>
                    ),
                    headerLeft: () =>(
                        <View style={{marginLeft:15,padding:5, backgroundColor:'#f8f8f8', borderRadius:50}}>
                            <Image
                                style={{ width:35, height:35, borderRadius:50}}
                                source={logo} 
                            />
                        </View>
                    )
                });
            }
        } else {
            navigation.setOptions({
                headerRight: () => (
                    <View>
                        <Text style={{color:'white',paddingRight:20,fontSize:18}}>Home</Text>
                    </View>
                ),
            });
        }
        
    });

    return <Abas/>;
}

export class Abas extends React.Component{
    //Trabalha na renderização de cada mudança de página
    render(){
        return(
            <Tab.Navigator
                initialRouteName="Home"
                initialLayout = {{ width: Dimensions.get('window').width }}
                tabBarPosition="bottom"
                lazy={true}
                keyboardDismissMode='on-drag'
                lazyPlaceholder={()=><Loading/>}
                tabBarOptions={{
                    showIcon:true,
                    activeTintColor: 'rgb(239,158,42)',
                    inactiveTintColor: 'rgb(255,245,245)',
                    indicatorStyle:{color:'#fff',borderColor:'#fff'},
                    showLabel:false,
                    tabStyle:{
                        backgroundColor:'rgb(0,73,124)',
                        maxHeight:40,
                        paddingTop:5,
                    },
                }}
                gestureHandlerProps={{
                    maxPointers: 1,
                    // minDist: 50
                    activeOffsetX:50,
                    activeOffsetY:50
                }}
            >
                <Tab.Screen 
                    name="Menu"
                    component={Menu}
                    params={{tabBarIcon:'menu'}}
                    options={{
                        tabBarIcon: ({color}) => (
                            <MaterialIcons name="menu" size={27} color={color} />
                        ),
                    }}
                    listeners={{
                        tabPress: e => {
                            //console.log(e)
                        },
                    }}
                />

                <Tab.Screen 
                    activeTintColor="#ffbf00"
                    name="Home"
                    component={Home}
                    params={{tabBarIcon:'home'}}
                    
                    options={{
                        tabBarIcon: ({color}) => (
                            <MaterialIcons name="home" size={25} color={color} />
                        ),
                    }}
                    listeners={{
                        tabPress: e => {
                            //console.log(e)
                        },
                    }}
                />

                <Tab.Screen 
                    name="Faltas"
                    params={{tabBarIcon:'calendar-times-o'}}
                    component={Faltas}
                    options={{
                        tabBarIcon: ({color}) => (
                            <FontAwesome name="calendar-times-o" size={21} color={color} />
                        ),
                    }}
                    listeners={{
                        tabPress: e => {
                            //console.log(e)
                        },
                    }}
                />

                <Tab.Screen 
                    name="Horarios"
                    params={{tabBarIcon:'query-builder'}}
                    component={Horarios}
                    options={{
                        tabBarLabel: 'Horários',
                        showIcon:false,
                        tabBarIcon: ({color}) => (
                            <MaterialIcons name="query-builder" size={25} color={color} />
                        ),
                    }}
                    listeners={{
                        tabPress: e => {
                            //console.log(e)
                        },
                    }}
                />

                <Tab.Screen 
                    name="Notas"
                    component={Notas}
                    params={{tabBarIcon:'bar-chart'}}
                    options={{
                        tabBarIcon: ({color}) => (
                            <FontAwesome name="bar-chart" size={22} color={color} />
                        ),
                    }}
                    listeners={{
                        tabPress: e => {
                            //console.log(e)
                        },
                    }}
                />
                

                {/* <Tab.Screen 
                    name="Test"
                    component={Testes}
                    params={{tabBarIcon:'build'}}
                    options={{
                        tabBarLabel: 'Test Page',
                        showIcon:false,
                        tabBarIcon: ({color}) => (
                            <MaterialIcons name="build" size={25} color={color} />
                        ),
                    }}
                    listeners={{
                        tabPress: e => {
                            console.log(e)
                        },
                    }}
                /> */}

            </Tab.Navigator>
        )
    }
}

function MyTabBar({ state, descriptors, navigation, position }) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          const inputRange = state.routes.map((_, i) => i);
          const opacity = Animated.interpolate(position, {
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
          });
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <Animated.Text 
                style={{ opacity },isFocused ? {color:'red'} : ''}
              >
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }