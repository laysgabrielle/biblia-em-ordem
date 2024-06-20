import { Link } from "expo-router";
import { Text, TextInput, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import CardTurma from "../../../components/card-turma";
import "../../../styles/global.css";
import { Feather } from '@expo/vector-icons';
import { getTurmas } from "../../../helpers/turmas";


export default function Formulario() {
    const [nomesTurmas, setNomesTurmas] = useState<string[]>([]);
    const [achouTurmas, setAchouTurmas] = useState(true);
    const { usuarioLogado } = useContext(UserContext);
    const [estaCarregando, setEstaCarregando] = useState(false);

    useEffect(() => {
        getTurmas(nomesTurmas, setNomesTurmas, setAchouTurmas, setEstaCarregando);
        if (nomesTurmas.length > 0)
            setAchouTurmas(true);
    }, []);

    return (
        <View className="bg-gray-base flex flex-1 flex-col items-center justify-center">
            {usuarioLogado ? <View className="flex-1 mx-4 mt-48 bg-gray-base">
                {estaCarregando ? <View className="justify-center items-center">
                    <ActivityIndicator size="large" color="#F7900B" />
                </View>
                    :
                    <View className="flex-wrap flex-row justify-evenly items-center">
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
                }
            </View> :
                <View className="justify-center items-center">
                    <Feather name="alert-circle" size={24} color="#152E45"/>
                    <Text>Você precisa estar logado para acessar os formulários.</Text>
                </View>}
        </View>
    )
}