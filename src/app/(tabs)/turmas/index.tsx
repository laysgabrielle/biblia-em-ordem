import "../../../styles/global.css";
import { Pressable, Text, TextInput, View } from "react-native";
import React, {useState, useEffect} from "react";
import CardTurma from "../../../components/card-turma";
import { MaterialIcons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import db from "../../../../firebase/firebaseConfig.js";
import { collection, getDocs, query } from "firebase/firestore";

export default function Turmas(){
    const [nomesTurmas, setNomesTurmas] = useState<string[]>([]);
    const [achouTurmas, setAchouTurmas] = useState(false);

    const getTurmas = async () => {
        try{
            console.log("Entrou na função getTurmas");
            const turmas = collection(db, "turmas");
            const q = query(turmas);
            const querySnapshot = await getDocs(q);
            let arrayHelperTurmas: string | React.SetStateAction<any[]> = [];
            querySnapshot.forEach((doc) => {arrayHelperTurmas.push(doc.data().nome);
            console.log("doc" + doc)});
            setNomesTurmas(arrayHelperTurmas);
            console.log("Nomes das turmas: " + arrayHelperTurmas);
    } catch (e) {
            console.log(e);
    } finally {
        if(nomesTurmas.length == 0){
            setAchouTurmas(false);
        } else {
            setAchouTurmas(true);
        }
            
    }

    }
    useEffect(() => {
        getTurmas();
    }, []);

    //console.log(nomesTurmas);

    return (
        <View className="mx-4 mt-20">
             <View className="mx-7 mt-16 mb-1 ">
                <TextInput className="bg-blue-accent rounded-xl color-white p-3" placeholder="Search"/>           
                </View> 
           { achouTurmas ? <View className="flex-wrap flex-row justify-evenly items-center">   
              {Object.values(nomesTurmas).map((nomeTurma, index) => (
                <Link className="m-3" key={index} href={{
                    pathname: "/turmas/[id]" as Href<string>,
                    params: { id: nomeTurma }
                  }} onPress={() => { console.log(nomeTurma) }} 
                //   options={{headerShown: false,}}
                  >
                    <CardTurma nomeTurma={nomeTurma} icone="book"/>
                </Link>
            ))} 
            </View> :
            <View>
                <Text className="text-center p-6">Nenhuma turma encontrada.</Text>
                <Pressable className="flex-row justify-center items-center bg-blue-accent rounded-lg mt-4" onPress={getTurmas}>
                    <MaterialIcons name="refresh" size={48} color="white" />
                    <Text className="color-white">Recarregar</Text>
                
                
                </Pressable>
            </View>
            }
        </View>
    )
}