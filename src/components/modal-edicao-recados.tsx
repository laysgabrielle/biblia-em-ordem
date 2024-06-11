import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Platform } from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

interface CardRecadosProps {
    title: string;
    closeModal: () => void;
    initialTitle: string;
    initialLocation: string;
    initialInfo: string;
    initialImage: string | null;
    handleUpdate: (newTitle: string, newLocation: string, newImage: string, newInfo: string) => void;
}

const ModalEdicaoRecados: React.FC<CardRecadosProps> = ({ closeModal, initialTitle,initialImage, initialLocation,initialInfo, handleUpdate}) => {
    const [inputText, setInputText] = useState<string>("");
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    const [imageR, setImageR] = useState<string | null>(null);

    useEffect(() => {
        setTitle(initialTitle);
        setLocation(initialLocation);
        setInfo(initialInfo);
        setImageR(initialImage);
    }, [initialTitle, initialLocation, initialInfo,initialImage]);

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
          setImageR(result.assets[0].uri);
        }
      };

    return (
        <View style={{
            width: 260,
            height: 430,
            backgroundColor: "#152E45",
            borderRadius: 15,
            padding: 3,
            margin: 2,
        }}>
            <TouchableOpacity onPress={closeModal}>
            <MaterialIcons name="arrow-back" size={22} color="white" style={{ marginLeft: 11, position: 'absolute', marginTop: 5 }}/>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: "white", fontSize: 20, fontStyle: 'italic', marginBottom: 8 }}>
                    {title}
                </Text>
            </View>
            <TouchableOpacity onPress={pickImage}>
            <View style={{ alignItems: 'center', padding:10, }}>
                <Image
                    source={imageR ? { uri: imageR } : require("../../assets/images/licao.jpeg")}
                    style={{
                        resizeMode: 'cover',
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                    }}
                />
            </View>
            <Feather name="edit-2" size={25} color="white" style={{ marginLeft: 115,position:'absolute',marginTop:50 }}/>
            </TouchableOpacity>
            <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "white", fontSize: 14, fontStyle: 'italic', marginLeft: 22 }}>Titulo</Text>
                <TextInput
                    placeholder="..."
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
            <Text style={{ color: "white", fontSize: 14, fontStyle: 'italic',marginLeft: 22 }}>Local</Text>
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

            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: "white", fontSize: 14, fontStyle: 'italic', marginLeft: 22 }}>Descrição</Text>
                <TextInput
                    placeholder="Descrição..."
                    onChangeText={(text) => setInfo(text)}
                    value={info}
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
            <TouchableOpacity onPress={() =>{handleUpdate(title, location, info, imageR ?? "")}}>
                <MaterialIcons name="check" size={24} color="white" style={{ marginLeft: 222, marginTop: -4 }} />
            </TouchableOpacity>

        </View>
    )
}

export default ModalEdicaoRecados;

