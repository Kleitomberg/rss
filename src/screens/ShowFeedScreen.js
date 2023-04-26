import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Context as FeedListContext } from '../context/FeedListContext'
import { Context as FeedContext } from '../context/FeedContext'
import { useContext } from 'react';


const ShowFeedScreen = ({ route, navigation }) => {

    const feedListContext = useContext(FeedListContext);

    const feedID = route.params.id;


    const feed = feedListContext.state.find((feed) => feed.id === feedID);

    const { state, fetchItems } = useContext(FeedContext);


    //carrega os itens do feed
    useEffect(() => {
        fetchItems(feed.urlFeed);
    }, []);



    const abrirLink = (link) => {
        console.log('implementar, mandar o usuário para o link da notícia (item.link)');
    }

    return (
        <>
            <FlatList
                data={state}
                keyExtractor={(rssNews) => rssNews.id}
                renderItem={({ item }) => {
                    //atualmente só exibe o título, faça com que apareça data de publicação, descrição (pode cortar em 100 ou 200 caracteres para não ficar muito grande), e imagem (caso tenha)
                    //ao clicar em uma notícia, devemos chamar a função abrirLink que direciona o usuário para o link da notícia
                    return (
                        <View style={styles.row}>
                            <Text style={styles.titulo}>{item.title}</Text>
                        </View>
                    );
                }}
            />
        </>
    );
};

//altere os estilos como desejar para melhorar o layout
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    titulo: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    image: {
        //pode alterar largura e altura como desejar
        width: 100,
        height: 100,
        borderRadius: 4,
        margin: 5
    },
    descricao: {
        fontSize: 8
    },
    dataPublicacao: {
        fontSize: 10,
        fontStyle: 'italic'
    },
    icon: {
        fontSize: 24
    }
});

export default ShowFeedScreen;
