import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Drawer from './drawer'; // Importa o componente Drawer

const MainScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para controlar se o Drawer está aberto ou fechado
  const [selectedTurma, setSelectedTurma] = useState(null); // Estado para armazenar a turma selecionada

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); // Alterna o estado para abrir ou fechar o Drawer
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false); // Fecha o Drawer
  };

  const handleFilterSelect = (turma) => {
    setSelectedTurma(turma); // Armazena a turma selecionada no estado
    handleCloseDrawer(); // Fecha o Drawer após a seleção
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Botão para abrir o Drawer */}
      <TouchableOpacity onPress={toggleDrawer} style={{ marginBottom: 20 }}>
        <Text>Abrir Drawer</Text>
      </TouchableOpacity>
      {/* Renderiza o Drawer se estiver aberto */}
      {isDrawerOpen && (
        <Drawer onClose={handleCloseDrawer} onSelectFilter={handleFilterSelect} />
      )}
      {/* Exibe os dados da turma selecionada */}
      {selectedTurma && (
        <View style={{ marginTop: 20 }}>
          <Text>Turma Selecionada:</Text>
          <Text>{selectedTurma}</Text>
          {/* Renderize outros dados da turma conforme necessário */}
        </View>
      )}
    </View>
  );
};

export default MainScreen;

