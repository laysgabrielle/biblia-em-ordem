import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


export default function CardTurma(props){
        return(<View className="justify-center items-center bg-blue-accent w-44 h-64 my-6 rounded-xl shadow-blue-dark shadow-lg "> 
        <Text className="font-bold color-white">{props.nomeTurma}</Text>
        <MaterialIcons name={props.icone} size={50} color="white" className="p-5"/>
        <Text className="font-bold color-white">{props.qtdAlunos}</Text>
        <MaterialIcons name="edit" size={23} color="orange" className="p-5" style={{
            position: 'absolute',
            bottom: 0,
            left: 95,
            right: 0,
        }}/>
    </View>)
}