import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: "#E7E7E7",
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: "bold",
    },

    miniBudgetPlanContainer: {
        height: 115,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15,
        width: 350,
        backgroundColor: '#272727',
        borderRadius: 15,
        padding: 15
    },

    seeMore: {
        fontSize: 10,
        color: "#818181",
        alignSelf: 'flex-end',
        padding: 10,
        marginRight: 20
    },

    budgetBar: {
        width: '100%',
        height: 10,
        marginTop: 15,
        backgroundColor: '#4F4F4F',
        borderRadius: 100,
        overflow: 'hidden'
    },
});


export default function MiniBudgetPlan(props) {
    let onTrack = (parseFloat(props.goal) > parseFloat(props.spent)) ? true : false
    let navigation = useNavigation();
    const percentage = 100 * parseInt(props.spent) / parseInt(props.goal);

    return (
        <View>
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.title}>Budget Plan</Text>
                <Text style={styles.seeMore} onPress={() => navigation.navigate("Budget")}>See More</Text>
            </View>

            <View style={styles.miniBudgetPlanContainer}>
                <View>
                    {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#D6D6D6', fontWeight: 'bold' }}>Account: </Text>
                        <Text style={{ fontSize: 14, color: '#ffffff' }}>{props.account}</Text>
                    </View> */}
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#D6D6D6', fontWeight: 'bold' }}>Monthly Plan: </Text>
                        <Text style={{ fontSize: 14, color: onTrack ? '#7DA747' : '#A73C3C' }}>{props.goal} {props.currencyCode}</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#D6D6D6', fontWeight: 'bold' }}>Spent:  </Text>
                        <Text style={{ fontSize: 14, color: onTrack ? '#7DA747' : '#A73C3C' }}>{props.spent} {props.currencyCode}</Text>
                    </View>

                    <Text style={{ fontSize: 11, color: '#818181', marginTop: 15 }}>{(onTrack) ? 'You are on track' : 'You exceeded monthly plan'}</Text>

                    <View style={styles.budgetBar}>
                        <Animated.View style={{ ...StyleSheet.absoluteFill, backgroundColor: onTrack ? '#7DA747' : '#A73C3C', width: onTrack ? `${percentage}%` : '100%' }} />
                    </View>
                </View>

            </View>
        </View>
    );
}