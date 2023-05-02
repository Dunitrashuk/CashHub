import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: "#E7E7E7",
        marginBottom: 10,
        marginTop: 20
    },

    transactionCard: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15,
        height: 60,
        width: 350,

    },

    source: {
        fontSize: 12,
        color: "#D6D6D6",
        fontWeight: "400",
        maxWidth: 210,
        overflow: 'hidden'
    },

    amount: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    date: {
        fontSize: 10,
        color: "#818181",
    }
});

function getCategoryIcon(category) {
    switch (category) {
        case "auto_and_transport":
            return "car-outline"
        case "bills_and_utilities":
            return "reader-outline"
        case "education":
            return "school-outline"
        case "entertainment":
            return "color-palette-outline"
        case "food_and_dining":
            return "fast-food-outline"
        case "health_and_fitness":
            return "fitness-outline"
        case "home":
            return "home-outline"
        case "income":
            return "cash-outline"
        case "shopping":
            return "pricetag-outline"
        case "travel":
            return "map-outline"
        default:
            return "card-outline"
    }
}

export default function TransactionCard(props) {
    let negative = (props.amount < 0) ? true : false;


    return (
        <TouchableOpacity style={styles.transactionCard}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={getCategoryIcon(props.category)} size={20} color={"#D6D6D6"} />
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 60, padding: 10 }}>
                    <Text style={styles.source}>{props.source}</Text>
                    <Text style={styles.date}>{props.date}</Text>
                </View>
            </View>

            <Text style={{
                color: negative ? '#A73C3C' : '#7DA747', fontSize: 15,
                fontWeight: 'semi-bold',
            }}>{negative ? '' : '+'}{props.amount} {props.currency}</Text>

        </TouchableOpacity >
    );
}