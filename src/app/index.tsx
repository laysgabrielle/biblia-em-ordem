import { Text, View } from "react-native";
import { Link } from "expo-router";
import SeuComponente from "../components/testes-flex";

export default function Home(){
    return(
        <View className="flex-1 justify-center items-center">
            <Link href={"/feed/"}>
                <Text>Avançar</Text>
            </Link>
            <SeuComponente/>
        </View>
        
    )
}