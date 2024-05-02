import { Pressable, Text, TouchableHighlight, View } from "react-native"
import CardDefault from "../../components/card-default"
import CardFeed from "../../components/card-feed"
import CardEvento from "../../components/card-evento"

export default function Home() {
     return (

     <View className="flex-1 items-center justify-center"
     style={{
          backgroundColor: "#B9C1C7",
     }}>

          <View className="flex-1 items-center justify-center"
          style={{
               position: "absolute",
               top: 0,
               left: 0,
               right: 0,
               backgroundColor: "#152E45",
               padding: 0,
               paddingTop: 40,
           }}>

               <CardFeed title="Título da Revista" subtitle="Título da Lição"/>

          </View>

          <View className="flex-1 items-center justify-center">

               {/* <CardDefault icone="book" title="Titulo" /> */}

               <CardEvento title="Encontro dos Jovens" location="Igreja Assembléia de Deus" info="Venha para nosso encontro de jovens! O enento será realizado a fim de reunir nossos jovens para uma confraternização."/>

          </View>

     </View>


)
}