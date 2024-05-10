import React, { useState } from 'react';
import { Text, View, Image, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CardRecadosProps {
    title: string;
}

const CardRecados: React.FC<CardRecadosProps> = (props) => {
    const [inputText, setInputText] = useState<string>("");

    return (
        <View style={{
            width: 270,
            height: 350,
            backgroundColor: "#152E45",
            borderRadius: 15,
            padding: 10,
            margin: 10
        }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
                    {props.title}
                </Text>
            </View>

            <View style={{ alignItems: 'center', padding:10, }}>
                <Image
                    source={require("../../assets/images/feed.jpg")}
                    style={{
                        resizeMode: 'cover',
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                    }}
                />
            </View>
            <MaterialIcons name="edit" size={20} color="white" style={{ marginLeft: 125,position:'absolute',marginTop:95 }}/>
            <View style={{ marginBottom: 8 }}>
                <TextInput
                    placeholder="..."
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

            <View style={{ marginBottom: 10 }}>
                <TextInput
                    placeholder="Descrição..."
                    onChangeText={(text) => setInputText(text)}
                    value={inputText}
                    multiline={true}
                    numberOfLines={4}
                    style={{
                        width: '80%',
                        height: 80,
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

export default CardRecados;
