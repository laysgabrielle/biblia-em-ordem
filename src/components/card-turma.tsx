import { View, Text, Pressable, TouchableHighlight } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {useState} from "react";
import { Href, Link } from "expo-router";

type props = {
    nomeTurma: string;
    icone?: string;
    qtdAlunos?: number;
    temPermissao: boolean;
    deletar?: () => void | undefined;

}



export default function CardTurma(props: props){
<<<<<<< HEAD
        const [temPermissao, setPermissao] = useState(false);
=======

>>>>>>> 8d4d490f65e7b628948dc4073f4e981e3fb4fd21
        return(<View className="justify-center items-center bg-blue-accent w-44 h-64 my-6 rounded-xl shadow-blue-dark shadow-lg "> 
        <Text className="font-bold color-white">{props.nomeTurma}</Text>
        <MaterialIcons name={props.icone} size={50} color="white" className="p-5"/>
        <Text className="font-bold color-white">{props.qtdAlunos}</Text>
    </View>)
}