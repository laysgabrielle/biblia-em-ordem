import { useState } from "react";
import { View, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type props = {
    nomeAluno: string;
    estaMarcado: boolean;
    checkboxEnabled: boolean;
    onPress: () => void;
}

export default function AlunoChamada(props: props){

    return(
        <View className="bg-blue-accent rounded-xl p-6 flex-row justify-between m-1" style={{width: 330,}}>
            <Text className="color-white">{props.nomeAluno}</Text>
            {props.checkboxEnabled && <BouncyCheckbox isChecked={props.estaMarcado} onPress={props.onPress} />}
        </View>
    )
}