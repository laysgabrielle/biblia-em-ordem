import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import Drawer from './drawer';
import { BarChart } from 'react-native-gifted-charts';
import db from "../../../../../firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, Timestamp } from "firebase/firestore";

interface MainScreenProps {
    // Defina os props, se necessário
}

const MainScreen: React.FC<MainScreenProps> = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [selectedDomingo, setSelectedDomingo] = useState<Date | null>(null);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [dadosObtained, setDadosObtained] = useState<{ nome: string, total: number }[]>([]);
    const [selectedBar, setSelectedBar] = useState<number | null>(null);
    const [selectedBarValue, setSelectedBarValue] = useState<number | null>(null);
    const [availableTurmas, setAvailableTurmas] = useState<{ id: string, nome: string }[]>([]);

    useEffect(() => {
        fetchAvailableTurmas();
    }, []);

    const fetchAvailableTurmas = async () => {
        try {
            const turmasSnapshot = await getDocs(collection(db, "turmas"));
            const turmasData = turmasSnapshot.docs.map(doc => ({ id: doc.id, nome: doc.data().nome }));
            setAvailableTurmas(turmasData);
        } catch (error) {
            console.error("Erro ao buscar turmas:", error);
        }
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleFilterSelect = (selectedFilter: string | null, filterType: string) => {
        if (filterType === 'domingo') {
            if (typeof selectedFilter === 'number') {
                setSelectedDomingo(new Date(new Date().getFullYear(), new Date().getMonth(), selectedFilter));
            } else {
                setSelectedDomingo(null);
            }
        } else if (filterType === 'field') {
            setSelectedField(selectedFilter);
        }
    };

    const handleConfirm = async () => {
        setDadosObtained([]); // Limpar os dados obtidos antes de buscar novos dados

        if (selectedDomingo && selectedField) {
            await fetchDados(selectedDomingo, selectedField);
        }
        handleCloseDrawer();
    };

    const fetchDados = async (domingo: Date | null, campo: string | null) => {
        if (domingo && campo && availableTurmas.length > 0) {
            try {
                const dadosTurmas = await Promise.all(availableTurmas.map(async (turma) => {
                    const turmaDocRef = doc(db, "turmas", turma.id);

                    const q = query(
                        collection(db, "dados_obtained"),
                        where("turma_referente", "==", turmaDocRef),
                        where("dia_letivo", ">=", Timestamp.fromDate(new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate()))),
                        where("dia_letivo", "<", Timestamp.fromDate(new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate() + 1)))
                    );

                    const querySnapshot = await getDocs(q);
                    const dataVz = querySnapshot.docs.map(doc => doc.data());

                    const total = dataVz.reduce((sum, item) => sum + item[campo], 0);

                    return { nome: turma.nome, total };
                }));

                const sortedDados = dadosTurmas.sort((a, b) => b.total - a.total);
                const top3Turmas = sortedDados.slice(0, 3);
                setDadosObtained(top3Turmas);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }
    };

    const handleBarPress = (index: number) => {
        setSelectedBar(selectedBar === index ? null : index);
        setSelectedBarValue(selectedBar === index ? null : dadosObtained[index].total);
    };

    const handleReload = () => {
        handleConfirm();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={toggleDrawer} style={styles.button}>
                    <MaterialIcons name="menu" size={24} color="#FFA500" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
                    <Text style={styles.reloadButtonText}>Recarregar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={styles.button}>
                    <MaterialIcons name="print" size={24} color="#FFA500" />
                </TouchableOpacity>
            </View>
            {selectedField && selectedDomingo && (
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Campo: {selectedField}</Text>
                    <Text style={styles.title}>Domingo: {selectedDomingo.toLocaleDateString()}</Text>
                </View>
            )}
            <View style={styles.chartContainer}>
                {dadosObtained.length > 0 ? (
                    <BarChart
                        data={dadosObtained.map((item, index) => ({
                            value: item.total,
                            label: item.nome,
                            frontColor: "#FFA500",
                        }))}
                        barWidth={70}
                        barSpacing={50}
                        width={300}
                        height={300}
                        yAxisLabelTexts={[]}
                        xAxisLabelTexts={dadosObtained.map(item => item.label)}
                        onPressBar={handleBarPress}
                    />
                ) : (
                    <View style={styles.emptyChartContainer}>
                        <Text style={styles.emptyChartText}>Nenhum dado disponível</Text>
                    </View>
                )}
            </View>
            <View style={styles.turmasContainer}>
                {selectedField && selectedDomingo && (
                    <Text style={styles.turmasTitle}>Top 3 Turmas</Text>
                )}
                {dadosObtained.length > 0 ? (
                    dadosObtained.map((item, index) => (
                        <View key={item.nome} style={styles.turmaItem}>
                            <Text style={styles.turmaText}>{`${index + 1}° ${item.nome}`}</Text>
                            <Text style={styles.turmaValue}>{item.total}</Text>
                        </View>
                    ))
                ) : null}
            </View>
            {selectedBarValue !== null && (
                <View style={styles.selectedBarContainer}>
                    <Text style={styles.selectedBarText}>Valor: {selectedBarValue}</Text>
                </View>
            )}
            {isDrawerOpen && (
                <Drawer onClose={handleCloseDrawer} onSelectFilter={handleFilterSelect} onConfirm={handleConfirm} />
            )}
            <View style={styles.footer}>
                <Image source={require("../../../../../assets/images/blidemtransp.png")} style={styles.image} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c6c6c6',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#152E45',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1.0,
        shadowRadius: 5,
        elevation: 10,
        marginHorizontal: 10,
        marginVertical: 15,
        marginTop: 40,
    },
    button: {
        backgroundColor: '#152E45',
        padding: 10,
        borderRadius: 5,
    },
    reloadButton: {
        backgroundColor: '#152E45',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    reloadButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    chartContainer: {
        marginTop: 10, // Subindo um pouco o gráfico
    },
    turmasContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    turmasTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#152E45',
        textAlign: 'center',
    },
    turmaItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    turmaText: {
        fontSize: 16,
        color: '#152E45',
    },
    turmaValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#152E45',
    },
    selectedBarContainer: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    selectedBarText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 0,
    },
    titleContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#152E45',
    },
    emptyChartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyChartText: {
        fontSize: 16,
        color: '#152E45',
    },
});

export default MainScreen;
