import React from 'react';
import { useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import SignInButton from '../components/SignInButton';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#1A1A1A",
    },

    logoContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A1A1A",

    },

    formContainer: {
        marginTop: "10%",
        marginBottom: "10%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A1A1A",
    },

    buttonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A1A1A",
    },


    logo: {
        fontSize: 36,
        fontWeight: "600",
        color: "#BFBFBF"
    },

    input: {
        width: "70%",
        height: 50,
        backgroundColor: "#272727",
        padding: 18,
        margin: 10,
        borderRadius: 5,
        color: "#BFBFBF",
    },

    signUpButton: {
        color: "#7DA747"
    }

});


const SignIn = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    console.log(username)

    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Text style={styles.logo}>cashhub</Text>
            </View >

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={"Username"}
                    placeholderTextColor="#454545"
                    onChangeText={newText => setUsername(newText)}
                    value={username}
                    autoCapitalize={"none"}
                    multiline={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder={"Password"}
                    placeholderTextColor="#454545"
                    secureTextEntry
                    onChangeText={password => setPassword(password)}
                    value={password}
                />
            </View>
            <View style={styles.buttonContainer}>
                <SignInButton navigation={navigation} title="Sign In" />
                <Text style={{ color: "#CCCCCC", marginTop: 14, letterSpacing: 0.2 }}>Don't have an account? <Text style={styles.signUpButton} onPress={() => navigation.navigate("SignUp")}>Sign Up</Text></Text>
            </View>
        </View >
    )
}

export default SignIn
