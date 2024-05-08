import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

function CardRelatorio(props) {
    return (
        <View style={styles.container}>
            {/* Título e Subtítulo ao lado esquerdo */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>A igreja somos nós</Text>
                <Text style={styles.subtitle}>{props.title}</Text>
            </View>
            {/* Círculo para imagem com cor laranja */}
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/images/pomba.png")}
                    style={styles.image}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", // Para alinhar os elementos horizontalmente
        alignItems: "center", // Para alinhar verticalmente os elementos
        width: "100%",
        aspectRatio: 16 / 9,
        overflow: "hidden",
        position: "relative",
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100, // Metade da largura/altura para formar um círculo
        overflow: "hidden",
        marginLeft: 10, // Espaço entre o texto e a imagem
        backgroundColor: "#152E45", // Cor de fundo do círculo
        marginTop: -20, // Movendo o círculo para cima
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    textContainer: {
        flex: 1, // Para ocupar o espaço restante
        justifyContent: 'flex-start', // Alinhar o texto para o início do contêiner (esquerda)
        marginTop: -20, // Movendo o texto para cima
    },
    title: {
        color: "orange",
        fontSize: 28, // Aumentando o tamanho da fonte
    },
    subtitle: {
        color: "orange",
        fontSize: 20, // Aumentando o tamanho da fonte
        marginTop: 5,
    },
});

export default CardRelatorio;
