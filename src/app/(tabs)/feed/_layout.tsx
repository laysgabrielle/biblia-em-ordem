import React, { useState } from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import CardFeed from "../../../components/card-feed";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
    const [activeTab, setActiveTab] = useState("index");

    return (
        <View style={{ flex: 1, flexDirection: "column" }}>
            <View>
                <View>
                    <CardFeed title="Titulo da Revista" subtitle="Titulo da Lição" />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: '#152E45',
                            borderTopWidth: 0,
                            minHeight: 74,
                        },
                        tabBarItemStyle: {
                            paddingBottom: 25,
                            paddingTop: 14,
                        },
                        tabBarActiveTintColor: '#FFFF00',
                        tabBarInactiveTintColor: '#B9C1C7',
                        tabBarLabelStyle: {
                            fontSize: 20,
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