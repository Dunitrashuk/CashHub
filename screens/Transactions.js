import React from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TransactionCard from '../components/TransactionCard';


const transactions = [
    {
        key: "1",
        source: "UNICAFE",
        date: "18 March 11:18",
        amount: -6.49
    },
    {
        key: "2",
        source: "STALMA LUX SRL",
        date: "18 March 11:18",
        amount: 150
    },
    {
        key: "3",
        source: "LINELA SUPERMARKET",
        date: "18 March 11:18",
        amount: -107.98
    },
    {
        key: "4",
        source: "AMDARIS",
        date: "18 March 11:18",
        amount: 1950
    },
    {
        key: "5",
        source: "UNICAFE",
        date: "18 March 11:18",
        amount: -6.49
    },
    {
        key: "6",
        source: "STALMA LUX SRL",
        date: "18 March 11:18",
        amount: 150
    },
    {
        key: "7",
        source: "LINELA SUPERMARKET",
        date: "18 March 11:18",
        amount: -107.98
    },
    {
        key: "8",
        source: "AMDARIS",
        date: "18 March 11:18",
        amount: 1950
    },
    {
        key: "9",
        source: "AMDARIS",
        date: "18 March 11:18",
        amount: 1950
    },
    {
        key: "10",
        source: "UNICAFE",
        date: "18 March 11:18",
        amount: -6.49
    },
    {
        key: "11",
        source: "STALMA LUX SRL",
        date: "18 March 11:18",
        amount: 150
    },
    {
        key: "12",
        source: "LINELA SUPERMARKET",
        date: "18 March 11:18",
        amount: -107.98
    },
    {
        key: "13",
        source: "AMDARIS",
        date: "18 March 11:18",
        amount: 1950
    }
]

const styles = StyleSheet.create({
    top: {
        height: 35,
        backgroundColor: "transparent"
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#1A1A1A",
    },
    transactionsContainer: {
        height: Dimensions.get('window').height / 1.55,
        marginLeft: 20,
        marginRight: 20,
        width: 350,
        backgroundColor: '#272727',
        borderRadius: 15,
        paddingBottom: 10,
        paddingTop: 10
    },
    logo: {
        resizeMode: "contain",
        alignSelf: 'center',
        width: "25%",
    },
    title: {
        fontSize: 20,
        color: "#E7E7E7",
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: "bold",
    },
    searchBar: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        padding: 10,
        color: "white",
        borderRadius: 10,
        backgroundColor: "#272727"
    }
});

export default function Transactions() {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.top}>
                <Image style={styles.logo} source={require('../assets/cashhub.png')} />
            </View>

            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text style={styles.title}>Transactions</Text>
            </View>
            <TextInput style={styles.searchBar}></TextInput>

            <View style={styles.transactionsContainer}>
                <FlatList
                    data={transactions}
                    keyExtractor={(item => item.key)}
                    scrollEventThrottle="fast"
                    decelerationRate='fast'
                    renderItem={({ item }) => {
                        return <TransactionCard source={item.source} date={item.date} amount={item.amount} />
                    }}
                />
            </View>
        </SafeAreaView>
    );
}