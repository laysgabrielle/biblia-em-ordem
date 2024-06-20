import { collection, addDoc, getDocs, query, where, doc, DocumentReference, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

interface Input {
    value: number | null;
    title: string;
    isQtd: boolean;
    idDoc: string;
}

export const getCampos = async (
    inputs: Input[],
    setInputs: React.Dispatch<React.SetStateAction<Input[]>>,
    setAchouCampos: React.Dispatch<React.SetStateAction<boolean>>,
    setEstaCarregando:React.Dispatch<React.SetStateAction<boolean>>
) => {
    const campos = collection(db, "campos_form");
    try {
        console.log("Entrou na função getCampos");
        const q = query(campos);
        const querySnapshot = await getDocs(q);
        let arrayHelperCampos: React.SetStateAction<any[]> = [];
        querySnapshot.forEach((doc) => {

            arrayHelperCampos.push({
                title: doc.data().title, idDoc: doc.id,
                value: doc.data().value, isQtd: doc.data().isQtd
            });
            console.log("doc " + doc.data().title);
            console.log("docRef: " + doc.id);


        });
        setInputs(arrayHelperCampos);

        setAchouCampos(arrayHelperCampos.length > 0);
        console.log("Campos " + arrayHelperCampos);
    } catch (e) {
        console.log(e);
    } finally {
        if (inputs.length == 0 || inputs.length == 0) {
            setAchouCampos(false);
        } else {
            setAchouCampos(true);
        }
        setEstaCarregando(false);

    }
}