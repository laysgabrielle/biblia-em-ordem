// layout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import CardFeed from "../../../components/card-feed";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen: React.FC = () => {
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
                        backgroundColor: "#c6c6c6",
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