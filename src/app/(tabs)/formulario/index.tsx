import { Link } from "expo-router";
import { Text, TextInput, View, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import CardTurma from "../../../components/card-turma";
import "../../../styles/global.css";
import { MaterialIcons } from "@expo/vector-icons";
import {db} from "../../../../firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { MesAtual, Hoje, Domingos } from "../../../helpers/domingos";


export default function Formulario() {
    const [nomesTurmas, setNomesTurmas] = useState<string[]>([]);
    const [achouTurmas, setAchouTurmas] = useState(true);
    const { usuarioLogado } = useContext(UserContext);
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
        <View className="bg-gray-base flex flex-1">
            {usuarioLogado ? <View className="flex-1 mx-4 mt-48 bg-gray-base">
                {achouTurmas ? <View className="flex-wrap flex-row justify-evenly items-center">
                    {Object.values(nomesTurmas).map((nomeTurma, index) => (
                        <Link className="m-3" key={index} href={{
                            pathname: "/formulario/[id]",
                            params: { id: nomeTurma }
                        }} onPress={() => { console.log(nomeTurma) }}
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
            </View> : 
            <View className="justify-center items-center mt-48">
            <Text>Você precisa estar logado para acessar os formulários.</Text>
            </View>}
        </View>
    )
}