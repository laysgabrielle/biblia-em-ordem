import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

function CardEvento(props) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => setShowDetails(!showDetails)}
            activeOpacity={0.8}
        >
            <View
                style={{
                    width: 350,
                    height: showDetails ? 280 : 190, // Ajusta a altura do card conforme o estado
                    backgroundColor: "#D0D4D8",
                    borderRadius: 10,
                    overflow: "hidden",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        padding: 12,
                    }}
                >
                    <Text style={{ color: "black", fontSize: 14 }}>
                        {props.title}
                    </Text>
                    <Text style={{ color: "black", fontSize: 10 }}>
                        {props.location}
                    </Text>
                </View>
                {showDetails && (
                    <View style={{ padding: 12 }}>
                        <Text style={{ color: "black" }}>
                        {props.info}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

export default CardEvento;
