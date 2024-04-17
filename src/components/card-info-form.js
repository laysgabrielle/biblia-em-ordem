import { Text, View, TextInput, Button } from "react-native";
import React, {useState} from 'react';

function CardInfoForm(props){

    let typeValue = props.typeValue
    function maskQtd(value){
        value = value.replace(/\D/g, "")
        return value
    }
    function maskMoney(value){
        value = value.replace(/[^,\d]/, "")
        return value
    }

    const [state, onChangeState] = React.useState('');
    return (
            <View className="flex-row rounded-md items-center p-6 justify-between m-2 shadow-x1 shadow-black "
            style={{
                width: 342,
                height: 110,
                backgroundColor: 'rgb(21, 46, 69)',
            }}
            >
                <View>
                    <Text className="border-t-2 border-white pt-2 mb-12 font-bold text-xl" 
                    style={{color: 'rgb(185, 193, 199)',
                    width:167}}>
                            {props.title}
                    </Text>
                </View>
                <View>
                <Text className="" 
                    style={{color: 'rgb(185, 193, 199)'}}>
                            {props.typeValue}
                    </Text>
                </View>
                <View className="mr-12">
                    <TextInput className="border-b-2 border-white w-12"
                    style={{color: 'rgb(185, 193, 199)'}}
                    maxLength={parseInt(props.maxLength)}
                    textAlign="center"
                    keyboardType="numeric"
                    value={state}
                    onChangeText={text=>{  
                        if(typeValue=="Qtd"){
                        return onChangeState(maskQtd(text))
                        }
                        else{
                            return onChangeState(maskMoney(text))
                        }
                    }}
                    placeholder="0"
                    placeholderTextColor={'rgb(185, 193, 199)'}
                    />
                </View>
            </View>
    )
}

export default CardInfoForm;