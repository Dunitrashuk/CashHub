import React from 'react';
import { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#1A1A1A",
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

    logoContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A1A1A",

    },

    formContainer: {
        marginTop: "10%",
        marginBottom: "10%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A1A1A",
    },

    buttonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A1A1A",
        marginTop: 20
    },


    logo: {
        resizeMode: "contain",
        alignSelf: 'center',
        width: "40%",
    },


    input: {
        width: "70%",
        height: 50,
        backgroundColor: "#272727",
        padding: 18,
        margin: 10,
        borderRadius: 5,
        color: "#BFBFBF",
    },

    signUpButton: {
        color: "#7DA747"
    },

    error: {
        color: "#A73C3C",
        fontSize: 10,
        alignSelf: 'flex-start',
        marginLeft: "15%"
    }

});

let schema = yup.object().shape({
    email: yup.string().email("Enter valid email").required("Email is required"),
    password: yup.string().required("Password is required"),
})

const SignIn = ({ navigation }) => {

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // console.log(username)

    return (
        <View style={styles.container}>


            <Image style={styles.logo} source={require('../assets/cashhub.png')} />


            <Formik
                initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
                validateOnMount={true}
                onSubmit={values => handleSignUp(values, navigation)}
                validationSchema={schema}
            >

                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.formContainer}>

                        <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={styles.input}
                            placeholder={"Email"}
                            placeholderTextColor="#454545"
                            autoCapitalize={"none"}
                        />
                        {(errors.email && touched.email) &&
                            <Text style={styles.error}>{errors.email}</Text>}
                        <TextInput
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            style={styles.input}
                            placeholder={"Password"}
                            placeholderTextColor="#454545"
                            secureTextEntry
                        />
                        {(errors.password && touched.password) &&
                            <Text style={styles.error}>{errors.password}</Text>}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={{
                                    color: '#7DA747',
                                    fontSize: 16,
                                    lineHeight: 21,
                                    fontWeight: "500",
                                    letterSpacing: 0.25,
                                }}>Sign In</Text>
                            </TouchableOpacity>
                            <Text style={{
                                color: "#CCCCCC",
                                marginTop: 14,
                                letterSpacing: 0.2
                            }}>Don't have an account?  <Text style={styles.signUpButton} onPress={() => navigation.navigate("SignUp")}>Sign Up</Text></Text>
                        </View>
                    </View>
                )}
            </Formik>

        </View >
    )
}

export default SignIn
