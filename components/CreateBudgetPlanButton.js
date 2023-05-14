import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as Linking from 'expo-linking';
import { BASE_URL } from '@env';
import Constants from 'expo-constants';


const styles = StyleSheet.create({
    addBankContainer: {
        display: "flex",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 60,
        height: 80,
        width: 340,
        opacity: 0.8,
        borderRadius: 15,
        justifyContent: "space-around",
        alignItems: "center",
    }
});


export default function CreateBudgetPlanButton({ setVisible }) {

    return (
        <TouchableOpacity style={styles.addBankContainer} onPress={() => setVisible(true)}>
            <Text style={{ color: "#E7E7E7", fontWeight: "bold", fontSize: 15, }}>Create Budget Plan</Text>
            <Icon name={"add-circle-outline"} size={50} color={"grey"} />
        </TouchableOpacity>
    );
}