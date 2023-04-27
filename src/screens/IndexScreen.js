import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useContext, useEffect } from 'react';
import { Context } from '../context/FeedListContext'


import { MaterialCommunityIcons } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, deleteFeed, getAllFeeds } = useContext(Context);

    useEffect(() => {
        getAllFeeds(); // chama a função que carrega os feeds cadastrados do async storage
      }, []);


    return (
        <>
            {state.length == 0 ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons style={styles.sadicon}  name="emoticon-sad-outline" size={74} color="black" />
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'normal' }}>
                Nenhum feed cadastrado
            </Text>
            </View>
            : null }
            <FlatList
                data={state}
                keyExtractor={(rssfeed) => rssfeed.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.titulo}</Text>
                                <TouchableOpacity onPress={() => { deleteFeed(item.id)  }}>
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    },
    sadicon: {
        fontSize: 74,
        textAlign: 'center'

    }

});

export default IndexScreen;
