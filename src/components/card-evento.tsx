import React, { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, Image } from "react-native";
import ModalEdicaoEventos from './modal-edicao-evento';

interface Props  {
    title: string,
    location: string,
    info: string,
}

const CardEvento: React.FC<Props> = ({ title, location, info }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [eventTitle, setEventTitle] = useState(title);
    const [eventLocation, setEventLocation] = useState(location);
    const [eventInfo, setEventInfo] = useState(info);

    const closeModal = () => {
        setModalVisible(false);
    }

    const handleUpdate = (newTitle: string, newLocation: string, newInfo: string) => {
        setEventTitle(newTitle);
        setEventLocation(newLocation);
        setEventInfo(newInfo);
        closeModal();
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
                    source={require("../../assets/images/eventos.jpg")}
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
                        {eventTitle}
                    </Text>
                    <Text style={{ color: "black", fontSize: 10 }}>
                        {eventLocation}
                    </Text>
                    {showDetails && (
                        <Text style={{ color: "black" }}>
                            {eventInfo}
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
                            <ModalEdicaoEventos title="Editar Lição" 
                            closeModal={closeModal}
                            initialTitle={eventTitle} 
                            initialLocation={eventLocation} 
                            initialInfo={eventInfo} 
                            handleUpdate={handleUpdate} />
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableOpacity>
    );
}

export default CardEvento;