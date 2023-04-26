import React, {useState, useContext} from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { Context } from "../context/FeedListContext";


const FeedForm = ({navegacao}) => {

    const [title, setTitle] = useState("");
    const [urlFeed, seturlFeed] = useState("");
    const { state, addFeed }  = useContext(Context);

    function adicionarFeed() {
        addFeed(title, urlFeed);
        navegacao.navigate("Index");
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder="Enter Title"
              />
            <TextInput
                style={styles.input}
                value={urlFeed}
                onChangeText={(text) => seturlFeed(text)}
                placeholder="Enter URL"
                />

            <Button
                title="Add Feed"
                onPress={() => {adicionarFeed()}}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 15,
        padding: 5,
        borderRadius: 5,
        margin: 5,
    },
    btnAdd: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 15,
        padding: 5,
        borderRadius: 5,
        margin: 5,
    },
});

export default FeedForm;
