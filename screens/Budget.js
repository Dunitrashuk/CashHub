import React from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';


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

export default function Budget({ navigation }) {
    let onTrack = true;


    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.top}>
                <Image style={styles.logo} source={require('../assets/cashhub.png')} />
            </View>
            <Text style={styles.title}>Budget</Text>

            <View style={styles.miniBudgetPlanContainer}>
                <View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#D6D6D6', fontWeight: 'bold' }}>Monthly Plan:  </Text>
                        <Text style={{ fontSize: 14, color: onTrack ? '#7DA747' : '#A73C3C' }}>2000$</Text>
                    </View>

                    <Text style={{ fontSize: 11, color: '#818181', marginTop: 15 }}>{(onTrack) ? 'You are on track' : 'You exceeded monthly plan'}</Text>

                    <View style={styles.budgetBar}>
                        <Animated.View style={{ ...StyleSheet.absoluteFill, backgroundColor: onTrack ? '#7DA747' : '#A73C3C', width: onTrack ? '65%' : '100%' }} />
                    </View>
                </View>



            </View>

            {/* <ProgressChart
                data={[0.6]}
                width={Dimensions.get('window').width - 40}
                height={220}
                strokeWidth={20}
                radius={70}
                chartConfig={{
                    backgroundColor: '#272727',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

                }}
                style={{
                    backgroundColor: '#272727',
                    marginVertical: 8,
                    borderRadius: 16,
                    marginLeft: 20
                }}
            /> */}

        </SafeAreaView>
    );
}