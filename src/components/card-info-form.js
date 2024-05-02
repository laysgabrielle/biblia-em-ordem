import { Text, View, TextInput } from "react-native";
import React, {useState} from 'react';
import CurrencyInput from 'react-native-currency-input';

function CardInfoForm(props){
    
    function maskQtd(value){
        value = value.replace(/\D/g, "")
        return value
    } 

    let typeValue = props.typeValue

    const [state, setState] = React.useState('');
    return (
            <View className="flex-row rounded-md items-center p-6 justify-between m-2 shadow-x1 shadow-black"
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
                            {typeValue}
                    </Text>
                </View>
                <View className="mr-12">
                    {(typeValue=="Qtd")?
                        <TextInput className="border-b-2 border-white w-12"
                        style={{color: 'rgb(185, 193, 199)'}}
                        maxLength={3}
                        textAlign="center"
                        keyboardType="numeric"
                        value={state}
                        onChangeText={text=>setState(maskQtd(text))}
                        placeholder="0"
                        placeholderTextColor={'rgb(185, 193, 199)'}
                    />
                    :
                    <CurrencyInput className="border-b-2 border-white w-12"
                    style={{color: 'rgb(185, 193, 199)'}}
                        value={state}
                        maxLength={6}
                        onChangeValue={setState}
                        delimiter="."
                        separator=","
                        precision={2}
                        minValue={0}
                        textAlign="center"
                        placeholder="0"
                        placeholderTextColor={'rgb(185, 193, 199)'}

                    />
                    }
                </View>
            </View>
    )
}

export default CardInfoForm;