import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
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
        height: 130,
        width: 340,
        backgroundColor: 'grey',
        opacity: 0.8,
        borderRadius: 15,
        padding: 15,
        justifyContent: "space-around",
        alignItems: "center",
    }
});

const { width } = Dimensions.get('window');


function addBankAccount() {
    axios.post(`${BASE_URL}/api/connect/connect`, {
        return_to: Linking.createURL("Main")
    }, {
        headers: {
            authorization: Constants.manifest.extra.TOKEN
        }
    })
        .then(response => {
            let url = response.data.connect_url;
            Linking.openURL(url)
        })
        .catch(error => {
            Alert.alert(
                'Error',
                'Could not connect to API',
                [
                    {
                        text: 'Try Again',
                        style: 'cancel',
                    },
                ],
            );
            console.log(error)
        });
}

export default function AddBankAccount() {

    return (
        <TouchableOpacity onPress={addBankAccount} style={styles.addBankContainer}>
            <Text style={{ color: "#E7E7E7", fontWeight: "bold", fontSize: 15, }}>Add bank account</Text>
            <Icon name={"add-circle-outline"} size={50} color={"#7DA747"} />
        </TouchableOpacity>
    );
}