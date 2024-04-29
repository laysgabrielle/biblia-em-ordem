import "../../../styles/global.css";
import { Text, TextInput, View } from "react-native";
import React, {useState, useEffect} from "react";
import CardTurma from "../../../components/card-turma";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import db from "../../../../firebase/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function Turmas(){
    const [nomesTurmas, setNomesTurmas] = useState([]);
    useEffect(() => {
        /**
         * Função que busca as turmas no banco de dados, é usado pra concatenar os nomes das turmas
         * nas rotas pra obter os alunos por turmas.
         */
        const getTurmas = async () => {
            try{
                console.log("Entrou na função getTurmas");
                const turmas = collection(db, "turmas");
                const q = query(turmas);
                const querySnapshot = await getDocs(q);
                let arrayHelperTurmas = [];
                querySnapshot.forEach((doc) => {arrayHelperTurmas.push(doc.data().nome);
                console.log("doc" + doc)});
                setNomesTurmas(arrayHelperTurmas);
                console.log("Nomes das turmas: " + arrayHelperTurmas);
        } catch (e) {
                console.log(e);
        }
    }
    getTurmas();
}, []);  
    //console.log(nomesTurmas);

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