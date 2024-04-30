import "../../../styles/global.css";
import { Text, TextInput, View } from "react-native";
import React from "react";
import CardTurma from "../../../components/card-turma";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";


//dummy data
const nomesTurmas = {
    turma1: "Abraão",
    turma2: "Sarah",
    turma3: "Amós e Miriã",
    turma4: "Samuel"
}



// my-14 flex-1 flex-row flex-wrap justify-evenly items-center mb-0 mt-2

export default function Turmas(){
    return (
        <View className="mx-4 mt-20">
             <View className="mx-7 mt-16 mb-1 ">
                <TextInput className="bg-blue-accent rounded-xl color-white p-3" placeholder="Search"/>           
                </View> 
            <View className="flex-wrap flex-row justify-evenly items-center">   
              {Object.values(nomesTurmas).map((nomeTurma, index) => (
                <Link className="m-3" key={index} href={{
                    pathname: "/turmas/[id]",
                    params: { id: nomeTurma }
                  }} onPress={() => { console.log(nomeTurma) }} options={{headerShown: false,}}>
                    <CardTurma nomeTurma={nomeTurma}/>
                </Link>
            ))}
            </View>
        </View>
    )
}