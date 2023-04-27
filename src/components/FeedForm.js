import React, {useState, useContext} from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { Context } from "../context/FeedListContext";


// recebendo a navegação como props para poder navegar para a tela Index após adicionar um novo feed
const FeedForm = ({navegacao}) => {

    // criando estados para os campos do formulário
    const [title, setTitle] = useState("");
    const [urlFeed, seturlFeed] = useState("");

    // pegando o state e a função addFeed do context para adicionar um novo feed

    const { state, addFeed }  = useContext(Context);

    // função para adicionar um novo feed ao estado global do app
    function adicionarFeed() {
        addFeed(title, urlFeed); // chamando a função addFeed do context
        navegacao.navigate("Index"); // navegando para a tela Index após adicionar um novo feed
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
                onPress={() => {adicionarFeed()}} // chamando a função adicionarFeed
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
