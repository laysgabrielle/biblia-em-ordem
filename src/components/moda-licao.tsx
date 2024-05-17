import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CardLicaoProps {
    title: string;
    closeModal: () => void;  
}

const ModalLicao: React.FC<CardLicaoProps> = (props) => {
    const [inputText, setInputText] = useState<string>("");
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <View style={{
            width: 250,
            height: 315,
            backgroundColor: "#152E45",
            borderRadius: 15,
            padding: 8,
            margin: 0,
        }}>
            <TouchableOpacity onPress={props.closeModal}>
            <MaterialIcons name="arrow-back" size={20} color="white" style={{ marginLeft: 11, position: 'absolute', marginTop: 8 }}/>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: 'italic', marginBottom: 2 }}>
                    {props.title}
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
            <Text style={{ color: "white", fontSize: 14, fontWeight: 'italic-bold', marginLeft: 22}}>Descrição</Text>
                <TextInput
                    placeholder="Descrição..."
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
            <TouchableOpacity onPress={props.closeModal}>
                <MaterialIcons name="check" size={24} color="white" style={{ marginLeft: 210, marginTop: 5 }} />
            </TouchableOpacity>
        </View>
    );
}

export default ModalLicao;
