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

export default function Forecasting({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1A1A1A" }}>
            <View style={styles.top}>
                <Image style={styles.logo} source={require('../assets/cashhub.png')} />
            </View>
            <Text style={styles.title}>Forecasting</Text>
            <BarChart
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
                    datasets: [
                        {
                            data: [20, 45, 28, 80, 99, 43],
                        },
                    ],
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                yAxisLabel={'$'}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                        padding: 20
                    },
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