import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import CardFeed from "../../../components/card-feed";
import { MaterialIcons } from "@expo/vector-icons";
import {db} from "../../../../firebase/firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

interface Licao {
    id: string;
    title: string;
    subtitle:string;
    image: string | null;
  }

export default function TabLayout() {
    const [activeTab, setActiveTab] = useState("index");
    const [cards, setCards] = useState<Licao[]>([]);

  const fetchLicao = async () => {
    const querySnapshot = await getDocs(collection(db, "licao"));
    const fetchedLicao = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Licao[];
    setCards(fetchedLicao);
  };

  useEffect(() => {
    fetchLicao();
  }, []);

    return (
        <View style={{ flex: 1, flexDirection: "column" }}>
            <View>
                <View>
                    <CardFeed title="Titulo da Revista" subtitle="Titulo da Lição"  image={null} />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Tabs
                    screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#B9C1C7",
                        borderTopWidth: 0,
                        minHeight: 1,
                    },
                    tabBarItemStyle: {
                        paddingBottom: 5,
                        paddingTop: 1,
                    },
                    tabBarActiveTintColor: "#c6c6c6",
                    tabBarInactiveTintColor: "#c6c6c6",
                    tabBarLabelStyle: {
                        fontSize: 1, 
                    },
                }}>
                    <Tabs.Screen
                        listeners={{
                            tabPress: () => setActiveTab('index')
                        }}
                        name="index"
                        options={{
                            title: 'Eventos'
                        }}
                    />
                    <Tabs.Screen
                        listeners={{
                            tabPress: () => setActiveTab('recados')
                        }}
                        name="recados"
                        options={{
                            title: 'Recados'
                        }}
                    />
                </Tabs>
            </View>
        </View>
    )
}