import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Linking, TouchableOpacity,FlatList } from 'react-native';
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
     //abrir o link no navegador do celular
        Linking.openURL(link);
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
                        <TouchableOpacity onPress={() => abrirLink(item.link)}>
                        <View style={styles.row}>

                            <View style={styles.col}>
                            <Text style={styles.dataPublicacao}>{item.pubDate}</Text>
                            <Text style={styles.titulo}>{item.title}</Text>

                            <Text style={styles.descricao}>{item.description}</Text>

                            </View>
                        </View>
                        </TouchableOpacity>
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
    col: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,

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
        fontSize: 10,
        maxHeight: 4 * 18,
        overflow: 'hidden',
        textAlign: 'justify',
        lineHeight: 18 * 1.2,

    },
    dataPublicacao: {
        fontSize: 10,
        fontStyle: 'italic',
        color: 'gray',
        textAlign: 'right'

    },
    icon: {
        fontSize: 24
    }
});

export default ShowFeedScreen;
