import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


const styles = StyleSheet.create({
    title: {
        fontSize: 10,
        color: "#E7E7E7",
        marginBottom: 10,
        marginTop: 20
    },

    accountTag: {
        display: "flex",
        alignItems: "center",
        marginLeft: 10,
        height: 35,
        backgroundColor: 'grey',
        borderRadius: 15,
        padding: 10
    },

    clickedTag: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 20,
        height: 35,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        padding: 10
    },


    name: {
        fontSize: 12,
        fontWeight: "300",
    },

});

export default function AccountTag(props) {
    return (
        <TouchableOpacity style={styles.clickedTag} onPress={() => console.log(props.name)}>
            <Text style={styles.name}>{props.name}</Text>
        </TouchableOpacity>
    );
}