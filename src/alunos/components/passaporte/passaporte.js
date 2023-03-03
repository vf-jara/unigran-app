import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, Image, View, Text, Animated, Easing } from 'react-native'

export default class Passaporte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            front: '',
            back: '',
            nome: '',
            rgm: '',
            curso: '',
            foto: '',
            efeito: new Animated.Value(1)
        }
    }
    async UNSAFE_componentWillMount() {
        this.flip(1)
    }

    flip(posicao) {

        let dadosAluno = global.dadosUsuario;

        if (posicao == 1) {
            this.setState({ front: true, back: false, nome: dadosAluno.informacoes.nome, rgm: dadosAluno.matriculas[0].rgm, curso: dadosAluno.matriculas[0].cursoNome, foto: dadosAluno.informacoes.foto });
            Animated.spring(this.state.efeito, { toValue: 0, duration: 900, easing: Easing.bounce, useNativeDriver: true }).start();
        }
        if (posicao == 2) {
            this.setState({ back: true, front: false });
            Animated.spring(this.state.efeito, { toValue: 1, duration: 900, easing: Easing.bounce, useNativeDriver: true }).start();
        }

    }
    render() {

        const efeitoFrente = this.state.efeito.interpolate({ inputRange: [0, 1], outputRange: ["360deg", "180deg"] });
        const estiloFrente = { transform: [{ rotate: "90deg" }, { rotateY: efeitoFrente }] };
        const efeitoVerso = this.state.efeito.interpolate({ inputRange: [0, 1], outputRange: ["180deg", "360deg"] });
        const estiloVerso = { transform: [{ rotate: "90deg" }, { rotateY: efeitoVerso }] };

        const frente = require('../../../../assets/passaporte-frente.jpg');
        const verso = require('../../../../assets/passaporte-verso.jpeg');

        const image = { uri: this.state.foto };
        const padrao = require('../../../../assets/passaporte-sem-foto.jpeg');

        return (

            <View style={styles.container}>
                {this.state.front && (
                    <TouchableOpacity onPress={() => this.flip(2)} style={[estiloFrente]}>
                        <ImageBackground source={frente} resizeMode="cover" style={styles.imagem}>
                            {this.state.foto ? (
                                <View style={styles.containerFoto}>
                                    <Image source={image} resizeMode="contain" style={styles.foto} />
                                </View>
                            ) : <View style={styles.containerFoto}>
                                <Image source={padrao} resizeMode="contain" style={styles.foto} />
                            </View>}
                            <View style={styles.containerDados}>
                                <Text style={styles.titulo}>{this.state.nome}</Text>
                                <Text style={styles.subtitulo}>{this.state.rgm}</Text>
                                <Text style={styles.subtitulo}>{this.state.curso}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
                {this.state.back && (
                    <TouchableOpacity onPress={() => this.flip(1)} style={[estiloVerso]}>
                        <ImageBackground source={verso} resizeMode="cover" style={styles.imagem}>
                        </ImageBackground>
                    </TouchableOpacity >
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagem: {
        width: 600,
        height: 390,
        overflow: 'hidden',
        borderRadius: 15
    },
    foto: {
        width: '100%',
        height: 200,
        borderRadius: 10
    },
    containerDados: {
        width: '50%',
        marginLeft: '50%',
        position: 'absolute',
        right: 4,
        bottom: 80,
    },
    containerFoto: {
        width: '50%',
        marginLeft: '50%',
        position: 'absolute',
        bottom: 160,
        alignItems: 'center',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 20,
        color: '#04375C',
        fontWeight: 'bold'
    },
    subtitulo: {
        textAlign: 'center',
        color: '#04375C',
        /* fontWeight: 'bold', */
        fontSize: 17,
    }
});
