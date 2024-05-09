import "../../../styles/global.css";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import React, {useState, useEffect} from "react";
import CardTurma from "../../../components/card-turma";
import { MaterialIcons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
<<<<<<< HEAD
import db from "../../../../firebase/firebaseConfig.js";
import { collection, getDocs, query } from "firebase/firestore";
=======
import db from "../../../../firebase/firebaseConfig";
import { collection, deleteDoc, getDocs, query, doc, setDoc } from "firebase/firestore";
import { FloatingAction } from "react-native-floating-action";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import MAdicionarTurma from "../../../components/m-adicionar-turma";
import BouncyCheckbox from "react-native-bouncy-checkbox";
>>>>>>> 8d4d490f65e7b628948dc4073f4e981e3fb4fd21

export default function Turmas(){
    const [nomesTurmas, setNomesTurmas] = useState<string[]>([]);
    const [achouTurmas, setAchouTurmas] = useState(true);
    const [modalAdicionarVisible, setModalAdicionarVisible] = useState(false);
    const [modalDeletarVisible, setModalDeletarVisible] = useState(false);
    const [modalEditarVisible, setModalEditarVisible] = useState(false);


    const getTurmas = async () => {        
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
    useEffect(() => {
        getTurmas();
    }, []);

    const refresh = () => {
        if(nomesTurmas.length == 0)
            getTurmas();
        else
            setAchouTurmas(true);
        
    }
    //console.log(nomesTurmas);

    const actions = [
        {
            text: "Adicionar Turma",
            icon: <MaterialIcons name="person-add" size={24} color="white" />,
            name: "bt_add_turma",
            position: 1,
            color: "#F7900B",
        },
        {
            text: "Deletar Turma",
            icon: <MaterialIcons name="delete-outline" size={24} color="white" />,
            name: "bt_deleta_turma",
            position: 2,
            color: "#F7900B",
        },        {
            text: "Editar Turma",
            icon: <MaterialIcons name="edit" size={24} color="white" />,
            name: "bt_edita_turma",
            position: 3,
            color: "#F7900B",
        },
    ];

    const [turmaToDelete, setTurmaToDelete] = useState<string[]>([]);
    const deleteTurma =  () => {
        console.log("Deletando turma ");
        turmaToDelete.forEach(async turma => {
            const turmaDocRef = doc(db, "turmas", "turma"+turma);
            await deleteDoc(turmaDocRef);
        });
        console.log("Turma deletada com sucesso");
        getTurmas();
    }

    const handleCheckboxDelete = (id: string) => {
        if(!turmaToDelete.includes(id)){
            turmaToDelete.push(id);
            console.log(turmaToDelete);    
        } else {
            //Remove o id do aluno do array de faltas
            turmaToDelete.splice(turmaToDelete.indexOf(id), 1);
            console.log(turmaToDelete);
        }
    }



    const [textoDoTextInput, setTextoDoTextInput] = useState('');
    const handleInputChange = (novoTexto: string) => {
        setTextoDoTextInput(novoTexto);
    };
    const createTurma = async () => {
        console.log("Criando turma " + textoDoTextInput);
        await setDoc(doc(db, "turmas", "turma"+textoDoTextInput), {
            nome: textoDoTextInput,        
        });
        console.log("Turma criada com sucesso");
        getTurmas();
    }

    return (
        <PaperProvider>
        <View className="flex-1 mx-4 mt-20">
             <View className="mx-7 mt-16 mb-1 ">
                <TextInput className="bg-blue-accent rounded-xl color-white p-3" placeholder="Search"/>           
                </View> 
           { achouTurmas ? <View className="flex-wrap flex-row justify-evenly items-center">   
              {Object.values(nomesTurmas).map((nomeTurma, index) => (
                <Link className="m-3" key={index} href={{
                    pathname: "/turmas/[id]" as Href<string>,
                    params: { id: nomeTurma }
                  }} onPress={() => { console.log(nomeTurma) }} 
                //   options={{headerShown: false,}}
                  >
                    <CardTurma deletar={() => console.log("qa")} temPermissao={true} nomeTurma={nomeTurma} icone="book"/>
                </Link>
            ))} 
            </View> :
            <View>
                <Text className="text-center p-6">Nenhuma turma encontrada.</Text>
                <Pressable className="flex-row justify-center items-center bg-blue-accent rounded-lg mt-4" onPress={refresh}>
                    <MaterialIcons name="refresh" size={48} color="white" />
                    <Text className="color-white">Recarregar</Text>
                
                
                </Pressable>
            </View>
            }
                                <Portal>
                        <Modal visible={modalDeletarVisible} onDismiss={() => setModalDeletarVisible(false)}>
                            <View className="bg-blue-dark bg-opacity-95 rounded-xl p-2 shadow-lg m-16 shadow-black drop-shadow-md justify-center items-center" style={{width: 285}}>
                                <Text className="color-white">Qual turma deseja deletar?</Text>
                                <FlatList 
                                data={nomesTurmas} 
                                renderItem={({item}) =>
                                <View className="flex-row justify-between"> 
                                    <Text className="color-white p-3" >{item}</Text>
                                    <BouncyCheckbox isChecked={false} onPress={() => handleCheckboxDelete(item)} /> 
                                    </View>
                                }>
                                </FlatList>
                                <View className="flex-row justify-center items-center">
                                    <Pressable className="p-3 m-3" onPress={() => deleteTurma()}>
                                        <MaterialIcons name="check" size={24} color="white"/>
                                    </Pressable>
                                    <Pressable className="p-3 m-3" onPress={() => setModalDeletarVisible(false)}>
                                        <MaterialIcons name="close" size={24} color="white"/>
                                    </Pressable>
                                    </View>
                            </View>
                        </Modal>
                    </Portal>
            <Portal>
                <Modal visible={modalAdicionarVisible} onDismiss={() => setModalAdicionarVisible(false)}>
                    <MAdicionarTurma salvarTurma={createTurma} onInputChange={handleInputChange}/>
                </Modal>
            </Portal>
        </View>
            <View style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
            }}>
                <FloatingAction actions={actions} onPressItem={name => 
                    {if(name == "bt_add_turma"){setModalAdicionarVisible(true)} 
                    else if(name == "bt_deleta_turma"){setModalDeletarVisible(true)} }
                    } color="#152E45" distanceToEdge={{vertical: 30, horizontal:30}}/>
            </View>
        </PaperProvider>
    )
}