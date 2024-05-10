import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type props = {
    nomeAluno: string;
    estaMarcado: boolean;
    checkboxEnabled: boolean;
    modoEditar: boolean;
    onPress: () => void;
    deleteAluno: () => void;
    editarAluno: () => void;
}

export default function AlunoChamada(props: props){

    return(
        <View className="bg-blue-accent rounded-xl p-6 flex-row justify-between m-1" style={{width: 330,}}>
            {props.modoEditar && <Pressable onPress={props.editarAluno}>
                <Text className="color-white">{props.nomeAluno}</Text>
             </Pressable>}
             {!props.modoEditar && <Text className="color-white">{props.nomeAluno}</Text>}   
            {props.checkboxEnabled && !props.modoEditar && <BouncyCheckbox isChecked={props.estaMarcado} onPress={props.onPress} />}
            {props.modoEditar && 
                <Pressable onPress={props.deleteAluno}>
                    <MaterialIcons name="delete-outline" size={24} color="#F7900B"/>
                </Pressable>}
        </View>
    )
}