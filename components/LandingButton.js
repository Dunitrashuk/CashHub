import React from 'react'
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    button: {
        width: "60%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 70,
        borderRadius: 10,
        backgroundColor: 'transparent',
        borderColor: "#7DA747",
        borderWidth: 1
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "500",
        letterSpacing: 0.25,
        color: '#7DA747',
    },
});

const LandingButton = ({ navigation }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.text}>Get Started</Text>
        </TouchableOpacity>
    )
}

export default LandingButton
