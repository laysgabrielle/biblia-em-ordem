import React, { useState } from 'react';
import { Text, View, Image, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CardLicaoProps {
    title: string;
}

const CardLicao: React.FC<CardLicaoProps> = (props) => {
    const [inputText, setInputText] = useState<string>("");

    return (
        <View style={{
            width: 250,
            height: 280,
            backgroundColor: "#152E45",
            borderRadius: 15,
            padding: 5,
            margin: 0,
        }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: 'italic', marginBottom: 2 }}>
                    {props.title}
                </Text>
            </View>

            <View style={{ alignItems: 'center',padding: 10, }}>
                <Image
                    source={require("../../assets/images/feed.jpg")}
                    style={{
                        resizeMode: 'cover',
                        width: 180,
                        height: 90,
                        borderRadius: 10,
                    }}
                />
            </View>
            <MaterialIcons name="edit" size={20} color="white" style={{ marginLeft: 115,position:'absolute',marginTop:80 }}/>
            <View style={{ marginBottom: 10 }}>
                <TextInput
                    placeholder="..."
                    onChangeText={(text) => setInputText(text)} // Atualiza o estado com o texto digitado
                    value={inputText} // Valor do campo de entrada
                    style={{
                        width: '80%',
                        height: 40,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 5,
                        alignSelf: 'center',
                    }}
                />
            </View>

            <View style={{ marginBottom: 10 }}>
                <TextInput
                    placeholder="Descrição..."
                    onChangeText={(text) => setInputText(text)} // Atualiza o estado com o texto digitado
                    value={inputText} // Valor do campo de entrada
                    style={{
                        width: '80%',
                        height: 40,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 5,
                        alignSelf: 'center',
                    }}
                />
            </View>
        </View>
    )
}

export default CardLicao;
