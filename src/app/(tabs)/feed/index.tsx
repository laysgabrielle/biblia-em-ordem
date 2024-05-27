import React, { useState } from 'react'
import { View, Dimensions , Modal, TouchableOpacity} from "react-native";
import CardEvento from "../../../components/card-evento";
import ModalEventos from "../../../components/modal-eventos";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
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
      <CardEvento
        title="Evento"
        location="Igreja Assembléia de Deus"
        info="Venha para nosso encontro de jovens! O evento será realizado com o objetivo de reunir nossos jovens para uma confraternização."
      />
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
  );
}
