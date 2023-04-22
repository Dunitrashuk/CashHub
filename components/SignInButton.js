import React from 'react'
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 80,
        borderRadius: 10,
        backgroundColor: 'transparent',
        borderColor: "#7DA747",
        borderWidth: 1,

    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "500",
        letterSpacing: 0.25,
        color: '#7DA747',
    },
});

const SignInButton = ({ title }) => {
    return (
        <TouchableOpacity style={styles.button} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default SignInButton
