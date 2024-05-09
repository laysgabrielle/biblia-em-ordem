import { Link, Href } from "expo-router";
import { Text, TextInput, View } from "react-native";
import React, {useState} from "react";
import CardTurma from "../../../components/card-turma";
import "../../../styles/global.css";


export default function Formulario(){
    const nomesTurmas={
        turma1:"Abraão",
        turma2:"Sara",
        turma3:"Amós e Miriã",
        turma4:"Samuel",
    }
     
    return(
        
        <View className="mx-4 mt-20">
             <View className="mx-7 mt-16 mb-1 ">
                <TextInput className="bg-blue-accent rounded-xl color-white p-3" placeholder="Search"/>           
            </View> 
            <View className="flex-wrap flex-row justify-evenly items-center">   
              {Object.values(nomesTurmas).map((nomeTurma, index) => (
                <Link className="m-3" key={index} href={{
                    pathname: "/formulario/[id]" as Href<string>,
                    params: { id: nomeTurma },
                  }}>
                    <CardTurma nomeTurma={nomeTurma}/>
                </Link>
            ))}
            </View>
        </View>
    ) 
}