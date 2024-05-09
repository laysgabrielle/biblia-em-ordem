import React, { useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
    title: string;
    typeValue: string;
}

function CardInfoForm(props: Props) {
    function maskQtd(value: string) {
        value = value.replace(/\D/g, '');
        return value;
    }

    let typeValue = props.typeValue;

    const [state, setState] = useState<string>('');
    const [number, setNumber] = useState<number | null>();
    const [temPermissao, setPermissao] = useState(false);

    return (
        <View className="flex-row rounded-md items-center p-6 justify-between m-2 shadow-x1 shadow-black"
        style={{
            width: 342,
            height: 110,
            backgroundColor: 'rgb(21, 46, 69)',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
        }}
        >
            <View>
                <Text  className="border-t-2 border-white pt-2 mb-12 font-bold text-xl" 
                 style={{color: 'rgb(185, 193, 199)',
                 width:167}}>
                    {props.title}
                </Text>
            </View>
            <View>
                <Text style={{ color: 'rgb(185, 193, 199)'}}>{typeValue}</Text>
            </View>
            <View>
                {typeValue === 'Qtd' ? (
                    <TextInput  className="border-b-2 border-white w-12"
                    style={{color: 'rgb(185, 193, 199)', textAlign:'center'}}
                        maxLength={3}
                        keyboardType="numeric"
                        value={state}
                        onChangeText={(text) => setState(maskQtd(text))}
                        placeholder="0"
                        placeholderTextColor={'rgb(185, 193, 199)'}
                    />
                ) : (
                    <CurrencyInput className="border-b-2 border-white w-12"
                    style={{color: 'rgb(185, 193, 199)', textAlign:'center'}}
                        value={number || null}
                        maxLength={6}
                        onChangeValue={(text)=>setNumber(text)}
                        delimiter="."
                        separator=","
                        precision={2}
                        minValue={0}
                        placeholder="0"
                        placeholderTextColor={'rgb(185, 193, 199)'}
                    />
                )}
            </View>
            <Pressable disabled={temPermissao} style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 95,}}>
                <MaterialIcons name="delete-outline" size={23} color="orange" className="p-5" style={{
                    color: temPermissao ? 'orange' : 'gray',
                }}/>
            </Pressable>
            </View>
    );
}

export default CardInfoForm;
