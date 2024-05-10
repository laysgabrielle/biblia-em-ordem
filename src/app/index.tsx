import { Text, View, Image } from "react-native";
import { Link } from "expo-router";


export default function Home(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#152E45' }}>

            <Image
                source={require('../../assets/images/feed.jpg')}
                style={{ width: 100, height: 100, borderRadius: 50 }}
            />

            <Link href={"feed/"}>
                <Text>Avançar</Text>
            </Link>
        </View>
        
    )
}