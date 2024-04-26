import { useEffect, useState } from "react";

import AlunoChamada from "../../../components/aluno-chamada";
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import db from "../../../../firebase/firebaseConfig";
import { collection, getDocs, query, where, doc } from "firebase/firestore";

//#region Funções de apoio para o mês atual e os domingos
const MesAtual = EncontraMesAtual();

function EncontraMesAtual() {
    switch (new Date().getMonth()) {
        case 0:
            return "Janeiro";
        case 1:
            return "Fevereiro";
        case 2:
            return "Março";
        case 3:
            return "Abril";
        case 4:
            return "Maio";
        case 5:
            return "Junho";
        case 6:
            return "Julho";
        case 7:
            return "Agosto";
        case 8:
            return "Setembro";
        case 9:
            return "Outubro";
        case 10:
            return "Novembro";
        case 11:
            return "Dezembro";
        default:
            return "Mês inválido";
    }
}

const Hoje = new Date().getDate;
const Domingos = EncontraDomingos();

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function EncontraDomingos() {
    var Mes = new Date();
    var getTotalDias = daysInMonth(Mes.getMonth(), Mes.getFullYear());
    var arrayDomingos = new Array();

    for (var i = 1; i <= getTotalDias; i++) {
        var newDate = new Date(Mes.getFullYear(), Mes.getMonth(), i)
        if (newDate.getDay() == 0) {
            arrayDomingos.push(i);
        }
    }

    return arrayDomingos;
}
//#endregion


export default function id() {
    const local = useLocalSearchParams();
    //#region Chamada de alunos no firebase
    const nomeTurma = local.id; //Nome passado como parametro na rota
    const [dados, setDados] = useState([]);
    /**
     * Concatena o nome da turma com a string "turma" para obter a referência da turma no BD.
    */
    const turmaDocRef = doc(db, "turmas", "turma"+nomeTurma);
    /**
     * Busca conforme a referência de turma passada.
     */
    const q = query(collection(db, "alunos"), where("turma_associada", "==", turmaDocRef));

    useEffect(() => {
        /**
         * Mapeia os alunos no array 'dados'.
         */
        const fetchDataAlunos = async () => {
            try {
                const querySnapshot = await getDocs(q);
                const dataVz = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDados(dataVz);
            }
            catch (e) {
                console.log(e);
            }
        };

        fetchDataAlunos();
    }, []);
    //#endregion

    return (
        <View>
            {/* TODO: Refatorar como componente */}
            <View className="justify-center items-center bg-blue-accent m-12 mb-0 rounded-lg ">
                <Text className="color-white pt-3 p-0 mb-3">{MesAtual.toUpperCase()}</Text>
                <View className="flex-row">
                    {Domingos.map((domingo, index) => (
                        <Pressable key={index} className="min-w-10 min-h-10 my-3 mx-2 rounded-full justify-center items-center bg-orange-base"
                            style={{
                                backgroundColor: Domingos.includes(Hoje) ? "orange" : "white",
                                borderColor: "orange", borderWidth: 2, borderStyle: "solid",
                            }}>
                            <Text className=" color-white"
                                style={{ color: Domingos.includes(Hoje) ? "white" : "black", }}>
                                {domingo}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
            <View className="justify-center items-center ">
                <Text className="mt-10 font-bold color-blue-accent">TURMA {local.id.toLocaleUpperCase()}</Text>
                <ScrollView>
                    {
                        dados.map(dado => (
                            <AlunoChamada nomeAluno={dado.nome} key={dado.id} />
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}