import React, { useState, useEffect } from 'react'
import { View, ScrollView, Modal, TouchableOpacity } from "react-native";
import CardEvento from "../../../components/card-evento";
import ModalEventos from "../../../components/modal-eventos";
import { MaterialIcons } from "@expo/vector-icons";
import {db} from "../../../../firebase/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

interface Evento {
  id: string;
  title: string;
  location: string;
  info: string;
}

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [cards, setCards] = useState<Evento[]>([]);

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
  };

  const addCard = async (title: string, location: string, info: string) => {
    if (title && location && info) {
      try {
        const docRef = await addDoc(collection(db, "eventos"), {
          title,
          location,
          info
        });
        console.log("Document written with ID: ", docRef.id);
        setCards([...cards, { id: docRef.id, title, location, info }]);
        closeModal();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("All fields are required!");
    }
  };

  const deleteCard = async (id: string) => {
    try {
      await deleteDoc(doc(db, "eventos", id));
      setCards(cards.filter(card => card.id !== id));
      console.log("Document deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#c6c6c6",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={28} style={{ marginLeft: 355, margin: 5 }} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
        {cards.map((card) => (
          <CardEvento
            key={card.id}
            id={card.id}
            title={card.title}
            location={card.location}
            info={card.info}
            deleteCard={deleteCard}
          />
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
            <ModalEventos title="Adicionar Evento" closeModal={closeModal} addCard={addCard} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
