import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { Link } from "expo-router";
import CardSelecao from "../components/selecao-aluno";

const { width, height } = Dimensions.get("window");

export default function Home(){
    return(
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/home.png')}
                style={styles.image}
            />

            <Link href={"feed/"}>

                <CardSelecao title="oi" />
            </Link>

            
            
            <Text style={styles.textAboveImage}>Sua frase aqui</Text>

            <Image
                source={require('../../assets/images/blindem.png')}
                style={styles.image}
            />
            <View>
            <Text style={{fontSize: 20,}}>Sua frase aqui</Text>
                
            </View>
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
        width: width - 0, 
        
    },
    textAboveImage: {
        fontSize: 20,
        color: 'white',
        marginBottom: 10,
        alignItems: 'center',
    },
});
