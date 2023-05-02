import React, {useState, useContext} from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Context } from "../context/FeedListContext";

import { Toast } from 'toastify-react-native';

// recebendo a navegação como props para poder navegar para a tela Index após adicionar um novo feed
const FeedForm = ({navegacao}) => {

    // criando estados para os campos do formulário
    const [title, setTitle] = useState("");
    const [urlFeed, seturlFeed] = useState("");

    // pegando o state e a função addFeed do context para adicionar um novo feed

    const { state, addFeed,fetchItem }  = useContext(Context);

    const [loading, setLoading] = useState(false);



    // função para adicionar um novo feed ao estado global do app
    function adicionarFeed() {

        // chamando a função addFeed do context

        if (title == "" || urlFeed == "") {
            Toast.error('Preencha todos os campos!');
            return;
        } else if (state.find((feed) => feed.urlFeed === urlFeed)) {
            Toast.error('Feed já cadastrado!');
            return;
        }

        fetchItem(title, urlFeed, () => navegacao.navigate('Index'));

        // navegando para a tela Index
        //navegacao.navigate("Index"); // n


    }

    return (
        <View style={styles.container}>
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



            <TouchableOpacity onPress={() => { adicionarFeed() }}>
            <View style={styles.btnAdd}>
                <Text style={styles.btnText}>Adicionar</Text>
            </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#cad8e7",
    },
    input: {
        fontSize: 18,
        backgroundColor: "white",
        marginTop: 15,

        minHeight: 50,
        marginBottom: 15,
        padding: 5,
        borderRadius: 8,
        margin: 7,
    },
    btnAdd: {
        fontSize: 18,
        marginBottom: 15,
        padding: 5,
        borderRadius: 8,
        margin: 5,
        backgroundColor: "#006DF0",
        minHeight: 50,
        color: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "white",
        fontSize: 18,
        fontWeight: 500,
    },
});

export default FeedForm;
