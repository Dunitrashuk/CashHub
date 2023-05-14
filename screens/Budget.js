import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Alert, SafeAreaView, Text, StyleSheet, Dimensions, Animated, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setBudgetPlans } from '../redux/slices/userSlice';
import { useState } from 'react';
import { BASE_URL } from '@env'
import axios from 'axios';
import Constants from 'expo-constants';
import TopBar from '../components/TopBar';
import BudgetPlan from '../components/BudgetPlan'
import CreateBudgetPlanButton from '../components/CreateBudgetPlanButton';
import CreateBudgetPlanModal from '../components/CreateBudgetPlanModal';


const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flex: 1,
        backgroundColor: "#1A1A1A",
    },
    title: {
        fontSize: 20,
        color: "#E7E7E7",
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: "bold",
    },
    logo: {
        resizeMode: "contain",
        alignSelf: 'center',
        width: "25%",
    },

    miniBudgetPlanContainer: {
        height: 110,
        marginLeft: 20,
        marginRight: 20,
        width: 350,
        backgroundColor: '#272727',
        borderRadius: 15,
        padding: 15
    },

    budgetBar: {
        width: '100%',
        height: 20,
        marginTop: 15,
        backgroundColor: '#4F4F4F',
        borderRadius: 100,
        overflow: 'hidden'
    },

});

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


export default function Budget() {
    const accounts = useSelector(selectUser).accounts;
    const budgetPlans = useSelector(selectUser).budgetPlans;

    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        getBudgetPlans(dispatch)
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <TopBar />
            <Text style={styles.title}>Budget Plans</Text>

            <CreateBudgetPlanModal visible={visible} setVisible={setVisible} />

            {(accounts.length !== 0) ?
                <FlatList
                    data={budgetPlans}
                    keyExtractor={(item => item.id)}
                    scrollEventThrottle="fast"
                    decelerationRate='fast'
                    renderItem={({ item }) => {
                        const percentage = 100 * parseInt(item.spent) / parseInt(item.goal);
                        return <BudgetPlan account={item.account_name} goal={item.goal} spent={item.spent} percentage={percentage} currencyCode={item.currency_code} budgetId={item.id} />

                    }}
                    ListFooterComponent={() => <CreateBudgetPlanButton setVisible={setVisible} />}

                />

                :
                <Text style={{ fontSize: 14, color: "grey", marginLeft: 20 }}>Add bank account first</Text>
            }
        </SafeAreaView>
    );
}