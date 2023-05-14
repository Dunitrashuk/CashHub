import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



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
    addBankContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 80,
        width: '60%',
        justifyContent: "space-around",
        alignItems: "center",
    }
});


export default function MiniBudgetPlanAlternative(props) {
    let navigation = useNavigation();

    return (
        <View>
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.title}>Budget Plan</Text>
                <Text style={styles.seeMore} onPress={() => navigation.navigate("Budget")}>See More</Text>
            </View>

            <View style={styles.miniBudgetPlanContainer}>
                <View>

                    <Text style={{ fontSize: 12, color: '#818181' }}>There is no budget plan for this account</Text>

                    <TouchableOpacity style={styles.addBankContainer} onPress={() => navigation.navigate('Budget')}>
                        <Text style={{ color: "grey", fontWeight: "bold", fontSize: 15, }}>Create Budget Plan</Text>
                        <Icon name={"arrow-forward"} size={25} color={"grey"} />
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    );
}