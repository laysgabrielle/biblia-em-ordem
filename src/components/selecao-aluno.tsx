import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardSelecaoProps {
  title: string;
}

const CardSelecao: React.FC<CardSelecaoProps> = ({ title }) => {
  return (
    <View style={[styles.container, { marginBottom: 200 }]}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    width: 200,
    height: 120,
    borderRadius: 10,
    marginBottom: 54,
    flex: 1,
    
    alignItems: 'center',
    
  },
});

export default CardSelecao;
