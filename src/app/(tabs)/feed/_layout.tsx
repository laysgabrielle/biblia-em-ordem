// layout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import CardFeed from "../../../components/card-feed";

const HomeScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <CardFeed title="Titulo da Revista" subtitle="Titulo da Lição" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HomeScreen;
