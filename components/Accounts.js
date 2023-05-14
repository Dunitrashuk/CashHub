import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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
});

const { width } = Dimensions.get('window');


export default function Accounts(props) {

    const [clickedAccount, setClickedAccount] = useState('0');


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
                    return <AccountCard name={item.name} balance={item.balance} currency_code={item.currency_code} nature={item.nature} account_id={item.id} clicked_account={clickedAccount} setClickedAccount={setClickedAccount} />
                }}
                ListFooterComponent={() => <AddBankAccount />}
            />
        </View>
    );
}