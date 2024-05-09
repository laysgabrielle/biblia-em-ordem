import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Home(){
    return(
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/home.png')}
                style={styles.image}
            />

            <Link href={"feed/"}>
                <Text>Avançar</Text>
            </Link>

            <Image
                source={require('../../assets/images/blindem.png')}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#152E45',
    },
    image: {
        marginHorizontal: 0,
        width: width - 0, // Definindo a largura da imagem para ocupar o restante do espaço disponível
        
    },
});
