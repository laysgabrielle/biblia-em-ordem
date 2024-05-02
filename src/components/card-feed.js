import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function CardFeed(props) {
    return (
        <View
        style={{
            width: 400,
            height: 160,
            backgroundColor: "#152E45",
            flexDirection: "column", 
            alignItems: "flex-start", 
            padding: 14,
        }}>
            {/* <Image
                source={require("../../assets/images/feed.jpg")}
                style={{
                    resizeMode:'contain'
                }}
            />           */}
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