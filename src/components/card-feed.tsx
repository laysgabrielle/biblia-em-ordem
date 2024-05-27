// card-feed.tsx
import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Link } from 'expo-router';

interface CardFeedProps {
    title: string;
    subtitle: string;
}

const CardFeed: React.FC<CardFeedProps> = ({
    title,
    subtitle,
}) => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/feed.jpg")}
                style={styles.image}
            />
            {/* Camada semi-transparente */}
            <View style={styles.overlay} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            {/* Links para eventos e recados */}
            <View style={styles.linkContainer}>
                <Link href="/feed" style={styles.link}>
                    <Text style={styles.linkText}>Eventos</Text>
                </Link>
                <Link href="/feed/recados" style={styles.link}>
                    <Text style={styles.linkText}>Recados</Text>
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        aspectRatio: 16 / 9,
        overflow: "hidden",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        position: "absolute",
        top: 0,
        left: 0,
    },
    overlay: {
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        width: "100%",
        height: "100%",
    },
    textContainer: {
        position: "absolute",
        top: 20,
        left: 10,
        padding: 10,
    },
    title: {
        color: "white",
        fontSize: 22,
    },
    subtitle: {
        color: "white",
        fontSize: 16,
        marginTop: 5,
    },
    linkContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
    },
    link: {
        backgroundColor: "#152E45",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    linkText: {
        color: "#FFFF00",
        fontSize: 18,
    },
});

export default CardFeed;
