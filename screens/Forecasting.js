import React from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, Dimensions } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import TopBar from '../components/TopBar';

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
});

export default function Forecasting() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1A1A1A" }}>
            <TopBar />
            <Text style={styles.title}>Forecasting</Text>
            <BarChart
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
                    datasets: [
                        {
                            data: [301, 666, 1560, 2040, 2595, 4673],
                        },
                    ],
                }}
                fromZero={true}
                showValuesOnTopOfBars={true}
                width={Dimensions.get('window').width - 40}
                height={250}
                yAxisLabel={'$'}
                chartConfig={{
                    backgroundGradientFrom: '#1A1A1A',
                    backgroundGradientTo: '#1A1A1A',
                    backgroundGradientToOpacity: 0.1,
                    decimalPlaces: 1,
                    color: () => '#BBBBBB',
                    style: {
                        borderRadius: 100,
                    },
                    fillShadowGradientFrom: '#A73C3C',
                    fillShadowGradientTo: '#A73C3C',
                    fillShadowGradientFromOpacity: .5,
                    fillShadowGradientToOpacity: 0
                }}
                style={{
                    marginVertical: 20,
                    borderRadius: 16,
                    marginLeft: 20
                }}
            />
        </SafeAreaView>
    );
}