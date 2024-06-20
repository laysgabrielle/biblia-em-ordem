import { BarChart } from "react-native-gifted-charts";
import { View } from "react-native";
import db from "../../firebase/firebaseConfig.js";
import { collection, where, Timestamp, query, getDocs, getDoc } from "firebase/firestore";
import { Domingos } from "../helpers/domingos";
import { useEffect, useState } from "react";




const Grafico = () => {
    const [dadosObtained, setDadosObtained] = useState<any[]>([]);
    useEffect(() => {
        console.log("Entrou no useEffect")
        getDadosPorDia();
        tratarDados();
    }, []);
    
    async function getDadosPorDia() {
    try{    
        console.log("Entrou no getDadosPorDia")
        const q = query(
            collection(db, "dados_obtained"),
            where("dia_letivo", ">=", Timestamp.fromDate(new Date("2024-05-25"))),
            where("dia_letivo", "<=", Timestamp.fromDate(new Date("2024-05-27")))
        );
        const querySnapshot = await getDocs(q);
        const data = await Promise.all(querySnapshot.docs.map(async doc => {
            const fullDoc = await getDoc(doc.ref);
            return { id: doc.id, ...fullDoc.data() };
        }))
        setDadosObtained(data);
    }
        catch(e){
            console.log(e);
        }
    }
    
    function tratarDados(){
        console.log("Entrou no tratarDados")
        //Sort por biblias
        dadosObtained.sort((a, b) => b.biblias - a.biblias);
        dadosObtained.map((item) => {
            console.log(item.biblias + " " + item.turma_referente);
        });
        //Sort por visitantes
        dadosObtained.sort((a, b) => b.visitantes - a.visitantes);
        dadosObtained.map((item) => {
            console.log(item.visitantes + " " + item.turma_referente);
        });
    }
    const barraData = dadosObtained.map((item) => ({value: item.biblias}))
    return <BarChart data={barraData}/>;

};

export default Grafico;