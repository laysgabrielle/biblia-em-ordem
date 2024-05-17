import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CardRecadosProps {
    title: string;
    closeModal: () => void;
}

const ModalRecados: React.FC<CardRecadosProps> = (props) => {
    const [inputText, setInputText] = useState<string>("");
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={{
            width: 260,
            height: 370,
            backgroundColor: "#152E45",
            borderRadius: 15,
            padding: 5,
            margin: 2,
        }}>
            <TouchableOpacity onPress={props.closeModal}>
            <MaterialIcons name="arrow-back" size={20} color="white" style={{ marginLeft: 11, position: 'absolute', marginTop: 8 }}/>
            </TouchableOpacity>
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
            <MaterialIcons name="edit" size={20} color="white" style={{ marginLeft: 120,position:'absolute',marginTop:90 }}/>
            <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "white", fontSize: 14, fontWeight: 'italic-bold', marginLeft: 22 }}>Titulo</Text>
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
                <Text style={{ color: "white", fontSize: 14, fontWeight: 'italic-bold', marginLeft: 22 }}>Descrição</Text>
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
            <TouchableOpacity onPress={props.closeModal}>
                <MaterialIcons name="check" size={24} color="white" style={{ marginLeft: 220, marginTop: 5 }} />
            </TouchableOpacity>

        </View>
    )
}

export default ModalRecados;
