import { useEffect, useState } from "react";

import AlunoChamada from "../../../components/aluno-chamada";
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";

import {db} from "../../../../firebase/firebaseConfig.js";
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion, deleteDoc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { MesAtual, Hoje, Domingos } from "../../../helpers/domingos";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import MAdicionarAluno from "../../../components/m-adicionar-aluno";


const actions = [
    {
        text: "Adicionar Aluno",
        textStyle: {padding: 1, fontSize: 16, margin: 0,},
        icon: <MaterialIcons name="person-add" size={24} color="white" />,
        name: "bt_add_aluno",
        position: 2,
        color: "#F7900B",
        buttonSize: 42,
    },
    {
        text: "Salvar frequência",
        textStyle: {padding: 1, fontSize: 16, margin: 0,},
        icon: <MaterialIcons name="save" size={24} color="white" />,
        name: "bt_salvar_frequencia",
        position: 1,
        color: "#F7900B",
        buttonSize: 42,
    },
    {
        text: "Editar alunos",
        textStyle: {padding: 1, fontSize: 16, margin: 0,},
        icon: <MaterialIcons name="edit" size={24} color="white" />,
        name: "bt_editar_aluno",
        position: 3,
        color: "#F7900B",
        buttonSize: 42,
    }
];




//#region Funções de apoio para a chamada de alunos

//#endregion



