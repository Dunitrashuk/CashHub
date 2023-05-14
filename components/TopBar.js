import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';


function handleLogOut(dispatch) {
    dispatch(setUser({
        name: '',
        email: '',
        isSignedIn: false
    }))
}

export default function TopBar() {
    const dispatch = useDispatch();
    return (
        <View style={styles.top}>
            <Image style={styles.logo} source={require('../assets/cashhub.png')} />
            <TouchableOpacity style={styles.logOut} onPress={() => handleLogOut(dispatch)}>
                <Icon name={'log-out-outline'} size={20} color={"#A73C3C"} />
                <Text style={{ color: '#A73C3C' }}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "transparent",
        height: 35,
        zIndex: 3
    },

    logo: {
        resizeMode: "contain",
        width: 100,
        alignSelf: 'center',
        marginLeft: '37%'
    },

    logOut: {
        display: "flex",
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 20
    }
});