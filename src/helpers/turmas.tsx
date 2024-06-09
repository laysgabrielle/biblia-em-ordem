import React, {useState, useEffect} from "react";
import { collection, getDocs, query } from "firebase/firestore";
import db  from "../../firebase/firebaseConfig.js";

export const getTurmas = async (nomesTurmas: string[], setNomesTurmas: React.Dispatch<React.SetStateAction<string[]>>, achouTurmas: boolean, setAchouTurmas: React.Dispatch<React.SetStateAction<boolean>>) => {        
    try{
        console.log("Entrou na função getTurmas");
        const turmas = collection(db, "turmas");
        const q = query(turmas);
        const querySnapshot = await getDocs(q);
        let arrayHelperTurmas: string | React.SetStateAction<any[]> = [];
        querySnapshot.forEach((doc) => {arrayHelperTurmas.push(doc.data().nome);
        console.log("doc" + doc)});
        setNomesTurmas(arrayHelperTurmas);
        setAchouTurmas(arrayHelperTurmas.length > 0);
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