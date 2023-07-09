import React, { useState, useContext } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeartIcon } from 'react-native-heroicons/solid';
import { FavouriteContext } from '../Global/FavouriteContext';
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import axios from 'axios';
import Modal from 'react-native-modal';

const ios = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

export default function DetailsMovie() {
    const [showNotification, setShowNotification] = useState(false);
    const { favorites, toggleFavourite } = useContext(FavouriteContext);
    const { params } = useRoute();
    const item = params.item || params;

    const navigation = useNavigation();

    const handleLike = () => {
        toggleFavourite(item);
        setShowNotification(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.wrapper}>
                <SafeAreaView style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLike}>
                        <HeartIcon size="35" color={favorites.some((fav) => fav.id === item.id) ? 'red' : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>

                <View>
                    <Image source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path }} style={styles.image} />
                </View>
            </View>

            <View style={styles.detailsWrapper}>
                <Text style={styles.title}>{item?.title}</Text>

                {item?.id ? (
                    <Text style={styles.detailsText}>
                        {item?.original_language} - {formatDate(item?.release_date)} - 45 min Rating: {item.vote_average}
                    </Text>
                ) : null}

                <View style={styles.genresWrapper}>
                    {item?.genres?.map((genre, index) => {
                        return (
                            <Text key={index} style={styles.genreText}>
                                {genre?.name}
                            </Text>
                        );
                    })}
                </View>

                <Text style={styles.overview}>{item?.overview}</Text>
            </View>

            <Modal
                isVisible={showNotification}
                onBackdropPress={() => setShowNotification(false)}
                backdropOpacity={0.5}
                animationIn="fadeIn"
                animationOut="fadeOut"
                style={styles.modal}
            >
                <View style={styles.notificationContainer}>
                    <Text style={styles.notificationText}>
                        {favorites.some((fav) => fav.id === item.id) ? 'Movie added to favorites!' : 'Movie removed from favorites!'}
                    </Text>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        flex: 1,
        backgroundColor: 'black',
    },
    wrapper: {
        width: '100%',
    },
    header: {
        position: 'absolute',
        zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        borderRadius: 30,
        padding: 10,
        backgroundColor: '#1F2937',
    },
    image: {
        width: '100%',
        height: height * 0.55,
    },
    detailsWrapper: {
        marginTop: -(height * 0.09),
        paddingTop: 8,
        paddingHorizontal: 16,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    detailsText: {
        borderRadius: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
        backgroundColor: 'grey',
        padding: 2,
        opacity: 0.8,
    },
    genresWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    genreText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginRight: 5,
    },
    overview: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
    modal: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 0,
    },
    notificationContainer: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,

    },
    notificationText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,

    },
});
