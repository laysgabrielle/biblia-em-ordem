import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import Drawer from './drawer'; // Importe o componente Drawer
import db from "../../../../../firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, getDoc, Timestamp } from "firebase/firestore";

const MainScreen = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedTurma, setSelectedTurma] = useState<string | null>(null);
    const [selectedDomingo, setSelectedDomingo] = useState<Date | null>(null);
    const [dadosObtained, setDadosObtained] = useState<any[]>([]);
    const [nomesTurmas, setNomesTurmas] = useState<string[]>([]); // Estado para armazenar os nomes das turmas

    useEffect(() => {
        buscarNomesTurmas();
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleFilterSelect = (selectedFilter: string | number | null, filterType: string) => {
        if (filterType === 'turma') {
            setSelectedTurma(selectedFilter as string);
        } else if (filterType === 'domingo') {
            if (typeof selectedFilter === 'string' || typeof selectedFilter === 'number') {
                setSelectedDomingo(new Date(selectedFilter));
            } else {
                setSelectedDomingo(selectedFilter);
            }
        }
    };

    const handleConfirm = async () => {
        await fetchDados(selectedTurma, selectedDomingo);
        handleCloseDrawer();
    };

    const fetchDados = async (nomeTurma: string | null, domingo: Date | null) => {
        if (nomeTurma && domingo) {
            try {
                const turmaDocRef = doc(db, "turmas", "turma" + nomeTurma);

                const q = query(
                    collection(db, "dados_obtained"),
                    where("turma_referente", "==", turmaDocRef),
                    where("dia_letivo", ">=", Timestamp.fromDate(new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate()))),
                    where("dia_letivo", "<=", Timestamp.fromDate(new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate() + 1)))
                );

                const querySnapshot = await getDocs(q);
                const dataVz = await Promise.all(querySnapshot.docs.map(async doc => {
                    const fullDoc = await getDoc(doc.ref);
                    return { id: doc.id, ...fullDoc.data() };
                }));
                setDadosObtained(dataVz);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }
    };

    const buscarNomesTurmas = async () => {
        // Lógica para buscar os nomes das turmas do banco de dados ou de outra fonte de dados
        // Exemplo:
        const nomesTurmas = ['Turma A', 'Turma B', 'Turma C'];
        setNomesTurmas(nomesTurmas);
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            {Object.entries(item).map(([key, value]) => (
                <Text key={key} style={styles.itemText}>
                    {key}: {String(value)}
                </Text>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleDrawer} style={styles.drawerButton}>
                <MaterialIcons name="menu" size={24} color="#152E45" />
            </TouchableOpacity>
            {selectedTurma && (
                <View style={styles.selectedTurmaContainer}>
                    <Text style={styles.selectedTurmaText}>Turma selecionada: {selectedTurma}</Text>
                </View>
            )}
            {selectedDomingo !== null && (
                <View style={styles.selectedDomingoContainer}>
                    <Text style={styles.selectedDomingoText}>Domingo selecionado: {selectedDomingo.toLocaleDateString()}</Text>
                </View>
            )}
            <View style={styles.barrasContainer}>
                {/* Barra da esquerda */}
                <View style={styles.barraContainer}>
                    <View style={[styles.barra, { height: 150, marginTop: 150 }]}></View>
                    <Text style={styles.nomeTurma}>{nomesTurmas[0]}</Text>
                </View>
                {/* Barra do meio */}
                <View style={styles.barraContainer}>
                    <View style={[styles.barra, { height: 300, marginTop: 0 }]}></View>
                    <Text style={styles.nomeTurma}>{nomesTurmas[1]}</Text>
                </View>
                {/* Barra da direita */}
                <View style={styles.barraContainer}>
                    <View style={[styles.barra, { height: 100, marginTop: 200 }]}></View>
                    <Text style={styles.nomeTurma}>{nomesTurmas[2]}</Text>
                </View>
            </View>
            <FlatList
                data={dadosObtained}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
            {isDrawerOpen && (
                <Drawer onClose={handleCloseDrawer} onSelectFilter={handleFilterSelect} onConfirm={handleConfirm} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    drawerButton: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 2,
    },
    selectedTurmaContainer: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    selectedTurmaText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    selectedDomingoContainer: {
        position: 'absolute',
        top: 150,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    selectedDomingoText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    barrasContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 200,
        justifyContent: 'flex-end', // Alinha os itens ao final do container
    },
    barraContainer: {
        alignItems: 'center',
    },
    barra: {
        backgroundColor: '#FFA500',
        width: 80, // Definindo a largura padrão das barras
        marginVertical: 10,
        marginHorizontal: 10, // Adicionando margem horizontal para espaçamento entre as barras
    },    
    nomeTurma: {
        fontSize: 16,
        marginTop: 5,
    },
    listContainer: {
        paddingTop: 200,
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
});

export default MainScreen;
