import { Pressable, Text, TouchableHighlight, View } from "react-native"
import CardDefault from "../../components/card-default"
import CardFeed from "../../components/card-feed"

export default function Home() {
     return (

     <View className="flex-1 items-center justify-center">

          <View className="flex-1 items-top justify-top">

               <CardFeed title="Título da Revista" subtitle="Título da Lição"/>

          </View>

          <View className="flex-1 items-center justify-center">

               <CardDefault icone="book" title="Titulo" />

          </View>
          
     </View>


)
}