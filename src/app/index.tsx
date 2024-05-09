import { Text, View } from "react-native";
import { Link } from "expo-router";
<<<<<<< HEAD
import SeuComponente from "../components/testes-flex";
=======
import { MaterialIcons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";

>>>>>>> 8d4d490f65e7b628948dc4073f4e981e3fb4fd21

export default function Home(){
    return(
        <View className="flex-1 justify-center items-center">
            <Link href={"/feed/"}>
                <Text>Avançar</Text>
            </Link>
<<<<<<< HEAD
            <SeuComponente/>
=======


>>>>>>> 8d4d490f65e7b628948dc4073f4e981e3fb4fd21
        </View>
        
    )
}