import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CardLicaoProps {
    title: string;
    closeModal: () => void;
    initialTitle: string;
    initialSubtitle: string;
    handleUpdate: (newTitle: string, newSubtitle: string) => void;  
}

const ModalLicao: React.FC<CardLicaoProps> = ({ title, closeModal, initialTitle, initialSubtitle, handleUpdate }) => {
    const [inputTitle, setInputTitle] = useState<string>(initialTitle);
    const [inputSubtitle, setInputSubtitle] = useState<string>(initialSubtitle);

    useEffect(() => {
        setInputTitle(initialTitle);
        setInputSubtitle(initialSubtitle);
    }, [initialTitle, initialSubtitle]);


    return (
        <View style={{
            width: 250,
            height: 315,
            backgroundColor: "#152E45",
            borderRadius: 15,
            padding: 8,
            margin: 0,
        }}>
            <TouchableOpacity onPress={closeModal}>
            <MaterialIcons name="arrow-back" size={20} color="white" style={{ marginLeft: 11, position: 'absolute', marginTop: 8 }}/>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: 'italic', marginBottom: 2 }}>
                    {title}
                </Text>
            </View>

            <View style={{ alignItems: 'center', padding: 10 }}>
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
            <MaterialIcons name="edit" size={20} color="white"style={{ marginLeft: 110 ,position:'absolute', marginTop: 80 }}/>
            <View style={{ marginBottom: 10 }}>
            <Text style={{ color: "white", fontSize: 14, fontWeight: 'italic-bold', marginLeft: 22 }}>Titulo</Text>
                <TextInput
                    placeholder="..."
                    onChangeText={(text) => setInputTitle(text)}
                    value={inputTitle}
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
            <Text style={{ color: "white", fontSize: 14, fontWeight: 'italic-bold', marginLeft: 22}}>Descrição</Text>
                <TextInput
                    placeholder="Descrição..."
                    onChangeText={(text) => setInputSubtitle(text)}
                    value={inputSubtitle}
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
            <TouchableOpacity onPress={() => handleUpdate(inputTitle, inputSubtitle)}>
                <MaterialIcons name="check" size={24} color="white" style={{ marginLeft: 210, marginTop: 5 }} />
            </TouchableOpacity>
        </View>
    );
}

export default ModalLicao;

