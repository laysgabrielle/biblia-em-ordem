import "../../../styles/global.css";
import { Button, Pressable, Text, View, Image} from "react-native";
import { Link } from "expo-router";
import CardDefault from "../../../components/card-default";
import CardRelatorio from "../../../components/card-relatorio";

export default function Relatorio(){
    return (
        <View style={{ flex: 1 }}>
            <View style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
                <CardRelatorio />
            </View>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Link href="relatorio/relat" options={{ headerShown: false }} style={{ marginVertical: 10 }}>
                    <CardDefault title="Relatórios" icone="fact-check"/>
                </Link>

                <Link href="relatorio/ranking" style={{ marginVertical: 10 }}>
                    <CardDefault title="Rankings" icone="analytics"/>
                </Link>
            </View>
        </View>
    )
}
