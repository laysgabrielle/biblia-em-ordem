import { useState } from "react";
import { View, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function AlunoChamada(props){

    return(
        <View className="bg-blue-accent rounded-xl p-6 flex-row justify-between m-1" style={{width: 330,}}>
            <Text className="color-white">{props.nomeAluno}</Text>
            <BouncyCheckbox isChecked={props.estaMarcdo} onPress={props.onPress} />
        </View>
    )
}