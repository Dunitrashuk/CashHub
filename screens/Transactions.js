import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView, RefreshControl, Alert, Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TransactionCard from '../components/TransactionCard';
import AccountTag from '../components/AccountTag';
import { BASE_URL } from '@env'
import Constants from 'expo-constants';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { selectUser } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAccounts, setLastTransactions, setTransactions } from '../redux/slices/userSlice';
import TopBar from '../components/TopBar';

const styles = StyleSheet.create({
    top: {
        height: 35,
        backgroundColor: "transparent"
    },
    mainContainer: {
        display: "flex",
        flex: 1,
        backgroundColor: "#1A1A1A",
    },
    transactionsContainer: {
        height: 520,
        marginLeft: 20,
        marginRight: 20,
        width: 350,
        backgroundColor: '#272727',
        borderRadius: 15,
        paddingBottom: 10,
        paddingTop: 10,

    },

    tagsContainer: {
        backgroundColor: 'transparent',
        paddingBottom: 10,
        paddingTop: 10,
    },

    logo: {
        resizeMode: "contain",
        alignSelf: 'center',
        width: "25%",
    },
    title: {
        fontSize: 20,
        color: "#E7E7E7",
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: "bold",
    },
    searchBar: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        color: "white",
        borderRadius: 10,
        backgroundColor: "#272727"
    },
    accountTag: {
        display: "flex",
        alignItems: "center",
        marginLeft: 10,
        height: 35,
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: 10
    },

    clickedTag: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 10,
        height: 35,
        backgroundColor: '#404040',
        borderRadius: 10,
        padding: 10
    },

    name: {
        fontSize: 12,
        fontWeight: "300",
    },
});

function fetchTransactions(dispatch, account_id = "") {
    axios.get(`${BASE_URL}/api/transactions/`, {
        params: {
            account_id: account_id
        },
        headers: {
            authorization: Constants.manifest.extra.TOKEN
        },
    }).then(response => {
        let data = response.data.data;
        dispatch(setTransactions({
            transactions: data
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

function fetchSearchedTransactions(dispatch, searchPhrase, account_id) {
    axios.get(`${BASE_URL}/api/transactions/search`, {
        params: {
            account_id: account_id,
            query: searchPhrase
        },
        headers: {
            authorization: Constants.manifest.extra.TOKEN
        },
    }).then(response => {
        let data = response.data.data;
        dispatch(setTransactions({
            transactions: data
        }))
        // console.log(response)

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


export default function Transactions() {
    const accounts = useSelector(selectUser).accounts;
    const transactions = useSelector(selectUser).transactions;

    const [refreshing, setRefreshing] = React.useState(false);
    const [clickedAccount, setClickedAccount] = useState('0');
    const [lastSearched, setLastSearch] = useState("");

    const dispatch = useDispatch();


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setClickedAccount('0')
        fetchTransactions(dispatch, clickedAccount);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        fetchTransactions(dispatch)
    }, [accounts])

    return (
        (accounts.length !== 0) ? (

            <SafeAreaView style={styles.mainContainer}>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                    <TopBar />

                    <Text style={styles.title}>Transactions</Text>

                    <SearchBar
                        account_id={clickedAccount}
                        fetch={fetchSearchedTransactions}
                        lastSearched={lastSearched}
                        setLastSearch={setLastSearch}
                    />


                    <View style={styles.tagsContainer}>
                        <FlatList
                            data={accounts}
                            keyExtractor={(item => item.id)}
                            scrollEventThrottle="fast"
                            decelerationRate='fast'
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <Pressable
                                        style={(clickedAccount === item.id) ? styles.clickedTag : styles.accountTag}
                                        onPress={() => {
                                            setClickedAccount(item.id)
                                            fetchTransactions(dispatch, item.id)
                                        }}>
                                        <Text style={styles.name}>{item.name}</Text>
                                    </Pressable>)
                            }}
                        // ListHeaderComponent={() => {
                        //     return (
                        //         <Pressable key="All" style={(clickedAccount === "") ? styles.clickedTag : styles.accountTag}
                        //             onPress={() => {
                        //                 setClickedAccount("")
                        //                 fetchTransactions(dispatch)
                        //             }
                        //             }>
                        //             <Text style={styles.name}>All</Text>
                        //         </Pressable>)
                        // }}
                        />
                    </View>


                    <Animated.View style={styles.transactionsContainer}>
                        <FlatList
                            data={transactions}
                            keyExtractor={(item => item.id)}
                            scrollEventThrottle="fast"
                            decelerationRate='fast'
                            renderItem={({ item }) => {
                                return <TransactionCard source={item.description} date={item.made_on} amount={item.amount} category={item.category} currency={item.currency_code} />
                            }}
                        />
                    </Animated.View>
                </ScrollView>
            </SafeAreaView >)
            : (
                <SafeAreaView style={styles.mainContainer}>
                    <TopBar />

                    <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={styles.title}>Transactions</Text>
                    </View>
                    <Text style={{ fontSize: 14, color: "grey", marginLeft: 20 }}>Add bank account first, to see transactions details</Text>
                </SafeAreaView>
            )
    );
}