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
        marginLeft: 20,
        height: 130,
        width: 250,
        backgroundColor: 'grey',
        opacity: 0.8,
        borderRadius: 15,
        padding: 15
    },

    bank: {
        fontSize: 15,
        color: "#BBBBBB",
        fontWeight: "bold",
    },

    balance: {
        marginTop: 10,
        fontSize: 30,
        color: "#E7E7E7",
        fontWeight: "bold",
    }
});

export default function AccountCard(props) {
    return (
        <TouchableOpacity style={styles.accountCard}>
            <Text style={styles.bank}>{props.bank}</Text>
            <Text style={styles.balance}>{props.balance}</Text>
        </TouchableOpacity>
    );
}