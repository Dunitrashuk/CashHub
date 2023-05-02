import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TransactionCard from '../components/TransactionCard';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: "#E7E7E7",
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: "bold",
    },

    transactionsContainer: {
        height: 220,
        marginLeft: 20,
        marginRight: 20,
        width: 350,
        backgroundColor: '#272727',
        borderRadius: 15,
        paddingBottom: 10,
        paddingTop: 10
    },

    seeMore: {
        fontSize: 10,
        color: "#818181",
        alignSelf: 'flex-end',
        padding: 10,
        marginRight: 20
    }

});

export default function LastTransactions(props) {
    const navigation = useNavigation();

    return (
        <View>
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.title}>Last Transactions</Text>
                <Text style={styles.seeMore} onPress={() => navigation.navigate("Transactions")}>See More</Text>
            </View>
            <View style={styles.transactionsContainer}>
                <FlatList
                    data={props.data}
                    keyExtractor={(item => item.id)}
                    scrollEventThrottle="fast"
                    decelerationRate='fast'
                    renderItem={({ item }) => {
                        return <TransactionCard source={item.description} date={item.made_on} amount={item.amount} category={item.category} currency={item.currency_code} />
                    }}
                />
            </View>
        </View>
    );
}