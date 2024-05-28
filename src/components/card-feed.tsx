import React, { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from 'expo-router';
import { Text, View, Image } from 'react-native';
import ModalLicao from './moda-licao';

interface Props {
    title: string;
    subtitle: string;
}

const CardFeed: React.FC<Props> = ({ title, subtitle }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeLink, setActiveLink] = useState<string | null>(null);
    const [cardTitle, setCardTitle] = useState(title);
    const [cardSubtitle, setCardSubtitle] = useState(subtitle);

    const closeModal = () => {
        setModalVisible(false);
    }

    const handleUpdate = (newTitle: string, newSubtitle: string) => {
        setCardTitle(newTitle);
        setCardSubtitle(newSubtitle);
        closeModal();
    }

    return (
        <View style={{
            borderRadius: 10,
            alignItems: "top",
            padding: 0,
            justifyContent: "space-between",
            margin: 0,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: "#152E45",
            width: '100%',
            height: 250,
        }}>
            <Image
                source={require("../../assets/images/feed.jpg")}
                style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '75%', 
                    borderRadius: 10, 
                }} />
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ position: 'absolute', marginLeft: 350, marginTop: 155 }}>    
                <MaterialIcons name="edit" size={24} color="orange"/>
            </TouchableOpacity>
            <View style={{ position: 'absolute', top: 50, left: 15, padding: 10, }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>{cardTitle}</Text>
                <Text style={{ color: '#fff', fontSize: 16 }}>{cardSubtitle}</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '100%', margin: 8 }}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '100%', margin: 0 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 'auto' }}>
                        <Link href="feed/" onPress={() => setActiveLink('eventos')}>
                            <Text style={{ color: activeLink === 'eventos' ? 'orange' : '#fff', fontSize: 18 }}>Eventos</Text>
                        </Link>
                        <Link href="feed/recados" onPress={() => setActiveLink('recados')}>
                            <Text style={{ color: activeLink === 'recados' ? 'orange' : '#fff', fontSize: 18 }}>Recados</Text>
                        </Link>
                    </View>
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
                            <ModalLicao title="Editar Lição" 
                                closeModal={closeModal} 
                                initialTitle={cardTitle} 
                                initialSubtitle={cardSubtitle} 
                                handleUpdate={handleUpdate} />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
export default CardFeed;
