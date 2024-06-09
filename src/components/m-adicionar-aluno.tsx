import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface Props {
    onInputNomeChange: (texto: string) => void;
    onInputDataNascimentoChange: (dataNascimento: Date) => void;
    salvarAluno: () => void;
}


export default function MAdicionarAluno({ onInputNomeChange, onInputDataNascimentoChange,salvarAluno }: Props){
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState<Date>(new Date());
    const handleInputNomeChange = (nome: string) => {
      setNome(nome);
      onInputNomeChange(nome); // Chama a função de retorno de chamada do pai com o novo texto
    };
    const handleInputDataNascimentoChange = (dataNascimento: Date) => {
        setDataNascimento(dataNascimento);
        onInputDataNascimentoChange(dataNascimento); // Chama a função de retorno de chamada do pai com o novo texto
      }



    return(    
        <View className="bg-blue-dark bg-opacity-95 rounded-xl p-2 shadow-lg m-16 shadow-black drop-shadow-md" style={{width: 285,}}>
        <MaterialIcons name="arrow-back" size={24} color="white" /> 
        <Text className="color-white p-3">Nome: </Text>
        <TextInput className="m-3 p-5 rounded-xl bg-gray-lighter" placeholder="Nome do aluno" placeholderTextColor="#00000088" onChangeText={handleInputNomeChange}/>
        <Text className="color-white p-3">Data de Nascimento: </Text>
        <TextInput className="p-5 m-3 rounded-xl bg-gray-lighter" placeholder="aaaa/mm/dd" placeholderTextColor="#00000088" onChangeText={() => handleInputDataNascimentoChange.toString()}/>
        <MaterialIcons name="check" onPress={salvarAluno} size={24} color="white" className="p-3 self-end items-end" />
    </View>
    )
}