import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context/UserContext';
import { View, Dimensions, Modal, TouchableOpacity, ScrollView, Text } from "react-native";
import CardEvento from "../../../components/card-evento";
import ModalEventos from "../../../components/modal-eventos";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "../../../../firebase/firebaseConfig.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

interface Evento {
  id: string;
  title: string;
  location: string;
  info: string;
  image: string | null;
}

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [cards, setCards] = useState<Evento[]>([]);
  const {usuarioLogado} = useContext(UserContext);
  console.log(usuarioLogado);
  const fetchEventos = async () => {
    const querySnapshot = await getDocs(collection(db, "eventos"));
    const fetchedEventos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Evento[];
    setCards(fetchedEventos);
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  }
  const deleteCard = async (id: string) => {
    try {
      await deleteDoc(doc(db, "eventos", id));
      setCards(cards.filter(card => card.id !== id));
      console.log("Document deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const addCard = async (title: string, location: string, info: string, image: string | null) => {
    if (title && location && info) {
      try {
        const docRef = await addDoc(collection(db, "eventos"), {
          title,
          location,
          info,
          image
        });
        console.log("Document written with ID: ", docRef.id);
        setCards([...cards, { id: docRef.id, title, location, info ,image}]);
        closeModal();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("All fields are required!");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#B9C1C7",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {usuarioLogado ? 
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <AntDesign name="pluscircleo" size={28} color= "#152E45" style={{ marginLeft: 355, margin: 5,paddingTop:15 }} />   
      </TouchableOpacity> : null }
      
      <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
        {cards.map((card) => (
          <View key={card.id} style={{ marginBottom: 20 }}>
            <CardEvento
              key={card.id}
              id={card.id}
              title={card.title}
              location={card.location}
              info={card.info}
              image={card.image}
              deleteCard={deleteCard}
            />
          </View>
        ))}
      </ScrollView>
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
            <ModalEventos title="Editar Lição" closeModal={closeModal} addCard={addCard} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
