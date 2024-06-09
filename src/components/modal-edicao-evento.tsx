import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CardModalProps {
    title: string;
    closeModal: () => void;
    initialTitle: string;
    initialLocation: string;
    initialInfo: string;
    handleUpdate: (newTitle: string, newLocation: string, newInfo: string) => void;
}

const ModalEdicaoEventos: React.FC<CardModalProps> = ({ closeModal, initialTitle, initialLocation,initialInfo, handleUpdate }) => {
    const [inputText, setInputText] = useState<string>("");
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [info, setInfo] = useState<string>("");

    useEffect(() => {
        setTitle(initialTitle);
        setLocation(initialLocation);
        setInfo(initialInfo);
    }, [initialTitle, initialLocation, initialInfo]);
    return (
        <View style={{
            width: 275,
            height: 410,
            backgroundColor: "#152E45",
            borderRadius: 15,
            padding: 5,
            margin: 2,
        }}>
            <TouchableOpacity onPress={closeModal}>
            <MaterialIcons name="arrow-back" size={20} color="white" style={{ marginLeft: 11, position: 'absolute', marginTop: 8 }}/>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
                    {title}
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
            <Text style={{ color: "white", fontSize: 14, fontWeight: 'italic-bold',marginLeft: 22 }}>Evento</Text>
                <TextInput
                    placeholder="Encontro..."
                    onChangeText={(text) => setTitle(text)}
                    value={title}
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
            <Text style={{ color: "white", fontSize: 14, fontWeight: 'italic-bold',marginLeft: 22 }}>Local</Text>
                <TextInput
                    placeholder="Igreja..."
                    onChangeText={(text) => setLocation(text)}
                    value={location}
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
                <Text style={{ color: "white", fontSize: 14, fontWeight: 'italic-bold', marginLeft: 22 }}>Informações</Text>
                <TextInput
                    placeholder="Informações..."
                    onChangeText={(text) => setInfo(text)}
                    value={info}
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
            <TouchableOpacity onPress={() =>{handleUpdate(title, location, info) }}>
                <MaterialIcons name="check" size={24} color="white" style={{ marginLeft: 230, marginTop: 5 }} />
            </TouchableOpacity>

        </View>
    )
}

export default ModalEdicaoEventos;