import React from "react";
import { Text, View, Image, StyleSheet, Dimensions, TextInput, Button } from "react-native";
import { Link } from "expo-router";

const Login = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/blidem.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <TextInput
                style={styles.input}
                placeholder="Login"
                placeholderTextColor="#ccc"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#ccc"
                secureTextEntry
            />
            <Button title="Entrar" onPress={() => { /* lógica de login aqui */ }} />
            <Link href="/register" style={styles.link}>
                <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#152E45', // Define uma cor de fundo
        padding: 20,
    },
    image: {
        width: Dimensions.get('window').width * 0.8, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.4, // Ajuste a altura conforme necessário
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: "orange",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    link: {
        marginTop: 20,
    },
    linkText: {
        color: '#fff',
    },
});

export default Login;
