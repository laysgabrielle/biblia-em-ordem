import { MaterialIcons } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";

export default function MAdicionarAluno() {
    return(    
        <View className="bg-blue-dark bg-opacity-95 rounded-xl p-2 shadow-lg m-16 shadow-black drop-shadow-md" style={{width: 285,}}>
        <MaterialIcons name="arrow-back" size={24} color="white" /> 
        <Text className="color-white p-3">Nome: </Text>
        <TextInput className="m-3 p-5 rounded-xl bg-gray-lighter" placeholder="Nome do aluno" placeholderTextColor="#00000088"/>
        <Text className="color-white p-3">Data de Nascimento: </Text>
        <TextInput className="p-5 m-3 rounded-xl bg-gray-lighter" placeholder="aaaa/mm/dd" placeholderTextColor="#00000088"/>
        <Text className="color-white p-3">Classe: </Text>
        <TextInput className="p-5 m-3 rounded-xl bg-gray-lighter" placeholder="Selecione:" placeholderTextColor="#00000088"/>
        <MaterialIcons name="check" size={24} color="white" className="p-3 self-end items-end" />
    </View>
    )
}