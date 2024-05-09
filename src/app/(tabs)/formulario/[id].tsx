import React from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import CardInfoForm from "../../../components/card-info-form"
import { useLocalSearchParams, useNavigation } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter} from "expo-router";
import {} from 'react-native'
import { Modal, Portal, PaperProvider, TextInput} from 'react-native-paper';



export default function id(){
    const data = {
        card1: ["Bíblias", "Qtd"],
        card2: ["Revistas", "Qtd"],
        card3: ["Visitantes", "Qtd"],
        card4: ["Retardatarios", "Qtd"],
        card5: ["Ofertas", "R$"],
    }

    const router = useRouter(); // para usar o método dismiss()

    const local = useLocalSearchParams();
    //#region Chamada de alunos no firebase
    const nomeTurma = local.id; //Nome passado como parametro na rota

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const styles = StyleSheet.create({
        containerModal:{
            backgroundColor: '#152E45', 
            padding: 10,
            alignSelf:'center',
            width:300,
            height:350,
            borderRadius:20,
            borderWidth:0.5,
            borderColor:'white',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-around'
        },
        modalInput:{
            backgroundColor:'white',
        },
        textModal:{
            color:'white',
            fontSize:13,
        },
    })

    return (
    <PaperProvider>
        <SafeAreaView className="flex-grow items-center justify-center mt-10">
        <View className="flex-row items-center justify-between" style={{width:342}}>
            <View>
                <TouchableOpacity onPress={()=>router.dismiss()}>
                    <AntDesign name="arrowleft" size={35} color="#152E45"/>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={showModal}>
                    <Ionicons name="add-circle-outline" size={35} color="#152E45"/>
                </TouchableOpacity>
            </View>
        </View>
            <View>
                <Portal>
                    <Modal visible={visible}
                    contentContainerStyle={styles.containerModal}
                    dismissable={false}
                    >
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{}}>
                            <TouchableOpacity onPress={hideModal} style={{}}>
                                <AntDesign name="arrowleft" size={35} color="white"/>
                            </TouchableOpacity>
                        </View>
                        <View style={{}}>
                            <Text style={[styles.textModal, {fontSize:15}]}>Novo Cartão</Text>
                        </View>
                        <View style={{width:35}}></View>
                    </View>
                    <View style={{padding:10,}}>
                        <Text style={styles.textModal}>Categoria:</Text>
                        <TextInput cursorColor='black' mode='outlined' activeOutlineColor='#000' 
                        textColor='black'
                        style={styles.modalInput}></TextInput>
                        <Text style={styles.textModal}>Tipo:</Text>
                        <TextInput cursorColor='black' mode='outlined' activeOutlineColor='#000' 
                        textColor='black'
                        style={styles.modalInput}></TextInput>
                    </View>
                    <TouchableOpacity style={{flexDirection:'row-reverse'}} onPress={hideModal}>
                        <AntDesign name="check" size={35} color="white" />
                    </TouchableOpacity>
                    </Modal>
                </Portal>
            </View>
        <ScrollView>
            {Object.values(data).map((card,index)=>{return <CardInfoForm title={card[0]} typeValue={card[1]} key={index}/>})}
        </ScrollView>
        </SafeAreaView>
    </PaperProvider>
    )
}