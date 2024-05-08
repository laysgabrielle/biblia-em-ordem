import React from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import CardInfoForm from "../../../components/card-info-form"
import { useLocalSearchParams, useNavigation } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter} from "expo-router";
import { Modal, Portal, PaperProvider } from 'react-native-paper';




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
    const containerStyle = {backgroundColor: 'white', padding: 20,};

    return (
            <PaperProvider>
                <SafeAreaView className="flex-grow items-center justify-center mt-10">
                <View className="flex-row items-center justify-between" style={{width:342}}>
                    <View>
                        <TouchableOpacity onPress={()=>router.dismiss(1)}>
                            <AntDesign name="arrowleft" size={35} color="#152E45"/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Ionicons name="add-circle-outline" size={35} color="#152E45" onPress={showModal}/>
                    </View>
                </View>
                             <Portal >
                                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                                </Modal>
                            </Portal>
               
                <ScrollView>
                    {Object.values(data).map((card,index)=>{return <CardInfoForm title={card[0]} typeValue={card[1]} key={index}/>})}
                </ScrollView>
                </SafeAreaView>
            </PaperProvider>
    )
}