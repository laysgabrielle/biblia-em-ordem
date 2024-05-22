import React from "react";
import { View, Dimensions } from "react-native";
import CardEvento from "../../../components/card-evento";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#c6c6c6", // Alterado para a cor desejada
        justifyContent: "center", // Alinhamento vertical centralizado
        alignItems: "center", // Alinhamento horizontal centralizado
      }}
    >
      <CardEvento
        title="Evento"
        location="Igreja Assembléia de Deus"
        info="Venha para nosso encontro de jovens! O evento será realizado com o objetivo de reunir nossos jovens para uma confraternização."
      />
    </View>
  );
}
