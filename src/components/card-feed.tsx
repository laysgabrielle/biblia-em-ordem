import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

type props = {
    title: string,
    subtitle: string,
}


function CardFeed(props: props) {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/feed.jpg")}
                style={styles.image}
            />
            {/* Camada semi-transparente */}
            <View style={styles.overlay} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.subtitle}>{props.subtitle}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        aspectRatio: 16 / 9, // Relação de aspecto para manter o cartão proporcional
        overflow: "hidden", // Para esconder qualquer conteúdo que possa sair do cartão
        position: "absolute",
        top: 0,
        left: 0,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        position: "absolute",
        top: 0,
        left: 0,
    },
    overlay: {
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Cor semi-transparente
        width: "100%",
        height: "100%",
    },
    textContainer: {
        position: "absolute",
        top: 20, // Espaço entre o topo do cartão e o início do texto
        left: 10,
        padding: 10,
    },
    title: {
        color: "white",
        fontSize: 22,
    },
    subtitle: {
        color: "white",
        fontSize: 16,
        marginTop: 5, // Espaço entre o título e o subtítulo
    },
});

export default CardFeed;
