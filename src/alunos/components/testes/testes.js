import React, {Component} from 'react';
import { SafeAreaView, ScrollView, Text,FlatList, KeyboardAvoidingView, View, TextInput, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import icones2 from './materialIcone'
import icones from './fontawesome'
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialIcons from 'react-native-vector-icons/FontAwesome'

import Swiper from 'react-native-swiper'

//MaterialIcons.loadFont();

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
})
var teste = icones.filter((item)=> {return item.indexOf('')>-1} )

export default class Testes extends Component{
    render(){
        return(
            
            <SafeAreaView  style={{flex:1}}>
                <ScrollView style={{padding:5,alignContent:"center"}}>
                    {
                        teste.map((item) => (
                            <View
                                key = {item}
                                style = {{flexDirection:'row',flex:1,margin:5,backgroundColor:'#fff',alignItems:'center'}}
                            >
                                <MaterialIcons name={item} size={40} color="#222"/>
                                <Text style={{paddingLeft:15}}>{item}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        )
        {/* <Swiper style={styles.wrapper} showsButtons={true}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                </View>
                  </Swiper> */}
    }
}

/* import React from 'react';
import { ScrollView, RefreshControl, StyleSheet, Text, SafeAreaView } from 'react-native';
//import Constants from 'expo-constants';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function App() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Pull down to see RefreshControl indicator</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */