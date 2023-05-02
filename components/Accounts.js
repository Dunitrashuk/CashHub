import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AccountCard from './AccountCard';
import AddBankAccount from './AddBankAccount';


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

});

const { width } = Dimensions.get('window');


export default function Accounts(props) {
    return (
        <View>
            <Text style={styles.title}>Accounts</Text>
            <FlatList
                data={props.data}
                keyExtractor={(item => item.id)}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToOffsets={[...Array(props.data.length)].map(
                    (x, i) => i * (width * 0.8 - 40))}
                snapToAlignment={'start'}
                scrollEventThrottle="fast"
                decelerationRate='fast'
                renderItem={({ item }) => {
                    return <AccountCard name={item.name} balance={item.balance} currency_code={item.currency_code} nature={item.nature} />
                }}
                ListFooterComponent={() => <AddBankAccount />}
            />
        </View>
    );
}