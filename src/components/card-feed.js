import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function CardFeed(props) {
    return (
        <View
        style={{
            width: 385,
            height: 160,
            backgroundColor: "#152E45",
            flexDirection: "column", 
            alignItems: "flex-start", 
            padding: 12, 
        }}>          
            <View style={{ width: 167 }}>
                <Text style={{ color: "white", fontSize: 22 }}>
                    {props.title}
                </Text>
            </View>
            <View style={{ width: 167 }}>
                <Text style={{ color: "white", fontSize: 16 }}>
                    {props.subtitle}
                </Text>
            </View>
        </View>
        )
}

export default CardFeed;