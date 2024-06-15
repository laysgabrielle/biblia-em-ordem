import React , { useState, useEffect, useContext} from "react";
import { View, Modal,ScrollView, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import CardEvento from "../../../components/card-evento";
import CardRecado from "../../../components/card-recado";
import ModalRecados from "../../../components/modal-recados";
import ModalLicao from "../../../components/moda-licao";
import { collection, addDoc, getDocs, deleteDoc, doc  } from 'firebase/firestore';
import {db} from "../../../../firebase/firebaseConfig";
import { UserContext } from "../../../context/UserContext";


interface Recado {
  id: string;
  title: string;
  location: string;
  info: string;
  image: string | null;
}

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [cards, setCards] = useState<Recado[]>([]);
  const {usuarioLogado} = useContext(UserContext);

    const fetchRecados = async () => {
        const querySnapshot = await getDocs(collection(db, "recados"));
        const fetchedRecados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Recado[];
        setCards(fetchedRecados);
    };

    useEffect(() => {
        fetchRecados();
    }, []);

const closeModal = () => {
    setModalVisible(false);
};

const addCard = async (title: string, location: string, info: string, image: string | null) => {
  if (title && location && info) {
    try {
      const docRef = await addDoc(collection(db, "recados"), {
        title,
        location,
        info,
        image
      });
      console.log("Document written with ID: ", docRef.id);
      setCards([...cards, { id: docRef.id, title, location, info, image }]);
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
    await deleteDoc(doc(db, "recados", id));
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
        backgroundColor: "#c6c6c6", // Alterado para a cor desejada
        justifyContent: "center", // Alinhamento vertical centralizado
        alignItems: "center", // Alinhamento horizontal centralizado
      }}
    >
      {usuarioLogado ? <TouchableOpacity onPress={() => setModalVisible(true)}>
        <AntDesign name="pluscircleo" size={28} color= "#152E45" style={{ marginLeft: 355, margin: 5,paddingTop:15 }} />   
      </TouchableOpacity>: null}
      <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>  
      {cards.map((card, recados) => (
        <View key={card.id} style={{ marginBottom: 20 }}>
          <CardRecado
            key={recados}
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
                            <ModalRecados title="Adicionar Recado" closeModal={closeModal} addCard={addCard}  />
                        </View>
                    </View>
                </Modal>
    </View>
  );
}
