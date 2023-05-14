import React from 'react'
import { useState } from 'react';
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { useDispatch } from 'react-redux';


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
                <Feather
                    name="search"
                    size={20}
                    color="grey"
                    style={{ marginLeft: 1 }}
                />
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

