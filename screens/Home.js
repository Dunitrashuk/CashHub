import React, { useEffect } from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import Accounts from '../components/Accounts';
import LastTransactions from '../components/LastTransactions';
import MiniBudgetPlan from '../components/MiniBudgetPlan';
import axios from 'axios';
import { BASE_URL } from '@env'
import Constants from 'expo-constants';
import { selectUser } from '../redux/slices/userSlice';
import { store } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setAccounts, setLastTransactions } from '../redux/slices/userSlice';


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
        top: -40,
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

function fetchAccounts(dispatch) {
    axios.get(`${BASE_URL}/api/accounts`, {
        headers: {
            authorization: Constants.manifest.extra.TOKEN
        }
    }).then(response => {
        let data = response.data;
        dispatch(setAccounts({
            accounts: data
        }))
        console.log(response)
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
};

function fetchLastTransactions(dispatch) {
    axios.get(`${BASE_URL}/api/transactions/`, {
        params: {
            last: true
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

export default function Home() {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const accounts = useSelector(selectUser).accounts;
    const lastTransactions = useSelector(selectUser).lastTransactions;
    const name = useSelector(selectUser).name;

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchAccounts(dispatch);
        fetchLastTransactions(dispatch);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [accounts]);
    useEffect(() => {
        if (!accounts || !lastTransactions)
            return
        fetchAccounts(dispatch);
        fetchLastTransactions(dispatch);
    }, [])

    return (
        <SafeAreaView style={homeStyles.homePage}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <Image style={homeStyles.circles} source={require('../assets/circles.png')} />
                <View style={homeStyles.homePageContainer}>
                    <View style={homeStyles.top}>
                        <Image style={homeStyles.logo} source={require('../assets/cashhub.png')} />
                    </View>
                    <Text style={homeStyles.greeting}>Hello, {name}</Text>
                    <Accounts data={accounts} />
                    {(accounts.length !== 0) && <LastTransactions data={lastTransactions} />}
                    {(accounts.length !== 0) && <MiniBudgetPlan />}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 