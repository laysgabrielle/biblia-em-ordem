import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Pressable, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import { db } from "../../../../firebase/firebaseConfig.js";
import { collection, addDoc, getDocs, query, where, doc, DocumentReference, deleteDoc, Timestamp } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import CardInfoForm from '../../../components/card-info-form';
import Checkbox from '../../../components/checkbox-form';

export default function id() {
    //Início das variáveis de estado

    const [achouCampos, setAchouCampos] = useState(true);

    const [inputModal, setInputModal] = useState('');

    const [checkQtdModal, setCheckQtdModal] = useState(false);
    const [checkMoneyModal, setCheckMoneyModal] = useState(false);

    const [typeCard, setTypeCard] = useState<number[]>();

    //Define a visibilidade do modal
    const [visibleModal, setVisibleModal] = useState(false);

    const [cardsCriados, setCardsCriados] = useState<number>(0)

    const [inputs, setInputs] = useState<Input[]>([]);

    interface Input {
        value: number | null;
        title: string;
        isQtd: boolean;
        idDoc: string;
    }
    //Fim das variáveis de estado

    const { id } = useLocalSearchParams() // recebe o nome do doc turma como id
    const geraRef = (id: string | undefined | string[]) => {
        if (typeof id === 'string') {
            const ref = doc(db, "turmas", id);
            return ref;
        }
        else {
            console.log("O id não recebeu uma string")
        }
    }

    const router = useRouter(); // para usar o método dismiss()

    const geraInput = (isQtd: boolean, title: string) => {
        setInputs([...inputs, {
            value: 0,
            title: title,
            isQtd: isQtd,
            idDoc: "",
        }]);
    }

    const handlerDataEachInput = (index: number, value: number | null) => {
        const campos = [...inputs]
        campos[index].value = value
        setInputs(campos)
    }

    const campos = collection(db, "campos_form");
    const getCampos = async () => {
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

        }

    }


    useEffect(() => {
        getCampos();
    }, [cardsCriados]);


    const refresh = () => {
        if (inputs.length == 0)
            getCampos();
        else
            setAchouCampos(true);

    }

    const sendData = async () => {
        console.log("Entrou na função send data");
        const data: { [key: string]: any } = {};
        inputs.forEach((input, index) => {
            if (input.value !== undefined && input.value !== null) {
                let title = input.title;
                data[title] = input.value;
            }
        });
        data["turma_referente"] = geraRef(id);
        data["dia_letivo"] = Timestamp.now();

        await addDoc(collection(db, "dados_obtained"), data);
        console.log("Criou novo doc");
    };


    interface Option {
        text: string;
        id: number;
    };

    const optionsType: Option[] = [{ text: 'Quantidade', id: 0 }, { text: 'Monetário', id: 1 },];

    const createNewCard = (title: String, type: number[] | undefined) => {
        const camposRef = collection(db, "campos_form");
        let type_final = true;
        let title_final;
        let value = 0;

        if (type !== undefined) {
            if (type[0] === 0) {
                type_final = true;
            } else if (type[0] === 1) {
                type_final = false;
            }
        }

        if (title === undefined) {
            title_final = 'Novo Campo';
        }
        else {
            title_final = title;
        }

        const novoDoc = {
            title: title_final,
            isQtd: type_final,
            value: value,
        };

        addDoc(camposRef, novoDoc)
            .then(() => {
                console.log("Sucesso ao enviar");
            })
            .catch((error) => {
                console.error("Erro ao enviar:", error);
            });
        setCardsCriados((number) => number + 1)
        setVisibleModal(false)
    };

    const deleteCard = (idDoc: string) => {
        const camposRef = collection(db, 'campos_form');
        const docRef = doc(camposRef, idDoc);

        deleteDoc(docRef).then(() => {
            console.log('Documento deletado com sucesso!');
        }).catch((error) => {
            console.error('Erro ao deletar documento:', error);
        });
        setCardsCriados((number) => number - 1);
    }



    return (
        <View className="bg-gray-base flex flex-1">
            <PaperProvider>
                <SafeAreaView className="flex-col items-center justify-center mt-14 ">
                    <View className="flex-row items-center justify-between" style={{ width: 342 }}>
                        <View>
                            <TouchableOpacity onPress={() => router.dismiss()}>
                                <AntDesign name="arrowleft" size={35} color="#152E45" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Pressable
                                style={({ pressed }) => [{ backgroundColor: pressed ? '#F7900B' : '#152E45' },
                                { alignSelf: 'center', padding: 20, borderRadius: 8, marginTop: 10 }]} onPress={() => {
                                    sendData()
                                }}>
                                <Text style={{ color: 'white', }}>Enviar</Text>
                            </Pressable>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => setVisibleModal(true)}>
                                <Ionicons name="add-circle-outline" size={35} color="#152E45" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Portal>
                            <Modal visible={visibleModal}
                                contentContainerStyle={styles.containerModal}
                                dismissable={false}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{}}>
                                        <TouchableOpacity onPress={() => setVisibleModal(false)}>
                                            <AntDesign name="arrowleft" size={35} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{}}>
                                        <Text style={[styles.textModal, { fontSize: 15 }]}>Novo Cartão</Text>
                                    </View>
                                    <View style={{ width: 35 }}></View>
                                </View>
                                <View style={{ padding: 15, }}>
                                    <Text style={styles.textModal}>Categoria:</Text>
                                    <TextInput cursorColor='black'
                                        style={[{ marginBottom: 5 }, styles.modalInput]}
                                        value={inputModal}
                                        onChangeText={(text) => setInputModal(text)}
                                    ></TextInput>
                                    <Text style={styles.textModal}>Tipo:</Text>
                                    <Checkbox options={optionsType} onChange={(op) => setTypeCard(op)} />
                                </View>
                                <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={() => {
                                    createNewCard(inputModal, typeCard);
                                }}>
                                    <AntDesign name="check" size={35} color="white" />
                                </TouchableOpacity>
                            </Modal>
                        </Portal>
                    </View>
                    <View style={{ height: '95%' }}>
                        <ScrollView>
                            {achouCampos ? inputs.map((item, index) => {
                                return (
                                    <CardInfoForm title={item.title} value={item.value} isQtd={item.isQtd}
                                        onValueChange={handlerDataEachInput} id={index} key={index}
                                        idDoc={item.idDoc} onDelete={deleteCard}
                                    />
                                )
                            })
                                :
                                <View>
                                    <Text className="text-center p-6">Nenhum campo encontrado.</Text>
                                    <Pressable className="flex-row justify-center items-center bg-blue-accent rounded-lg mt-4" onPress={refresh}>
                                        <MaterialIcons name="refresh" size={48} color="white" />
                                        <Text className="color-white">Recarregar</Text>
                                    </Pressable>
                                </View>
                            }
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </PaperProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    containerModal: {
        backgroundColor: '#152E45',
        padding: 10,
        alignSelf: 'center',
        width: 270,
        height: 300,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',

    },
    modalInput: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        alignSelf: 'center',

    },
    textModal: {
        color: 'white',
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
})