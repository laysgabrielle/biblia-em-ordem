import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface CardLicaoProps {
    title: string;
    closeModal: () => void;
    initialTitle: string;
    initialSubtitle: string;
    initialImage: string | null;
    handleUpdate: (newTitle: string, newImage: string, newSubtitle: string) => void;  
}

const ModalLicao: React.FC<CardLicaoProps> = ({ title, closeModal, initialTitle,initialImage, initialSubtitle, handleUpdate }) => {
    const [inputTitle, setInputTitle] = useState<string>(initialTitle);
    const [inputSubtitle, setInputSubtitle] = useState<string>(initialSubtitle);
    const [imageL, setImageL] = useState<string | null>(null);

    useEffect(() => {
        setInputTitle(initialTitle);
        setInputSubtitle(initialSubtitle);
        setImageL(initialImage);
    }, [initialTitle, initialSubtitle,initialImage]);

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Desculpe, precisamos da permissão para acessar a galeria!');
            return;
          }
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled && result.assets && result.assets.length > 0) {
          setImageL(result.assets[0].uri);
        }
      };

    return (
        <View style={{
            width: 250,
            height: 315,
            backgroundColor: "#152E45",
            borderRadius: 15,
            padding: 8,
            margin: 2,
        }}>
            <TouchableOpacity onPress={closeModal}>
            <MaterialIcons name="arrow-back" size={22} color="white" style={{ marginLeft: 11, position: 'absolute', marginTop: 5 }}/>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: "white", fontSize: 18, fontStyle: 'italic', marginBottom: 2 }}>
                    {title}
                </Text>
            </View>
            <TouchableOpacity onPress={pickImage}>
            <View style={{ alignItems: 'center', padding: 10 }}>
                <Image
                    source={imageL ? { uri: imageL } : require("../../assets/images/feed.jpg")}
                    style={{
                        resizeMode: 'cover',
                        width: 180,
                        height: 90,
                        borderRadius: 10,
                    }}
                />
            </View>
            <Feather name="edit-2" size={25} color="white"style={{ marginLeft: 105 ,position:'absolute', marginTop: 50 }}/>
            </TouchableOpacity>
            <View style={{ marginBottom: 10 }}>
            <Text style={{ color: "white", fontSize: 14,fontStyle: 'italic', marginLeft: 22 }}>Titulo</Text>
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
            <Text style={{ color: "white", fontSize: 14, fontStyle: 'italic', marginLeft: 22}}>Descrição</Text>
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
            <TouchableOpacity onPress={() => handleUpdate(inputTitle, inputSubtitle, imageL ?? "")}>
                <MaterialIcons name="check" size={24} color="white" style={{ marginLeft: 210, marginTop: 0 }} />
            </TouchableOpacity>
        </View>
    );
}

export default ModalLicao;