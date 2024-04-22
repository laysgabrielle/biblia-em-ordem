import { Text, TextInput, View } from "react-native";
import CardTurma from "../../components/card-turma";
import { MaterialIcons } from "@expo/vector-icons";

export default function Turmas(){
    return (
        <View className="mx-4 mt-20">
            <View className="mx-7 mt-16 mb-1 ">
                <TextInput className="bg-blue-accent rounded-xl color-white p-3" placeholder="Search"/>           
                </View>


            <View className=" my-14 flex-1 flex-row flex-wrap justify-evenly items-center mb-0 mt-2">
                <CardTurma nomeTurma="Abraão" icone="book" qtdAlunos={20}/>
                <CardTurma nomeTurma="Simon" icone="book"/>
                <CardTurma nomeTurma="Amos" icone="book"/>
                <CardTurma nomeTurma="Miria" icone="book"/>
            </View>
        </View>
    )
}