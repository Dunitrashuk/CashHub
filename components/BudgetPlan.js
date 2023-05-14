import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Animated, Pressable, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setBudgetPlans } from '../redux/slices/userSlice';
import { BASE_URL } from '@env'
import axios from 'axios';
import Constants from 'expo-constants';



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
        position: 'relative',
        height: 135,
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

    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 20,
        borderColor: 'grey',
        borderWidth: 1,
        paddingRight: 4,
        paddingLeft: 4,
        paddingTop: 2,
        borderRadius: 5
    }
});

async function handleDelete(budget_id, dispatch) {
    await deleteBudgetPlan(budget_id)
    await getBudgetPlans(dispatch)
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
            console.log(error)
        })
}

async function deleteBudgetPlan(budget_id) {
    await axios.delete(`${BASE_URL}/api/budget/${budget_id}`, {
        headers: {
            authorization: Constants.manifest.extra.TOKEN
        }
    }).then(response => {
        // console.log(response)
    }).catch(error => {
        console.log(error)
    })
}

export default function BudgetPlan(props) {
    let onTrack = (parseFloat(props.goal) > parseFloat(props.spent)) ? true : false
    const dispatch = useDispatch();

    return (
        <View style={styles.miniBudgetPlanContainer}>
            <View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 14, color: '#D6D6D6', fontWeight: 'bold' }}>Account: {props.account}</Text>

                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(props.budgetId, dispatch)}>
                        <Text style={{ color: "grey", fontWeight: "light", fontSize: 10, }}>Delete</Text>
                    </TouchableOpacity>
                </View>
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
                    <Animated.View style={{ ...StyleSheet.absoluteFill, backgroundColor: onTrack ? '#7DA747' : '#A73C3C', width: onTrack ? `${props.percentage}%` : '100%' }} />
                </View>
            </View>
        </View>
    );
}