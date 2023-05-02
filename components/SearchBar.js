import React from 'react'
import { useState } from 'react';
import { Feather, Entypo } from "@expo/vector-icons";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { useDispatch, useSelector } from 'react-redux';


const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "94%",

    },
    searchBar__unclicked: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#272727",
        borderRadius: 10,
        alignItems: "center",
    },
    searchBar__clicked: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#272727",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        color: "#E7E7E7",
        fontSize: 14,
        marginLeft: 10,
        width: "90%",

    },
});


function SearchBar({ account_id, fetch, lastSearched, setLastSearch }) {
    const dispatch = useDispatch();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    async function fetchSearched() {
        await fetch(dispatch, searchPhrase, account_id)
        setLastSearch(searchPhrase)
    }


    if (clicked && searchPhrase !== "" && searchPhrase !== lastSearched) {
        fetchSearched()
    }

    console.log("search")

    return (
        <View style={styles.container}>
            <View
                style={
                    clicked
                        ? styles.searchBar__clicked
                        : styles.searchBar__unclicked
                }
            >
                {/* search Icon */}
                <Feather
                    name="search"
                    size={20}
                    color="grey"
                    style={{ marginLeft: 1 }}
                />
                {/* Input field */}
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    placeholderTextColor="#454545"
                    onFocus={() => {
                        setClicked(true);
                    }}

                />


            </View>
            {/* cancel button, depending on whether the search bar is clicked or not */}
            {clicked && (
                <View>
                    <Button
                        title="Cancel"
                        onPress={() => {
                            Keyboard.dismiss();
                            setClicked(false);
                        }}
                    ></Button>
                </View>
            )}
        </View>
    )
}

export default SearchBar

