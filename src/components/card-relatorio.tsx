import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

interface CardRelatorioProps {
    title: string;
}

const CardRelatorio: React.FC<CardRelatorioProps> = (props) => {
    return (
        <View style={styles.container}>
            {/* Título e Subtítulo ao lado esquerdo */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>"A igreja somos nós, a igreja é união"</Text>
                <Text style={styles.subtitle}>{props.title}</Text>
            </View>
            {/* Círculo para imagem com cor laranja */}
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/images/dove.png")}
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
        right: 0, // Alinhar à direita
        width: 300, // Ajustar a largura do container conforme necessário
        height: 300, // Ajustar a altura do container conforme necessário
        borderRadius: 150, // Metade da largura/altura para formar um círculo
        overflow: "hidden",
        backgroundColor: "#152E45", // Cor de fundo do círculo
        marginLeft: 20,
        marginRight: -60,
        marginTop: -70,
        marginBottom: 20,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: 75, // Metade da largura para formar um círculo
    },
    textContainer: {
        flex: 1, // Para ocupar o espaço restante
        justifyContent: 'flex-start', // Alinhar o texto para o início do contêiner (esquerda)
        marginTop: 50, // Espaço entre o texto e o topo
        marginLeft: 30, // Margem à esquerda
    },
    title: {
        color: "#152E45",
        fontSize: 28, // Aumentando o tamanho da fonte
    },
    subtitle: {
        color: "orange",
        fontSize: 20, // Aumentando o tamanho da fonte
        marginTop: 5,
    },
});

export default CardRelatorio;
