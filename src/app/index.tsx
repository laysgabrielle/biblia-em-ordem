import React, {useContext} from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { Link } from "expo-router";
import CardSelecao from "../components/selecao-aluno";
import { UserContext } from "../context/UserContext";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const {toggleUsuarioLogado} = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/home.png')}
        style={styles.image}
      />

      <View style={styles.cardContainer}>
        <Link href={"feed/"} onPress={() => {toggleUsuarioLogado(false) }}>
          <CardSelecao title="Aluno" />
        </Link>
      </View>

      <View style={styles.cardContainer}>
        <Link href={"login/"}>
          <CardSelecao title="Professor" />
        </Link>
      </View>

      <Image
        source={require('../../assets/images/blindem.png')}
        style={styles.image2}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Igreja Assembleia de Deus </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#152E45',
    alignItems: 'center', 
  },
  image: {
    width: width,
  },
  image2: {
   marginTop:1,
   width: width,
   
  },
  cardContainer: {
    marginTop: 25, 
    marginBottom: 5, 
  },
  textContainer: {
    position: 'absolute',
    top: 500,
    left: 0,
    right: 100,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    color: 'white',
    
  },
});