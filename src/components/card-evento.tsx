import React, { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, Image } from "react-native";
import ModalEventos from './modal-eventos';

type props = {
    title: string,
    location: string,
    info: string,
}

function CardEvento(props: props) {
    const [showDetails, setShowDetails] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeLink, setActiveLink] = useState<string | null>(null);

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <TouchableOpacity
            onPress={() => setShowDetails(!showDetails)}
            activeOpacity={0.8}
        >
            <View
                style={{
                    width: 350,
                    height: showDetails ? 280 : 190, // Ajusta a altura do card conforme o estado
                    backgroundColor: "#D0D4D8",
                    borderRadius: 10,
                    overflow: "hidden",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <Image
                    source={require("../../assets/images/feed.jpg")} // Caminho da imagem
                    style={{
                        width: "100%",
                        height: showDetails ? 140 : 100, // Altura da imagem conforme o estado
                        resizeMode: "cover",
                    }}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%',position: 'absolute', paddingHorizontal: 10, marginTop:10}}>
                <MaterialIcons name="delete" size={20} color="orange"/>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                <MaterialIcons name="edit" size={20} color="orange" />
                </TouchableOpacity>
                </View>
                <View
                    style={{
                        padding: 12,
                    }}
                >
                    <Text style={{ color: "black", fontSize: 14 }}>
                        {props.title}
                    </Text>
                    <Text style={{ color: "black", fontSize: 10 }}>
                        {props.location}
                    </Text>
                    {showDetails && (
                        <Text style={{ color: "black" }}>
                            {props.info}
                        </Text>
                    )}
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 22,
                    }}>
                        <View style={{
                            margin: 20,
                            backgroundColor: 'white',
                            borderRadius: 20,
                            padding: 2,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 1,
                            elevation: 5,
                        }}>
                            <ModalEventos title="Editar Lição" closeModal={closeModal} />
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableOpacity>
    );
}

export default CardEvento;
