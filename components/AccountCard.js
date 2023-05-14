import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLastTransactions, setMiniBudgetPlan } from '../redux/slices/userSlice';
import axios from 'axios';
import { BASE_URL } from '@env'
import Constants from 'expo-constants';


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

    accountCardFocused: {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: 20,
        height: 130,
        width: 250,
        backgroundColor: '#303030',
        opacity: 0.8,
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

function fetchLastTransactions(account_id, dispatch) {
    axios.get(`${BASE_URL}/api/transactions/`, {
        params: {
            last: true,
            account_id: account_id
        },
        headers: {
            authorization: Constants.manifest.extra.TOKEN
        }
    }).then(response => {
        let data = response.data;
        // console.log(data)
        dispatch(setLastTransactions({
            lastTransactions: data
        }))
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
        })
}

function fetchBudgetPlan(account_id, dispatch) {
    axios.get(`${BASE_URL}/api/budget/${account_id}`, {
        headers: {
            authorization: Constants.manifest.extra.TOKEN
        }
    }).then(response => {
        let data = response.data;
        console.log(response.status)
        dispatch(setMiniBudgetPlan({
            miniBudgetPlan: data
        }
        ))

    }).catch(error => {
        console.log(error)
        dispatch(setMiniBudgetPlan({
            miniBudgetPlan: {}
        }))
    })
}

function handleAccountPress(setClickedAccount, account_id, dispatch) {
    setClickedAccount(account_id)
    fetchLastTransactions(account_id, dispatch)
    fetchBudgetPlan(account_id, dispatch)
}

export default function AccountCard(props) {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity style={(props.clicked_account === props.account_id) ? styles.accountCardFocused : styles.accountCard} onPress={() => handleAccountPress(props.setClickedAccount, props.account_id, dispatch)}>
            <Text style={styles.account_name}>{props.name}</Text>
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.balance}>{props.balance} </Text>
                <Text style={styles.currency}> {props.currency_code}</Text>
            </View>
            <Text style={styles.type}>{props.nature.replaceAll("_", " ").toUpperCase()}</Text>
        </TouchableOpacity>
    );
}