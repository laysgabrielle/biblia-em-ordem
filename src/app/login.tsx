import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from "expo-router"; 

export default function Login() {
    const [userMail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');
    const router = useRouter(); 

    function userLogin() {
        signInWithEmailAndPassword(auth, userMail, userPass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                router.push("/feed"); 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={require("../../assets/images/Blidem.png")} style={styles.image} />
                <TextInput
                    style={styles.input}
                    placeholder="Login"
                    placeholderTextColor="#000"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={userMail}
                    onChangeText={setUserMail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#000"
                    secureTextEntry
                    value={userPass}
                    onChangeText={setUserPass}
                />
                <Pressable style={styles.button} onPress={userLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#152E45',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 24,
    },
    input: {
        width: '80%',
        height: 55,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 4,
        backgroundColor: "orange",
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
});
