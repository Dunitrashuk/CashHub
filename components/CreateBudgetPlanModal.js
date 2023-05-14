import { useState } from 'react';
import { Modal, Button, StyleSheet, View, Pressable, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setBudgetPlans } from '../redux/slices/userSlice';
import { BASE_URL } from '@env'
import axios from 'axios';
import Constants from 'expo-constants';
import { Formik } from 'formik';
import * as yup from 'yup';


const styles = StyleSheet.create({
    fill: {
        height: 250
    },

    upper: {
        backgroundColor: '#DDD',
        flex: 1,
        opacity: 0
    },
    lower: {
        backgroundColor: '#272727',
        opacity: 1,
        flex: 1.2,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 80,
        borderRadius: 10,
        backgroundColor: 'transparent',
        borderColor: "#7DA747",
        borderWidth: 1,

    },
    input: {
        width: "96%",
        height: 50,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        color: "#BFBFBF",
        borderBottomWidth: 2,
        borderBottomColor: '#454545'
    },
    picker: {
        fontSize: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: '#BFBFBF',
        paddingRight: 30 // to ensure the text is never behind the icon
    }
})

function getAvailableAccounts(accounts, budgetPlans) {
    let availableAccounts = [...accounts];


    availableAccounts = availableAccounts.filter(available => !budgetPlans.map(b => b.account_id).includes(available.id))
    availableAccounts = availableAccounts.map(account => {
        return {
            lable: account.nature,
            value: account.id
        }
    })

    return availableAccounts
}

async function handleProcess(values, selectedId, selectedAccount, currencyCode, dispatch, setVisible) {
    await handleCreateBudgetPlan(values, selectedId, selectedAccount, currencyCode);
    setTimeout(() => {
        getBudgetPlans(dispatch)
    }, 1000)
    setVisible(false)
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

async function handleCreateBudgetPlan(values, selectedId, selectedAccount, currencyCode) {
    axios.post(`${BASE_URL}/api/budget`, {
        account_id: selectedId,
        account_name: selectedAccount,
        currency_code: currencyCode,
        goal: values.goal
    },
        {
            headers: {
                authorization: Constants.manifest.extra.TOKEN
            }
        })
        .then(response => {
            // console.log(response)
        })
        .catch(error => {
            Alert.alert(
                'Error',
                'Email not available',
                [
                    {
                        text: 'Try Again',
                        style: 'cancel',
                    },
                ],
            );
            console.log(error)
        });
}

let schema = yup.object().shape({
    account: yup.string().required("Account is required"),
    goal: yup.number().required("Goal is required"),
})

export default function CreateBudgetPlanModal({ visible, setVisible }) {
    const accounts = useSelector(selectUser).accounts;
    const budgetPlans = useSelector(selectUser).budgetPlans;
    let availableAccounts = [...accounts].map(account => {
        return {
            label: account.name,
            value: {
                account_name: account.name,
                currency_code: account.currency_code,
                account_id: account.id
            }
        }
    });

    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState('0')
    const [selectedAccount, setSelectedAccount] = useState('All accounts')
    const [currencyCode, setCurrencyCode] = useState('')


    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType='slide'
        >
            <Pressable style={styles.upper} onPress={() => setVisible(false)} />
            <View style={styles.lower}>
                <Formik
                    initialValues={{ account: "0", goal: "" }}
                    validateOnMount={true}
                    onSubmit={values => handleProcess(values, selectedId, selectedAccount, currencyCode, dispatch, setVisible)}
                    validationSchema={schema}
                >

                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.formContainer}>

                            <RNPickerSelect
                                onValueChange={(value) => {
                                    setSelectedId(value.account_id)
                                    setSelectedAccount(value.account_name)
                                    setCurrencyCode(value.currency_code)
                                }}
                                items={availableAccounts}
                                style={styles.picker}
                            />

                            <TextInput
                                onChangeText={handleChange('goal')}
                                onBlur={handleBlur('goal')}
                                value={values.goal}
                                style={styles.input}
                                placeholder={"Goal"}
                                placeholderTextColor="#454545"
                                keyboardType="numeric"
                                textAlign={'center'}
                                fontSize={30}
                                fontWeight={'bold'}
                            />


                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    <Text style={{
                                        color: '#7DA747',
                                        fontSize: 16,
                                        lineHeight: 21,
                                        fontWeight: "500",
                                        letterSpacing: 0.25,
                                    }}>Create Plan</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                </Formik>
            </View>

        </Modal>
    )
}