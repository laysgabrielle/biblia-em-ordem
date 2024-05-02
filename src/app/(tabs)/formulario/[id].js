import React from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import CardInfoForm from "../../../components/card-info-form"
import { useLocalSearchParams, useNavigation } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter} from "expo-router";



export default function id(){
    const data = {
        card1: ["Bíblias", "Qtd"],
        card2: ["Revistas", "Qtd"],
        card3: ["Visitantes", "Qtd"],
        card4: ["Retardatarios", "Qtd"],
        card5: ["Ofertas", "R$"],
    }

    const router = useRouter();

    const local = useLocalSearchParams();
    //#region Chamada de alunos no firebase
    const nomeTurma = local.id; //Nome passado como parametro na rota
    return (
        <SafeAreaView className="flex-grow items-center justify-center mt-8">
            <View className="flex-row items-center justify-between" style={{width:'90%'}}>
                <View>
                    <TouchableOpacity onPress={()=>router.dismiss(1)}>
                        <AntDesign name="arrowleft" size={35} color="#152E45"/>
                    </TouchableOpacity>
                </View>
                <View><Ionicons name="add-circle-outline" size={35} color="#152E45" /></View>
            </View>
            <ScrollView>
                {Object.values(data).map((card,index)=>{return <CardInfoForm title={card[0]} typeValue={card[1]} key={index}/>})}
            </ScrollView>
        </SafeAreaView>
        
    )
}