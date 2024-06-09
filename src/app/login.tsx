import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from "expo-router"; // Import useRouter

export default function Login() {
    const [userMail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');
    const router = useRouter(); // Initialize useRouter

    function userLogin() {
        signInWithEmailAndPassword(auth, userMail, userPass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                router.push("/feed"); // Navigate to the feed page
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login no Sistema</Text>
            <TextInput
                style={styles.input}
                placeholder="Login"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
                value={userMail}
                onChangeText={setUserMail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={userPass}
                onChangeText={setUserPass}
            />
            <Pressable style={styles.button} onPress={userLogin}>
                <Text style={styles.buttonText}>Logar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
