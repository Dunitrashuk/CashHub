import React from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AccountCard from './AccountCard';
import Icon from 'react-native-vector-icons/Ionicons';
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
    }
]

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: "#E7E7E7",
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: "bold",
    },

    transactionsContainer: {
        height: 220,
        marginLeft: 20,
        marginRight: 20,
        width: 350,
        backgroundColor: '#272727',
        borderRadius: 15,
        paddingBottom: 10,
        paddingTop: 10
    },

    seeMore: {
        fontSize: 10,
        color: "#818181",
        alignSelf: 'flex-end',
        padding: 10,
        marginRight: 20
    }

});

export default function Accounts(props) {
    return (
        <View>
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.title}>Last Transactions</Text>
                <Text style={styles.seeMore}>See More</Text>
            </View>
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
        </View>
    );
}