import React, { useState } from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import CardFeed from "../../../components/card-feed";

export default function TabLayout() {
    const [activeTab, setActiveTab] = useState("index");

    return (
        <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1 }}>
                <View>
                    <CardFeed title="Titulo da Revista" subtitle="Titulo da Lição" />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Tabs 
                    screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#c6c6c6",
                        borderTopWidth: 0,
                        minHeight: 74,
                    },
                    tabBarItemStyle: {
                        paddingBottom: 5,
                        paddingTop: 1,
                    },
                    tabBarActiveTintColor: "#c6c6c6",
                    tabBarInactiveTintColor: "#c6c6c6",
                    tabBarLabelStyle: {
                        fontSize: 2, 
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
    );
}