import React from 'react'
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import CardInfoForm from "../../components/card-info-form"


export default function Formulario(){
    return (
        <SafeAreaView className="flex-1 items-center justify-center">
            <ScrollView className="">
                <CardInfoForm title='Bíblias' typeValue='Qtd' maxLength='3'/>
                <CardInfoForm title='Revistas' typeValue='Qtd' maxLength='3'/>
                <CardInfoForm title='Visitantes' typeValue='Qtd' maxLength='3'/>
                <CardInfoForm title='Retardatários' typeValue='Qtd' maxLength='3'/>
                <CardInfoForm title='Ofertas' typeValue='R$' maxLength='5'/>
            </ScrollView>
        </SafeAreaView>
        
    )
}