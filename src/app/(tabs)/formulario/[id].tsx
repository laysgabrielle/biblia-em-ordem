import React, { useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import CardInfoForm from "../../../components/card-info-form"
import { useLocalSearchParams, useNavigation } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import { Modal, Portal, PaperProvider, TextInput } from 'react-native-paper';
import db from "../../../../firebase/firebaseConfig";
import { collection, addDoc, getDocs, query, where, doc, updateDoc, arrayUnion, setDoc, Timestamp, DocumentReference } from "firebase/firestore";
import { MesAtual, Hoje, Domingos } from "../../../helpers/domingos";



export default function id() {
    const styles = StyleSheet.create({
        containerModal: {
            backgroundColor: '#152E45',
            padding: 10,
            alignSelf: 'center',
            width: 300,
            height: 350,
            borderRadius: 20,
            borderWidth: 0.5,
            borderColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around'
        },
        modalInput: {
            backgroundColor: 'white',
        },
        textModal: {
            color: 'white',
            fontSize: 13,
        },
    })


    const data = {
        card1: ["Bíblias", "Qtd"],
        card2: ["Revistas", "Qtd"],
        card3: ["Visitantes", "Qtd"],
        card4: ["Retardatarios", "Qtd"],
        card5: ["Ofertas", "R$"],
    }


    const router = useRouter(); // para usar o método dismiss()

    //Define a visibilidade do modal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const sendData = async (biblias: number | undefined, revistas: number | undefined,
        visitantes: number, retardatarios: number | undefined,
        ofertas: number | undefined | null, referencia: DocumentReference | undefined) => {
        await addDoc(collection(db, "dados_obtained"), { //cria um doc em dados_obtained
            biblias: biblias,
            revistas: revistas,
            visitantes: visitantes,
            retardatarios: retardatarios,
            ofertas: ofertas,
            dia_letivo: Timestamp.now(),
            referencia: referencia,
            
        })
    }

    const {id} = useLocalSearchParams() // recebe o nome do doc turma como id
    const geraRef = (id: string | undefined | string[]) => {
        if (typeof id === 'string'){
            const ref = doc(db, "turmas", id);
            return ref;
        }
        else{
            console.log("O id não recebeu uma string")
        }
    }

    const [valorDoTextInput1, setValorDoTextInput1] = useState<number>(0)
    const handleInputChange1 = (novoValor: number) => {
        setValorDoTextInput1(novoValor)  
    }
    const [valorDoTextInput2, setValorDoTextInput2] = useState<number>(0)
    const handleInputChange2 = (novoValor: number) => {
        setValorDoTextInput2(novoValor) 
    }
    const [valorDoTextInput3, setValorDoTextInput3] = useState<number>(0)
    const handleInputChange3 = (novoValor: number) => {
        setValorDoTextInput3(novoValor)  
    }
    const [valorDoTextInput4, setValorDoTextInput4] = useState<number>(0)
    const handleInputChange4 = (novoValor: number) => {
        setValorDoTextInput4(novoValor)  
    }

    const [valorDoCurrencyInput, setValorDoCurrencyInput] = useState<number | null>(0)
    const handleCurrencyInputChange = (novoValor: number | null) => {
        setValorDoCurrencyInput(novoValor)
    }
    return (
        <PaperProvider>
            <SafeAreaView className="flex-grow items-center justify-center mt-10">
                <View className="flex-row items-center justify-between" style={{ width: 342 }}>
                    <View>
                        <TouchableOpacity onPress={() => router.dismiss()}>
                            <AntDesign name="arrowleft" size={35} color="#152E45" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={showModal}>
                            <Ionicons name="add-circle-outline" size={35} color="#152E45" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Portal>
                        <Modal visible={visible}
                            contentContainerStyle={styles.containerModal}
                            dismissable={false}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{}}>
                                    <TouchableOpacity onPress={hideModal} style={{}}>
                                        <AntDesign name="arrowleft" size={35} color="white" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{}}>
                                    <Text style={[styles.textModal, { fontSize: 15 }]}>Novo Cartão</Text>
                                </View>
                                <View style={{ width: 35 }}></View>
                            </View>
                            <View style={{ padding: 10, }}>
                                <Text style={styles.textModal}>Categoria:</Text>
                                <TextInput cursorColor='black' mode='outlined' activeOutlineColor='#000'
                                    textColor='black'
                                    style={styles.modalInput}></TextInput>
                                <Text style={styles.textModal}>Tipo:</Text>
                                <TextInput cursorColor='black' mode='outlined' activeOutlineColor='#000'
                                    textColor='black'
                                    style={styles.modalInput}></TextInput>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={hideModal}>
                                <AntDesign name="check" size={35} color="white" />
                            </TouchableOpacity>
                        </Modal>
                    </Portal>
                </View>
                <Text>Fomulário da turma: {id}</Text>
                <ScrollView>
                    {/*Object.values(data).map((card, index) => {return})*/}
                    <CardInfoForm title={data.card1[0]}
                        onInputChange={handleInputChange1} onValueChange={handleCurrencyInputChange} type={data.card1[1]} key={0} />
                    <CardInfoForm title={data.card2[0]}
                        onInputChange={handleInputChange2} onValueChange={handleCurrencyInputChange} type={data.card2[1]} key={1} />
                    <CardInfoForm title={data.card3[0]}
                        onInputChange={handleInputChange3} onValueChange={handleCurrencyInputChange} type={data.card3[1]} key={2} />
                    <CardInfoForm title={data.card4[0]}
                        onInputChange={handleInputChange4} onValueChange={handleCurrencyInputChange} type={data.card4[1]} key={3} />
                    <CardInfoForm title={data.card5[0]}
                        onInputChange={handleInputChange1} onValueChange={handleCurrencyInputChange} type={data.card5[1]} key={4} />
                    <Pressable onPress={() => {
                        sendData(valorDoTextInput1, valorDoTextInput2, 
                        valorDoTextInput3, valorDoTextInput4, valorDoCurrencyInput, geraRef(id))
                    }}><Text>Enviar</Text></Pressable>
                </ScrollView>
            </SafeAreaView>
        </PaperProvider>
    )
}