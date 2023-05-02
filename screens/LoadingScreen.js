import React from 'react';
import { useState } from 'react';
import { Text, StyleSheet, View, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

const styles = StyleSheet.create({
    logoContainer: {
        paddingTop: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: "20%",
    },
    logo: {
        fontSize: 28,
        fontWeight: "600",
        color: "#BFBFBF"
    },
    cardsContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 4,
        height: "60%",
    },
    cardsImage: {
        flex: 1,
        width: "85%",
        height: "auto",
        resizeMode: 'contain'
    },
    text: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: "500",
        color: "#D6D6D6",
        width: "70%",
        textAlign: "center",
        letterSpacing: 1,
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 2,
    },
});

export default function LoadingScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1A1A1A" }}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>cashhub</Text>
            </View >
            <View style={styles.cardsContainer}>
                <Image style={styles.cardsImage} source={require('../assets/cards.png')} />
                <Text style={styles.text}>Loading Accounts</Text>
                <Text style={{ color: '#D6D6D6', fontSize: 15, padding: 10 }}>This may take some time</Text>
            </View>

            <View style={styles.buttonContainer}>
                {/* <TouchableOpacity onPress={() => navigation.navigate("Main")}></TouchableOpacity> */}
                <ActivityIndicator size="large" color="#7DA747" />
            </View>
        </SafeAreaView>
    )
}