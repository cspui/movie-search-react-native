import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions } from 'react-native';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
    useHistory,
    useLocation
} from "react-router-dom";

const query_url = "http://www.omdbapi.com/?&apikey=28f4dae9&t=";

const Movie = (props) => {
    const [search_result, setResult] = useState({});
    const location = useLocation();

    console.log(location.state)


    const search_details = async () => {
        if (location.state.Title != undefined) {
            const url = query_url + location.state.Title;
            const result = await fetch(url);
            const data = await result.json();

            setResult(data);
            console.log("search: ", search_result);
        }

    }

    useEffect(() => {
        const runIt = search_details;
        runIt();
    }, []);

    return (

        <View style={styles.container}>
            <Image
                source={{
                    width: 200,
                    height: 300,
                    uri: search_result.Poster
                }}
            />
            <Text style={styles.text}> Title: {search_result.Title} </Text>
            <Text style={styles.text}> Year: {search_result.Year} </Text>
            <Text style={styles.text}> Genre: {search_result.Genre} </Text>
            <Text style={styles.text}> imdbRating: {search_result.imdbRating} </Text>
            <span> Plot:</span>
            <Text style={styles.text}> {search_result.Plot} </Text>
            <Button
                onPress={() => props.history.push('/')}
                title="Back"
                color="#841584"
                accessibilityLabel="Back To Home"
            />
        </View>
    )
}

export default withRouter(Movie);


const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    text: {
        fontSize: 20,
    },
});
