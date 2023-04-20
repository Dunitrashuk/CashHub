import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: "#E7E7E7",
        marginBottom: 10,
        marginTop: 20
    },

    transactionCard: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15,
        height: 60,
        width: 350,
    },

    source: {
        fontSize: 15,
        color: "#D6D6D6",
        fontWeight: "bold",
    },

    amount: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    date: {
        fontSize: 10,
        color: "#818181",
    }
});

export default function TransactionCard(props) {
    let negative = (props.amount < 0) ? true : false;
    return (
        <TouchableOpacity style={styles.transactionCard}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={"card-outline"} size={20} color={"#D6D6D6"} />
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 60, padding: 10 }}>
                    <Text style={styles.source}>{props.source}</Text>
                    <Text style={styles.date}>{props.date}</Text>
                </View>
            </View>

            <Text style={{
                color: negative ? '#A73C3C' : '#7DA747', fontSize: 15,
                fontWeight: 'semi-bold',
            }}>{negative ? '' : '+'}{props.amount}$</Text>

        </TouchableOpacity >
    );
}