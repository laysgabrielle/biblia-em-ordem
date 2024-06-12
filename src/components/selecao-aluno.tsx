import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardSelecaoProps {
  title: string;
}

const CardSelecao: React.FC<CardSelecaoProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    width: 240,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CardSelecao;