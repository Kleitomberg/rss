import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Linking, TouchableOpacity,FlatList } from 'react-native';
import { Context as FeedListContext } from '../context/FeedListContext'
import { Context as FeedContext } from '../context/FeedContext'
import { useContext, useState } from 'react';


const ShowFeedScreen = ({ route, navigation }) => {

    const feedListContext = useContext(FeedListContext);

    const feedID = route.params.id;


    const feed = feedListContext.state.find((feed) => feed.id === feedID);

    const { state, fetchItems } = useContext(FeedContext);
    const [loading , setLoading] = useState(true);

    //carrega os itens do feed
    useEffect(() => {
        fetchItems(feed.urlFeed).then(() => {
            setLoading(false);
        }
        );
    }, []);



    const abrirLink = (link) => {
     //abrir o link no navegador do celular
        Linking.openURL(link);
    }

    return (
        <>
            <View style={styles.container}>
                {loading ?
                <View style={styles.loading}>
                <Image
                source={require('../../assets/loading.gif')}
                style={styles.loadingImage}
                />
                <Text style={styles.loadingText}>Carregando...</Text>
                </View>
                :
            <FlatList
                style={styles.list}
                data={state}
                keyExtractor={(rssNews) => rssNews.id}
                renderItem={({ item }) => {
                    //atualmente só exibe o título, faça com que apareça data de publicação, descrição (pode cortar em 100 ou 200 caracteres para não ficar muito grande), e imagem (caso tenha)
                    //ao clicar em uma notícia, devemos chamar a função abrirLink que direciona o usuário para o link da notícia
                    return (
                        <TouchableOpacity onPress={() => abrirLink(item.link)}>
                        <View style={styles.row}>


                            <Text style={styles.dataPublicacao}>{item.pubDate}</Text>
                            <Text style={styles.titulo}>{item.title}</Text>

                            { item.image != null && item.image != "" ? <Image style={styles.image} source={{ uri: item.image }} /> :  <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/1920x1080/eee?text=16:9' }} /> }


                            <Text style={styles.descricao}>{item.description}</Text>


                        </View>
                        </TouchableOpacity>
                    );
                }}
            />
            }
            </View>
        </>
    );
};

//altere os estilos como desejar para melhorar o layout
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cad8e7',
        padding: 10,

    },
    list: {
        flex: 1,
        padding: 10,
        marginTop: 10,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cad8e7',
        padding: 10,
    },
    loadingImage: {
        width: 100,
        height: 100,
    },
    row: {
        flexDirection: 'column',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 40,
        backgroundColor: '#f8f8f8'

    },
    col: {
        flexDirection: 'column',
        paddingHorizontal: 10,

    },
    titulo: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    image: {
        flex: 1,
        width: '100%',
        height: 200,
        borderRadius: 4,
        resizeMode: 'contain',
        marginBottom: 10,
        marginTop: 10,

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
        marginBottom: 10,
        textAlign: 'right'

    },
    icon: {
        fontSize: 24
    }
});

export default ShowFeedScreen;
