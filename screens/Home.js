import React, { useEffect } from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import TopBar from '../components/TopBar';
import Accounts from '../components/Accounts';
import LastTransactions from '../components/LastTransactions';
import MiniBudgetPlan from '../components/MiniBudgetPlan';
import axios from 'axios';
import { BASE_URL } from '@env'
import Constants from 'expo-constants';
import { selectUser, setBudgetPlans, setMiniBudgetPlan } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAccounts, setLastTransactions } from '../redux/slices/userSlice';
import MiniBudgetPlanAlternative from '../components/MiniBudgetPlanAlternative';


const homeStyles = StyleSheet.create({
    top: {
        height: 35,
        backgroundColor: "transparent"
    },

    greeting: {
        marginTop: 10,
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

async function getBudgetPlans(dispatch) {
    axios.get(`${BASE_URL}/api/budget`, {
        headers: {
            authorization: Constants.manifest.extra.TOKEN
        }
    }).then(response => {
        let data = response.data;
        dispatch(setBudgetPlans({
            budgetPlans: data
        }
        ))
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

function refresh() {
    axios.post(`${BASE_URL}/api/connect/refresh`, {}, {
        headers: {
            authorization: Constants.manifest.extra.TOKEN
        }
    })
}

export default function Home() {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const accounts = useSelector(selectUser).accounts;
    const lastTransactions = useSelector(selectUser).lastTransactions;
    const name = useSelector(selectUser).name;
    const miniBudgetPlan = useSelector(selectUser).miniBudgetPlan;

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refresh();
        setTimeout(() => {
            fetchAccounts(dispatch);
            fetchBudgetPlan('0', dispatch);
            getBudgetPlans(dispatch)
            setRefreshing(false);
        }, 1000);
    }, [accounts]);

    useEffect(() => {
        fetchAccounts(dispatch);
        setTimeout(() => {
            fetchLastTransactions(dispatch);

            setLoading(false);
        }, 1500);
    }, [])

    return (
        <SafeAreaView style={homeStyles.homePage}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <TopBar />
                <Image style={homeStyles.circles} source={require('../assets/circles.png')} />
                <View style={homeStyles.homePageContainer}>
                    <Text style={homeStyles.greeting}>Hello, {name}</Text>
                    {(loading) ?
                        <ActivityIndicator size="large" color="#7DA747" style={{ marginTop: 50 }} /> :
                        <>
                            <Accounts data={accounts} />
                            {(accounts.length !== 0) && <LastTransactions data={lastTransactions} />}
                            {(accounts.length !== 0) &&
                                (Object.keys(miniBudgetPlan).length === 0) ? <MiniBudgetPlanAlternative /> :
                                <MiniBudgetPlan account={miniBudgetPlan.account_name} goal={miniBudgetPlan.goal} spent={miniBudgetPlan.spent} currencyCode={miniBudgetPlan.currency_code} />}
                        </>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}