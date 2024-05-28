import React , { useState } from "react";
import { View, Modal,ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CardEvento from "../../../components/card-evento";
import CardRecado from "../../../components/card-recado";
import ModalRecados from "../../../components/modal-recados";
import ModalLicao from "../../../components/moda-licao";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [cards, setCards] = useState([
    {
      title:"Recados sobre a ultima aula",
      location: "Igreja Assembléia de Deus",
      info: "Venha para nosso encontro de jovens! O evento será realizado com o objetivo de reunir nossos jovens para uma confraternização.",
    }    
  ])
  const closeModal = () => {
    setModalVisible(false);
}
const addCard = (title, location, info) => {
  setCards([...cards, { title, location, info }]);
  closeModal();
}
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#c6c6c6", // Alterado para a cor desejada
        justifyContent: "center", // Alinhamento vertical centralizado
        alignItems: "center", // Alinhamento horizontal centralizado
      }}
    >
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <MaterialIcons name = "add" size={28} style={{marginLeft: 355, margin:5}}></MaterialIcons>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>  
      {cards.map((card, recados) => (
        <CardRecado
          key={recados}
          title={card.title}
          location={card.location}
          info={card.info}
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
                            <ModalRecados title="Editar Lição" closeModal={closeModal} addCard={addCard}  />
                        </View>
                    </View>
                </Modal>
    </View>
  );
}
