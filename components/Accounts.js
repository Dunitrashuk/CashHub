import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AccountCard from './AccountCard';
import Icon from 'react-native-vector-icons/Ionicons';


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
    }

});

const { width } = Dimensions.get('window');

export default function Accounts(props) {
    return (
        <View>
            <Text style={styles.title}>Accounts</Text>
            <FlatList
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
            />
        </View>
    );
}