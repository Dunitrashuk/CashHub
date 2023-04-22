import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AccountCard from './AccountCard';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { openBrowserAsync } from 'expo-web-browser';
import * as Linking from 'expo-linking';


const cards = [
    {
        key: "a",
        bank: "Banca Transilvania",
        balance: "$24.385,49"
    },
    {
        key: "b",
        bank: "Victoria Bank",
        balance: "$3.102,19"
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

    addAccountButton: {
        display: "flex",
        marginLeft: 20,
        height: 130,
        width: 50,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        opacity: 0.5,
        borderRadius: 15,
    },

    addFirstBankContainer: {
        display: "flex",
        marginLeft: 20,
        marginRight: 20,
        height: 130,
        width: width,
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

    axios.post('https://guam-null-grew-cocktail.trycloudflare.com/api/connect/connect')
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
        });


}

export default function Accounts(props) {
    return (
        <View>
            <Text style={styles.title}>Accounts</Text>
            {/* <FlatList
                data={cards}
                keyExtractor={(item => item.key)}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToOffsets={[...Array(cards.length)].map(
                    (x, i) => i * (width * 0.8 - 40) + (i - 1) * 40)}
                snapToAlignment={'start'}
                scrollEventThrottle="fast"
                decelerationRate='fast'
                renderItem={({ item }) => {
                    return <AccountCard bank={item.bank} balance={item.balance} />
                }}
            /> */}
            <View style={styles.addFirstBankContainer}>
                <Text style={{ color: "#D6D6D6", fontWeight: "500" }}>Add your first bank account</Text>
                <TouchableOpacity onPress={addBankAccount}>
                    <Icon name={"add-circle-outline"} size={50} color={"#7DA747"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}