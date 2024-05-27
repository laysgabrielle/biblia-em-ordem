import { Link } from "expo-router";
import { Text, TextInput, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import CardTurma from "../../../components/card-turma";
import "../../../styles/global.css";
import { MaterialIcons } from "@expo/vector-icons";
import db from "../../../../firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { MesAtual, Hoje, Domingos } from "../../../helpers/domingos";


export default function Formulario() {
    const [nomesTurmas, setNomesTurmas] = useState<string[]>([]);
    const [achouTurmas, setAchouTurmas] = useState(true);

    const getTurmas = async () => {
        try {
            console.log("Entrou na função getTurmas");
            const turmas = collection(db, "turmas");
            const q = query(turmas);
            const querySnapshot = await getDocs(q);
            let arrayHelperTurmas: string | React.SetStateAction<any[]> = [];
            querySnapshot.forEach((doc) => {
                arrayHelperTurmas.push(doc.data().nome);
                console.log("doc" + doc)
            });
            setNomesTurmas(arrayHelperTurmas);
            setAchouTurmas(arrayHelperTurmas.length > 0);
            console.log("Nomes das turmas: " + arrayHelperTurmas);
        } catch (e) {
            console.log(e);
        } finally {
            if (nomesTurmas.length == 0) {
                setAchouTurmas(false);
            } else {
                setAchouTurmas(true);
            }

        }

    }

    useEffect(() => {
        getTurmas();
    }, []);


    const refresh = () => {
        if (nomesTurmas.length == 0)
            getTurmas();
        else
            setAchouTurmas(true);

    }
    return (

        <View className="mx-4 mt-20">
            <View className="mx-7 mt-16 mb-1 ">
                <TextInput className="bg-blue-accent rounded-xl color-white p-3" placeholder="Search" />
            </View>
            {achouTurmas ? <View className="flex-wrap flex-row justify-evenly items-center">
                {Object.values(nomesTurmas).map((nomeTurma, index) => (
                    <Link className="m-3" key={index} href={{
                        pathname: "/formulario/[id]",
                        params: { id: nomeTurma }
                    }} onPress={() =>
                        console.log(nomeTurma)
                    }
                    //   options={{headerShown: false,}}
                    >
                        <CardTurma deletar={() => console.log("qa")} temPermissao={true} nomeTurma={nomeTurma} icone="book" />
                    </Link>
                ))}
            </View>
                :
                <View>
                    <Text className="text-center p-6">Nenhuma turma encontrada.</Text>
                    <Pressable className="flex-row justify-center items-center bg-blue-accent rounded-lg mt-4" onPress={refresh}>
                        <MaterialIcons name="refresh" size={48} color="white" />
                        <Text className="color-white">Recarregar</Text>


                    </Pressable>
                </View>
            }

        </View>
    )
}