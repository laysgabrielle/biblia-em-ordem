import React, { useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
    title: string;
    isQtd: boolean;
    value: number | null;
    id: number;
    idDoc: string;
    onValueChange: (id: number, value: number | null) => void;
    onDelete: (id: string) => void;
}

function CardInfoForm({ title, isQtd, onValueChange, value, id, onDelete , idDoc }: Props) {


    const [temPermissao, setPermissao] = useState(false);

    return (
        <View className="shadow-x1 shadow-black"
            style={{
                width: 342,
                height: 110,
                backgroundColor: 'rgb(21, 46, 69)',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 6,
                padding: 20,
                margin: 6,

            }}
        >
            <View style={{
                flexDirection: 'column',
                width: 167,
                height: 90,
                justifyContent:'space-around'
            }}>
                <Text className="border-t-2 border-white pt-2 font-bold text-xl"
                    style={{
                        color: 'rgb(185, 193, 199)',
                        width: 167,
                        height: 30,
                    }}>
                    {title}
                </Text>
                <Pressable disabled={temPermissao} style={{
                    height: 30,
                    width: 50,
                }} onPress={()=>onDelete(idDoc)}>
                    <MaterialIcons name="delete-outline" size={23} color="orange" style={{
                        color: temPermissao ? 'orange' : 'gray',
                    }} />
                </Pressable>
            </View>
            <View>
                <Text style={{
                    color: 'rgb(185, 193, 199)',
                }}>{isQtd ? "Qtd" : "R$"}</Text>
            </View>
            <View>
                {isQtd ? (
                    <CurrencyInput className="border-b-2 border-white w-12"
                        style={{ color: 'rgb(185, 193, 199)', textAlign: 'center'}}
                        value={value}
                        maxLength={3}
                        onChangeValue={(value) => {
                            onValueChange(id, value)
                        }}
                        delimiter=""
                        separator=""
                        precision={0}
                        minValue={0}
                        placeholder='0'
                        placeholderTextColor={'rgb(185, 193, 199)'}
                    />
                ) : (
                    <CurrencyInput className="border-b-2 border-white w-12"
                        style={{ color: 'rgb(185, 193, 199)', textAlign: 'center' }}
                        value={value}
                        maxLength={6}
                        onChangeValue={(value) => {
                            onValueChange(id, value)
                        }}
                        minValue={0}
                        placeholder='0'
                        placeholderTextColor={'rgb(185, 193, 199)'}
                    />
                )}
            </View>
        </View>
    );
}

export default CardInfoForm;
