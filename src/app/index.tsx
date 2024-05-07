import { Text, View } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";


export default function Home(){
    return(
        <View className="flex-1 justify-center items-center">
            <Link href={"feed/"}>
                <Text>Avançar</Text>
            </Link>


        </View>
    )
}