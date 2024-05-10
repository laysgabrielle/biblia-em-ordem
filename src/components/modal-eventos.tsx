import React, { useState } from 'react';
import { Text, View, Image, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CardModalProps {
    title: string;
}

const CardModal: React.FC<CardModalProps> = (props) => {
    const [inputText, setInputText] = useState<string>("");

    return (
        <View style={{
            width: 270,
            height: 350,
            backgroundColor: "#152E45",
            borderRadius: 15,
            padding: 5,
            margin: 10
        }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
                    {props.title}
                </Text>
            </View>

            <View style={{ alignItems: 'center', padding:15 }}>
                <Image
                    source={require("../../assets/images/feed.jpg")}
                    style={{
                        resizeMode: 'contain',
                        width: 200,
                        height: 100,
                        borderRadius: 30,
                    }}
                />
            </View>
            <MaterialIcons name="edit" size={20} color="white" style={{ marginLeft: 125,position:'absolute',marginTop:95 }}/>
            <View style={{ marginBottom: 8 }}>
                <TextInput
                    placeholder="Encontro..."
                    onChangeText={(text) => setInputText(text)}
                    value={inputText}
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

            <View style={{ marginBottom: 8 }}>
                <TextInput
                    placeholder="Igreja..."
                    onChangeText={(text) => setInputText(text)}
                    value={inputText}
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

            <View style={{ marginBottom: 8 }}>
                <TextInput
                    placeholder="Informações..."
                    onChangeText={(text) => setInputText(text)}
                    value={inputText}
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

export default CardModal;
