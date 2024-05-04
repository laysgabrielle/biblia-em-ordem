import React from "react";
import { View, Dimensions } from "react-native";
import CardFeed from "../../../components/card-feed";
import CardEvento from "../../../components/card-evento";

const windowHeight = Dimensions.get('window').height;

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#B9C1C7",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#152E45",
          padding: 0,
          paddingTop: 40,
        }}
      >
        <CardFeed
          title="Título da Revista"
          subtitle="Título da Lição"
          style={{ marginTop: windowHeight * 0.6 }}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardEvento
          title="Encontro dos Jovens"
          location="Igreja Assembléia de Deus"
          info="Venha para nosso encontro de jovens! O evento será realizado com o objetivo de reunir nossos jovens para uma confraternização."
        />
      </View>
    </View>
  );
}
