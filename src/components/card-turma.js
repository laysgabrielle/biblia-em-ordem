<<<<<<< HEAD
import { View, Text, Pressable, TouchableHighlight } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {useState} from "react";


export default function CardTurma(props){
        const [temPermissao, setPermissao] = useState(false);

=======
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


export default function CardTurma(props){
>>>>>>> 0e49bdf1064024baf7a1d94cac94f6de649bdd16
        return(<View className="justify-center items-center bg-blue-accent w-44 h-64 my-6 rounded-xl shadow-blue-dark shadow-lg "> 
        <Text className="font-bold color-white">{props.nomeTurma}</Text>
        <MaterialIcons name={props.icone} size={50} color="white" className="p-5"/>
        <Text className="font-bold color-white">{props.qtdAlunos}</Text>
<<<<<<< HEAD
        <Pressable  disabled={temPermissao} style={{
                position: 'absolute',
                bottom: 0,
                left: 95,
                right: 0,}}>
            <MaterialIcons name="edit" size={23} color="orange" className="p-5" style={{
                color: temPermissao ? 'orange' : 'gray',
            }}/>

        </Pressable>

        <Pressable disabled={temPermissao} style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 95,}}>
            <MaterialIcons name="delete-outline" size={23} color="orange" className="p-5" style={{
                color: temPermissao ? 'orange' : 'gray',
            }}/>

        </Pressable>

=======
        <MaterialIcons name="edit" size={23} color="orange" className="p-5" style={{
            position: 'absolute',
            bottom: 0,
            left: 95,
            right: 0,
        }}/>
>>>>>>> 0e49bdf1064024baf7a1d94cac94f6de649bdd16
    </View>)
}