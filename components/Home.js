import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image, ScrollView, Dimensions  } from 'react-native';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
    useHistory
} from "react-router-dom";


const query_url = "http://www.omdbapi.com/?&apikey=28f4dae9&s=";



const Home = (props) => {
    const [movieTitle, setTitle] = useState("");
    const [search_result, setResult] = useState([]);

    const search_url = async () => {
        if (movieTitle != undefined && movieTitle != "") {
            const url = query_url + movieTitle;
            const result = await fetch(url);
            const data = await result.json();

            if (data.Response && data.Search != undefined) {
                console.log(data.Search);
                setResult(data.Search);
                setTitle("")
            }
        }
    }

    const nextPage = (index) => {
        props.history.push('/movie', search_result[index]);
    }

    return (<View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <TextInput placeholder={"Search for movie"}
                value={movieTitle}
                onChangeText={text => {
                    setTitle(text);
                }}
                style={styles.text}
            />

            <Button style={styles.button}
                onPress={() => search_url()}
                title="Search"
                color="#841584"
                accessibilityLabel="Search Movie Title"
            />

            <View style={styles.movieView}>
                {
                    search_result.map((item, index) => {

                        return (
                            <div onClick={() => nextPage(index)} key={index} styles={styles.container}>
                                <View style={styles.box}>
                                    <Image
                                        source={{
                                            width: 150,
                                            height: 250,
                                            uri: item.Poster
                                        }}
                                    />
                                    <div><Text> {item.Title} </Text></div>
                                    <div><Text> Year: {item.Year} </Text></div>
                                </View>
                            </div>
                        )
                    })
                }
            </View>
            </View>
        </ScrollView>
    </View>)
}

export default withRouter(Home);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE',
        flexDirection: 'column',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    scrollView: {
        padding: 10,
        flexDirection: 'column',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    movieView: {
        flex: 6,
        marginTop: 10,
    },
    box: {
        padding: 20,
        width: 400,
        height: 350,
        backgroundColor: '#A9A9A9',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer'
    },
    text: {
        flex: 2,
        margin: 10,
        width: Dimensions.get("window").width * 0.6,
        padding: 10,
        height: 60,
        maxHeight: 60,
        maxWidth: 400,
        alignItems: 'center',
        textAlign: 'center',
    },
    button: {
        flex: 2,
        margin: 10,
        padding: 10,
        width: Dimensions.get("window").width * 0.6,
        height: 30,
        width: 60,
    },
    movie: {
        padding: 0,
    }
});
