import CardDefault from "../../../components/card-default";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";


export default function id()
{
    const local = useLocalSearchParams();

    return(
        <View className="flex-1 justify-center items-center">
            <Text>TEXTO AQUI</Text>
            <Text>{local.id}</Text>
        </View>
    )
}