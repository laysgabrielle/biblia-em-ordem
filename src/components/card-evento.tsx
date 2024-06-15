import React, { useContext, useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { Text, View, Image } from "react-native";
import ModalEdicaoEventos from './modal-edicao-evento';
import { UserContext } from '../context/UserContext';

interface Props {
  id: string;
  title: string;
  location: string;
  info: string;
  image: string | null;
  deleteCard: (id: string) => void;
}

const CardEvento: React.FC<Props> = ({ id, title, location, info,image, deleteCard }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState(title);
  const [eventLocation, setEventLocation] = useState(location);
  const [eventInfo, setEventInfo] = useState(info);
  const [eventImage, setEventImage] = useState(image);
  const {usuarioLogado} = useContext(UserContext);

  const closeModal = () => {
    setModalVisible(false);
  }

  const handleUpdate = (newTitle: string, newLocation: string, newInfo: string, newImage: string | null) => {
    setEventTitle(newTitle);
    setEventLocation(newLocation);
    setEventInfo(newInfo);
    setEventImage(newImage);
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
          height: showDetails ? 280 : 190,
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
          source={eventImage ? { uri: eventImage } : require("../../assets/images/eventos.jpg")}
          style={{
            width: "100%",
            height: showDetails ? 140 : 100,
            resizeMode: "cover",
          }}
        />
        {          usuarioLogado ?<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', paddingHorizontal: 10, marginTop: 10 }}>
 <TouchableOpacity onPress={() => deleteCard(id)}>
            <MaterialIcons name="delete-outline" size={20} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="edit-2" size={20} color="orange" />
          </TouchableOpacity> 
        </View> : null}
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
              <ModalEdicaoEventos title="Editar Evento"
                closeModal={closeModal}
                initialTitle={eventTitle}
                initialLocation={eventLocation}
                initialInfo={eventInfo}
                initialImage={eventImage}
                handleUpdate={handleUpdate} />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
}

export default CardEvento;