export default function id() {
    const local = useLocalSearchParams();
    //#region Chamada de alunos no firebase
    const nomeTurma = local.id; //Nome passado como parametro na rota
    const [dados, setDados] = useState<any[]>([]);
    /**
     * Concatena o nome da turma com a string "turma" para obter a referência da turma no BD.
    */
   const turmaDocRef = doc(db, "turmas", "turma"+nomeTurma);
   console.log("Isso consulta " + turmaDocRef);
   /**
    * Busca conforme a referência de turma passada.
    */
   const q = query(collection(db, "alunos"), where("turma_associada", "==", turmaDocRef));
   console.log("Isso consulta " + q);
   /**
    * Mapeia os alunos no array 'dados'.
    */
   const fetchDataAlunos = async () => {
       try {
           const querySnapshot = await getDocs(q);
           const dataVz = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
           setDados(dataVz);
           console.log("Logando " + dataVz);
       }
       catch (e) {
           console.log(e);
       }
   };

   useEffect(() => {
        fetchDataAlunos();
    }, []);
    //#endregion

    const [estaMarcado, setEstaMarcado] = useState(false);
    const faltasDoDia: Array<Object> = [];
    /**
     * Adiciona os alunos marcados para o array de faltas do dia.
     * @param {*} id 
     */
    const handleCheckbox = (id: string) => {
        if(!faltasDoDia.includes(id)){
            faltasDoDia.push(id);
            console.log(faltasDoDia);    
        } else {
            //Remove o id do aluno do array de faltas
            faltasDoDia.splice(faltasDoDia.indexOf(id), 1);
            console.log(faltasDoDia);
        }
    }
    /**
     * Função que seta as faltas no banco de dados.
     */
    //TODO: Evitar registros duplicados.
    const salvaFrequencia = () => {
        console.log("Setar faltas pressed");
        faltasDoDia.forEach(async element => {
            const alunoDocRef = doc(db, "alunos", element.toString());
            await updateDoc(alunoDocRef, { faltas: arrayUnion(new Date()) }), 
            console.log("Falta registrada"),
            setCheckboxEnabled(false);
    })
    }
    const [modalEditarAluno, setModalEditarAluno] = useState(false);
    const [getIdAluno, setIdAluno] = useState<string>("");

    const handleEditarAluno = (id_aluno: string) => {
        setModalEditarAluno(true);
        setIdAluno(id_aluno);
    }

    const [checkboxEnabled, setCheckboxEnabled] = useState(true);
    const [editandoAluno, setEditandoAluno] = useState(false);
    const modoEditarAluno = () => {
        setEditandoAluno(!editandoAluno);
    }

    const deletarAluno = (id: string) => {
        const alunoDocRef = doc(db, "alunos", id);
        deleteDoc(alunoDocRef);
        fetchDataAlunos();
    }

    const [textNomeAluno, setTextNomeAluno] = useState('');
    const [textDataNascimento, setTextDataNascimento] = useState(new Date());
    const [modalAdicionarAluno, setModalAdicionarAluno] = useState(false);
    const salvaTextNomeAluno = (nomeAluno: string) => {
        setTextNomeAluno(nomeAluno);
    }    
    const salvaTextDataAluno = ( dataNascimento: Date) => {
        setTextDataNascimento(dataNascimento);
    }
    const salvaAluno = async () => {
        await addDoc(collection(db, "alunos"), {
            nome: textNomeAluno,
            dataNascimento: textDataNascimento,   
            faltas: [],
            turma_associada: turmaDocRef     
        });
        fetchDataAlunos();
    }

    const salvaEditAluno = async () => {
        
        await updateDoc(doc(db, "alunos", getIdAluno?.toString()), {
            nome: textNomeAluno,
            dataNascimento: textDataNascimento,     
        });
        fetchDataAlunos();
    }

    return (
        <PaperProvider>
        <View className="flex-1 bg-gray-base">

            {/* TODO: Refatorar como componente */}
            <View className="justify-center items-center bg-blue-accent m-12 mb-0 rounded-lg ">
                <Text className="color-white pt-3 p-0 mb-3">{MesAtual.toUpperCase()}</Text>
                <View className="flex-row">
                    {Domingos.map((domingo, index) => (
                        <Pressable key={index} className="min-w-10 min-h-10 my-3 mx-2 rounded-full justify-center items-center bg-orange-base"
                            style={{
                                backgroundColor: domingo == Hoje ? "orange" : "white",
                                borderColor: "orange", borderWidth: 2, borderStyle: "solid",
                            }}>
                            <Text className=" color-white"
                                style={{ color: domingo == Hoje ? "white" : "black", }}>
                                {domingo}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
            <View className="justify-center items-center ">
                <View className="flex-row justify-between items-baseline">
                    <Text className="mt-10 font-bold color-blue-accent">TURMA {local.id.toString().toLocaleUpperCase()}</Text>
                </View>
                <ScrollView>
                    {
                        dados.map(dado => (
                            <AlunoChamada 
                                deleteAluno={() => deletarAluno(dado.id)} 
                                modoEditar={editandoAluno} 
                                editarAluno={() => handleEditarAluno(dado.id)}
                                checkboxEnabled={checkboxEnabled} 
                                nomeAluno={dado.nome} 
                                key={dado.id} 
                                estaMarcado={estaMarcado} 
                                onPress={() => handleCheckbox(dado.id)} />
                        ))
                    }
                </ScrollView>
            </View>
            <View style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
            }}>
                
                <FloatingAction 
                buttonSize={56}
                color="#152E45"
                distanceToEdge={{vertical: 30, horizontal:30}}
                actions={actions}
                onPressItem={name => {
                    switch (name) {
                        case "bt_add_aluno":
                            setModalAdicionarAluno(true);
                            break;
                        case "bt_salvar_frequencia":
                            salvaFrequencia();
                            break;
                        case "bt_editar_aluno":
                            modoEditarAluno();
                            break;
                        default:
                            break;
                    }
                }}/>
            </View>
        </View>
        <Portal>
            <Modal visible={modalAdicionarAluno} onDismiss={() => setModalAdicionarAluno(false)}>
                <View className="bg-blue-dark bg-opacity-95 rounded-xl p-2 shadow-lg m-16 shadow-black drop-shadow-md justify-center items-center" style={{width: 285}}>
                    <MAdicionarAluno  onInputDataNascimentoChange={salvaTextDataAluno} onInputNomeChange={salvaTextNomeAluno} salvarAluno={salvaAluno}/>
                </View>
                </Modal>
        </Portal>
        <Portal>
            <Modal visible={modalEditarAluno} onDismiss={() => setModalEditarAluno(false)}>
                <View className="bg-blue-dark bg-opacity-95 rounded-xl p-2 shadow-lg m-16 shadow-black drop-shadow-md justify-center items-center" style={{width: 285}}>
                    <MAdicionarAluno onInputDataNascimentoChange={salvaTextDataAluno} onInputNomeChange={salvaTextNomeAluno} salvarAluno={() => salvaEditAluno()}/>
                </View>
                </Modal>
        </Portal>
        </PaperProvider>
    )
}