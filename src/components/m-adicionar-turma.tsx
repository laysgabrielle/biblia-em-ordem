import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";

export default function MAdicionarTurma() {
    return(    
        <View className="bg-blue-dark bg-opacity-95 rounded-xl p-2 shadow-lg m-16 shadow-black drop-shadow-md" style={{width: 285,}}>
        <MaterialIcons name="arrow-back" size={24} color="white" /> 
        <Text className="color-white p-3">Nome: </Text>
        <TextInput className="m-3 p-5 rounded-xl bg-gray-lighter" placeholder="Nome da turma" placeholderTextColor="#00000088"/>
        <Text className="color-white p-3">Gênero: </Text>
        <TextInput className="m-3 p-5 rounded-xl bg-gray-lighter" placeholder="Gênero" placeholderTextColor="#00000088"/>
        <View className="items-end justify-center">
            <Pressable className="p-3 m-3">
                <MaterialIcons name="check" size={24} color="white"/>
            </Pressable>
        </View>
    </View>
    )
}