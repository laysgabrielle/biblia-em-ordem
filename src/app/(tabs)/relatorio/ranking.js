import { Text, View } from "react-native"
import Grafico from  "../../../components/grafico"

export default function Ranking()
{
    return(
        <View className="flex-1 items-center justify-center">
        <Text>Tela ranking</Text>
        <Grafico />
    </View>
    )
}