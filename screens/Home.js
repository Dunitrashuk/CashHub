import React from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet } from 'react-native';
import Accounts from '../components/Accounts';
import LastTransactions from '../components/LastTransactions';
import MiniBudgetPlan from '../components/MiniBudgetPlan';


const homeStyles = StyleSheet.create({
    top: {
        height: 35,
        backgroundColor: "transparent"
    },

    greeting: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: "bold",
        color: "#D6D6D6",
        marginLeft: 20
    },

    homePage: {
        flex: 1,
        backgroundColor: "#1A1A1A",
    },

    circles: {
        resizeMode: "contain",
        top: 20,
        width: "100%",
        position: "absolute"
    },

    homePageContainer: {
        flex: 1,
        backgroundColor: "transparent",
        padding: 0,
    },

    logo: {
        resizeMode: "contain",
        alignSelf: 'center',
        width: "25%",
    }
});

export default function Home() {
    return (
        <SafeAreaView style={homeStyles.homePage}>
            <Image style={homeStyles.circles} source={require('../assets/circles.png')} />
            <View style={homeStyles.homePageContainer}>
                <View style={homeStyles.top}>
                    <Image style={homeStyles.logo} source={require('../assets/cashhub.png')} />
                </View>
                <Text style={homeStyles.greeting}>Hello, Dumitras</Text>
                <Accounts />
                <LastTransactions />
                <MiniBudgetPlan />
            </View>
        </SafeAreaView>
    );
}