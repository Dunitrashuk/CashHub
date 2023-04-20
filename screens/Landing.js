import React from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet } from 'react-native';
import LandingButton from '../components/LandingButton';

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
    cardsText: {
        marginTop: 20,
        fontSize: 38,
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

const Landing = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1A1A1A" }}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>cashhub</Text>
            </View >
            <View style={styles.cardsContainer}>
                <Image style={styles.cardsImage} source={require('../assets/cards.png')} />
                <Text style={styles.cardsText}>Your Finances In One Place</Text>
            </View>
            <View style={styles.buttonContainer}>
                <LandingButton navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}

export default Landing
