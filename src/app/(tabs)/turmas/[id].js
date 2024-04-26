import { useEffect, useState } from "react";

import AlunoChamada from "../../../components/aluno-chamada";
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import db from "../../../../firebase/firebaseConfig";
import { collection, getDocs, query, where, doc } from "firebase/firestore"; 


const alunos = [
    { id: 1, nome: "João", dataNascimento: "1995-03-15" },
    { id: 2, nome: "Maria", dataNascimento: "1996-07-20" },
    { id: 3, nome: "Pedro", dataNascimento: "1997-11-10" },
    { id: 4, nome: "Ana", dataNascimento: "1998-02-28" },
    { id: 5, nome: "Lucas", dataNascimento: "1999-05-12" },
    { id: 6, nome: "Julia", dataNascimento: "2000-08-06" },
    { id: 7, nome: "Mateus", dataNascimento: "2001-10-25" },
    { id: 8, nome: "Camila", dataNascimento: "2002-12-30" },
    { id: 9, nome: "Gabriel", dataNascimento: "2003-04-17" },
    { id: 10, nome: "Larissa", dataNascimento: "2004-09-22" },
    { id: 11, nome: "Felipe", dataNascimento: "1995-06-18" },
    { id: 12, nome: "Mariana", dataNascimento: "1996-09-30" },
    { id: 13, nome: "Rafael", dataNascimento: "1997-12-05" },
    { id: 14, nome: "Carolina", dataNascimento: "1998-03-21" },
    { id: 15, nome: "Gustavo", dataNascimento: "1999-07-08" },
    { id: 16, nome: "Fernanda", dataNascimento: "2000-10-14" },
    { id: 17, nome: "Matheus", dataNascimento: "2001-01-27" },
    { id: 18, nome: "Amanda", dataNascimento: "2002-05-10" },
    { id: 19, nome: "Bruno", dataNascimento: "2003-08-16" },
    { id: 20, nome: "Isabela", dataNascimento: "2004-11-29" }
];
//#region Funções de apoio para o mês atual e os domingos
const MesAtual = EncontraMesAtual();

function EncontraMesAtual() {  
    switch(new Date().getMonth()) {
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

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function EncontraDomingos() {
    var Mes = new Date();
    var getTotalDias = daysInMonth(Mes.getMonth(),Mes.getFullYear());
    var arrayDomingos = new Array();  
    
    for(var i=1;i<=getTotalDias;i++){    
        var newDate = new Date(Mes.getFullYear(),Mes.getMonth(),i)
        if(newDate.getDay()==0){  
            arrayDomingos.push(i);
        }    
    }

    return arrayDomingos;
}
//#endregion


export default function id()
{
    const local = useLocalSearchParams();
    const [dados, setDados] = useState([]);
    const turmaSamuelDocRef = doc(db, "turmas", "turmaSamuel");
    const q = query(collection(db, "alunos"), where("turma_associada", "==", turmaSamuelDocRef));
    
    useEffect(() => {
        const fetchDataAlunos = async () => {
            try {
                const querySnapshot = await getDocs(q);
                const dataVz = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDados(dataVz);
            }            
            catch(e) {
                console.log(e);
            }
        };

        fetchDataAlunos();
    }, []);








    return(
        <View>

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
                        style={{color: Domingos.includes(Hoje) ? "white" : "black",}}>
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