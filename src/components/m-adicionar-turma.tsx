import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface Props {
    onInputChange: (texto: string) => void;
    salvarTurma: () => void;
}


export default function MAdicionarTurma({ onInputChange, salvarTurma }: Props){
    const [texto, setTexto] = useState('');

    const handleInputChange = (novoTexto: string) => {
      setTexto(novoTexto);
      onInputChange(novoTexto); // Chama a função de retorno de chamada do pai com o novo texto
    };


    return(    
        <View className="bg-blue-dark bg-opacity-95 rounded-xl p-2 shadow-lg m-16 shadow-black drop-shadow-md" style={{width: 285,}}>
        <MaterialIcons name="arrow-back" size={24} color="white" /> 
        <Text className="color-white p-3">Nome: </Text>
        <TextInput className="m-3 p-5 rounded-xl bg-gray-lighter" onChangeText={handleInputChange}
        value={texto} placeholder="Nome da turma" placeholderTextColor="#00000088"/>
        <Text className="color-white p-3">Gênero: </Text>
        <TextInput className="m-3 p-5 rounded-xl bg-gray-lighter" placeholder="Gênero" placeholderTextColor="#00000088"/>
        <View className="items-end justify-center">
            <Pressable className="p-3 m-3" onPress={salvarTurma}>
                <MaterialIcons name="check" size={24} color="white"/>
            </Pressable>
        </View>
    </View>
    )
}