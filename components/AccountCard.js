import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: "#E7E7E7",
        marginBottom: 10,
        marginTop: 20
    },

    accountCard: {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: 20,
        height: 130,
        width: 250,
        backgroundColor: 'grey',
        opacity: 0.85,
        borderRadius: 15,
        padding: 15,
    },

    account_name: {
        fontSize: 15,
        color: "#BBBBBB",
        fontWeight: "bold",
    },

    balance: {
        fontSize: 25,
        color: "#E7E7E7",
        fontWeight: "bold",
    },

    currency: {
        fontSize: 15,
        color: "black",
        fontWeight: '600'
    },

    type: {
        fontSize: 15,
        color: "#E7E7E7",
        alignSelf: "flex-end"
    }
});

export default function AccountCard(props) {
    return (
        <TouchableOpacity style={styles.accountCard} onPress={() => console.log(props.name)}>
            <Text style={styles.account_name}>{props.name}</Text>
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.balance}>{props.balance} </Text>
                <Text style={styles.currency}> {props.currency_code}</Text>
            </View>
            <Text style={styles.type}>{props.nature.replaceAll("_", " ").toUpperCase()}</Text>
        </TouchableOpacity>
    );
}