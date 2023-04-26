import React from 'react';
import { Text, StyleSheet } from 'react-native';
import FeedForm from '../components/FeedForm';

const AddFeedScreen = ({ navigation }) => {
    return (
      <FeedForm navegacao={navigation}/>
    );
};

const styles = StyleSheet.create({});

export default AddFeedScreen;
