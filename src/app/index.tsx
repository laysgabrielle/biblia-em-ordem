import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { Link } from "expo-router";
import CardSelecao from "../components/selecao-aluno";

const { width, height } = Dimensions.get("window");

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/home.png')}
        style={styles.image}
      />

      <View style={styles.cardContainer}>
        <Link href={"feed/"}>
          <CardSelecao title="Aluno" />
        </Link>
      </View>

      <View style={styles.cardContainer}>
        <Link href={"feed/"}>
          <CardSelecao title="Professor" />
        </Link>
      </View>

      <Image
        source={require('../../assets/images/blindem.png')}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Biblia em ordem </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152E45',
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  image: {
    width: width,
  },
  cardContainer: {
    marginTop: 5, // Espaçamento para não sobrepor as imagens
    marginBottom: 5, // Espaçamento para não sobrepor as imagens

  },
  textContainer: {
    position: 'absolute',
    top: 500,
    left: 0,
    right: 180,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
});